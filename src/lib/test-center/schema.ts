import { z } from "zod";
import type { TestCenterCopy } from "@/content/test-center/equipment";

export const MAX_CUSTOM_SPECS = 10;

export const PURPOSES = ["reference", "quality", "customer", "other"] as const;
export const RECEPTION_TYPES = ["general"] as const;
export const RECEIVE_METHODS = ["visit", "mail", "electronic"] as const;
export const SAMPLE_PHOTOS = ["attach", "skip"] as const;
export const SAMPLE_HANDLINGS = ["dispose", "return"] as const;

const emailSchema = z.email();

export type CustomSpecValues = {
  label: string;
  value: string;
};

export type TestSpec = {
  label: string;
  value: string;
};

export type SampleValues = {
  sampleName: string;
  quantity: string;
  sampleWeight: string;
  sampleSizeW: string;
  sampleSizeD: string;
  sampleSizeH: string;
  customSpecs: CustomSpecValues[];
};

export type ReportValues = {
  receptionType: string;
  purpose: string;
  purposeDetail: string;
  copyCount: string;
  receiveMethod: string;
  shippingName: string;
  recipientName: string;
  recipientPhone: string;
  postalCode: string;
  deliveryAddress: string;
  addressDetail: string;
  samplePhoto: string;
  sampleHandling: string;
};

export type ClientValues = {
  companyName: string;
  representativeName: string;
  businessRegistrationNumber: string;
  contactName: string;
  phone: string;
  email: string;
  companyPostalCode: string;
  address: string;
  companyAddressDetail: string;
  remarks: string;
};

export type TestRequestValues = {
  equipmentIds: string[];
  sample: SampleValues;
  report: ReportValues;
  client: ClientValues;
  privacyConsent: boolean;
  damageConsent: boolean;
  website: string;
};

export const emptyTestRequest: TestRequestValues = {
  equipmentIds: [],
  sample: {
    sampleName: "",
    quantity: "",
    sampleWeight: "",
    sampleSizeW: "",
    sampleSizeD: "",
    sampleSizeH: "",
    customSpecs: [],
  },
  report: {
    receptionType: "general",
    purpose: "",
    purposeDetail: "",
    copyCount: "1",
    receiveMethod: "",
    shippingName: "",
    recipientName: "",
    recipientPhone: "",
    postalCode: "",
    deliveryAddress: "",
    addressDetail: "",
    samplePhoto: "",
    sampleHandling: "",
  },
  client: {
    companyName: "",
    representativeName: "",
    businessRegistrationNumber: "",
    contactName: "",
    phone: "",
    email: "",
    companyPostalCode: "",
    address: "",
    companyAddressDetail: "",
    remarks: "",
  },
  privacyConsent: false,
  damageConsent: false,
  website: "",
};

export const TEST_REQUEST_STEP_FIELDS: (keyof TestRequestValues)[][] = [
  ["equipmentIds"],
  ["sample"],
  ["report"],
  ["client"],
  ["privacyConsent", "damageConsent"],
];

export function isBusinessRegistrationNumber(value: string) {
  if (!/^[\d-]+$/.test(value)) return false;
  return /^\d{10}$/.test(value.replace(/-/g, ""));
}

export function isOnOrAfterToday(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const picked = new Date(year, month - 1, day);
  if (
    picked.getFullYear() !== year ||
    picked.getMonth() !== month - 1 ||
    picked.getDate() !== day
  ) {
    return false;
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return picked.getTime() >= today.getTime();
}

export function todayInputValue() {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${today.getFullYear()}-${month}-${day}`;
}

export function isVibrationCategoryLabel(label: string) {
  const normalized = label.toLowerCase();
  return normalized.includes("진동") || normalized.includes("vibration");
}

export function buildSampleSpecs(
  values: Pick<
    SampleValues,
    | "sampleWeight"
    | "sampleSizeW"
    | "sampleSizeD"
    | "sampleSizeH"
    | "customSpecs"
  >,
  labels: { weight: string; size: string }
): TestSpec[] {
  const specs: TestSpec[] = [];
  const weight = values.sampleWeight.trim();
  if (weight) {
    specs.push({ label: labels.weight, value: `${weight} kg` });
  }

  const width = values.sampleSizeW.trim();
  const depth = values.sampleSizeD.trim();
  const height = values.sampleSizeH.trim();
  if (width || depth || height) {
    specs.push({
      label: labels.size,
      value: `W ${width} mm D ${depth} mm H ${height} mm`,
    });
  }

  values.customSpecs.forEach((row) => {
    const label = row.label.trim();
    const value = row.value.trim();
    if (label && value) {
      specs.push({ label, value });
    }
  });

  return specs;
}

function requiredText(required: string, tooLong: string, max = 200) {
  return z.string().trim().min(1, required).max(max, tooLong);
}

function choiceField(values: readonly string[], message: string) {
  return z.string().trim().refine((value) => values.includes(value), message);
}

function emailField(required: string, invalid: string, tooLong: string) {
  return z
    .string()
    .trim()
    .min(1, required)
    .max(254, tooLong)
    .refine((value) => emailSchema.safeParse(value).success, invalid);
}

function quantityField(required: string, invalid: string) {
  return z
    .string()
    .trim()
    .min(1, required)
    .refine((value) => {
      if (!/^\d+$/.test(value)) return false;
      const parsed = Number(value);
      return Number.isSafeInteger(parsed) && parsed >= 1;
    }, invalid);
}

function isPositiveNumber(value: string) {
  if (!/^\d+(\.\d+)?$/.test(value)) return false;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0;
}

function issue(
  ctx: z.RefinementCtx,
  path: (string | number)[],
  message: string
) {
  ctx.addIssue({ code: "custom", path, message });
}

export function buildSampleSchema(
  copy: TestCenterCopy,
  options?: { vibrationRequired?: () => boolean }
) {
  const messages = copy.errors;
  return z
    .object({
      sampleName: requiredText(messages.sampleName, messages.tooLong),
      quantity: quantityField(
        messages.quantityRequired,
        messages.quantityInvalid
      ),
      sampleWeight: z.string().trim().max(40, messages.tooLong),
      sampleSizeW: z.string().trim().max(40, messages.tooLong),
      sampleSizeD: z.string().trim().max(40, messages.tooLong),
      sampleSizeH: z.string().trim().max(40, messages.tooLong),
      customSpecs: z
        .array(
          z.object({
            label: z.string().max(200, messages.tooLong),
            value: z.string().max(2000, messages.tooLong),
          })
        )
        .max(MAX_CUSTOM_SPECS),
    })
    .superRefine((values, ctx) => {
      const vibrationRequired = options?.vibrationRequired?.() ?? false;
      const weight = values.sampleWeight.trim();
      const width = values.sampleSizeW.trim();
      const depth = values.sampleSizeD.trim();
      const height = values.sampleSizeH.trim();
      const sizeFilled = [width, depth, height].filter(Boolean).length;

      if (vibrationRequired && !weight) {
        issue(ctx, ["sampleWeight"], messages.weightRequired);
      } else if (weight && !isPositiveNumber(weight)) {
        issue(ctx, ["sampleWeight"], messages.weightInvalid);
      }

      if (vibrationRequired && sizeFilled === 0) {
        issue(ctx, ["sampleSizeW"], messages.sizeRequired);
        issue(ctx, ["sampleSizeD"], messages.sizeRequired);
        issue(ctx, ["sampleSizeH"], messages.sizeRequired);
      } else if (sizeFilled > 0 && sizeFilled < 3) {
        if (!width) issue(ctx, ["sampleSizeW"], messages.sizeIncomplete);
        if (!depth) issue(ctx, ["sampleSizeD"], messages.sizeIncomplete);
        if (!height) issue(ctx, ["sampleSizeH"], messages.sizeIncomplete);
      }

      if (width && !isPositiveNumber(width)) {
        issue(ctx, ["sampleSizeW"], messages.sizeInvalid);
      }
      if (depth && !isPositiveNumber(depth)) {
        issue(ctx, ["sampleSizeD"], messages.sizeInvalid);
      }
      if (height && !isPositiveNumber(height)) {
        issue(ctx, ["sampleSizeH"], messages.sizeInvalid);
      }

      values.customSpecs.forEach((row, index) => {
        const label = row.label.trim();
        const value = row.value.trim();
        if ((label && !value) || (!label && value)) {
          issue(ctx, ["customSpecs", index], messages.customSpecIncomplete);
        }
      });
    });
}

export function buildReportSchema(copy: TestCenterCopy) {
  const messages = copy.errors;
  return z
    .object({
      receptionType: choiceField(RECEPTION_TYPES, messages.receptionType),
      purpose: choiceField(PURPOSES, messages.purpose),
      purposeDetail: z.string().trim().max(200, messages.tooLong),
      copyCount: quantityField(
        messages.copyCountRequired,
        messages.copyCountInvalid
      ),
      receiveMethod: choiceField(RECEIVE_METHODS, messages.receiveMethod),
      shippingName: z.string().trim().max(200, messages.tooLong),
      recipientName: z.string().trim().max(200, messages.tooLong),
      recipientPhone: z.string().trim().max(40, messages.tooLong),
      postalCode: z.string().trim().max(10, messages.tooLong),
      deliveryAddress: z.string().trim().max(300, messages.tooLong),
      addressDetail: z.string().trim().max(200, messages.tooLong),
      samplePhoto: choiceField(SAMPLE_PHOTOS, messages.samplePhoto),
      sampleHandling: choiceField(SAMPLE_HANDLINGS, messages.sampleHandling),
    })
    .superRefine((values, ctx) => {
      if (values.purpose === "customer" && !values.purposeDetail.trim()) {
        issue(ctx, ["purposeDetail"], messages.purposeDetail);
      }

      if (values.receiveMethod === "mail") {
        if (!values.shippingName.trim()) {
          issue(ctx, ["shippingName"], messages.shippingName);
        }
        if (!values.recipientName.trim()) {
          issue(ctx, ["recipientName"], messages.recipientName);
        }
        if (!values.recipientPhone.trim()) {
          issue(ctx, ["recipientPhone"], messages.recipientPhone);
        }
        if (!values.postalCode.trim()) {
          issue(ctx, ["postalCode"], messages.postalCode);
        }
        if (!values.deliveryAddress.trim()) {
          issue(ctx, ["deliveryAddress"], messages.deliveryAddress);
        }
        if (!values.addressDetail.trim()) {
          issue(ctx, ["addressDetail"], messages.addressDetail);
        }
      }
    });
}

export function buildClientSchema(copy: TestCenterCopy) {
  const messages = copy.errors;
  return z.object({
    companyName: requiredText(messages.companyName, messages.tooLong),
    representativeName: requiredText(
      messages.representativeName,
      messages.tooLong
    ),
    businessRegistrationNumber: z
      .string()
      .trim()
      .max(20, messages.tooLong)
      .refine(
        (value) => value === "" || isBusinessRegistrationNumber(value),
        messages.businessNumberInvalid
      ),
    contactName: requiredText(messages.contactName, messages.tooLong),
    phone: z
      .string()
      .trim()
      .min(1, messages.phone)
      .max(40, messages.tooLong)
      .refine(
        (value) => /^\d{2,4}-\d{3,4}-\d{4}$/.test(value),
        messages.phoneInvalid
      ),
    email: emailField(
      messages.emailRequired,
      messages.emailInvalid,
      messages.tooLong
    ),
    companyPostalCode: requiredText(
      messages.companyPostalCode,
      messages.tooLong,
      10
    ),
    address: requiredText(messages.address, messages.tooLong, 300),
    companyAddressDetail: z.string().trim().max(200, messages.tooLong),
    remarks: z.string().trim().max(300, messages.tooLong),
  });
}

export function buildTestRequestSchema(
  copy: TestCenterCopy,
  options?: { vibrationRequired?: () => boolean }
) {
  const messages = copy.errors;
  return z.object({
    equipmentIds: z
      .array(z.string().trim().min(1))
      .min(1, messages.equipmentRequired),
    sample: buildSampleSchema(copy, options),
    report: buildReportSchema(copy),
    client: buildClientSchema(copy),
    privacyConsent: z
      .boolean()
      .refine((value) => value, messages.consentRequired),
    damageConsent: z
      .boolean()
      .refine((value) => value, messages.consentRequired),
    website: z.string(),
  });
}
