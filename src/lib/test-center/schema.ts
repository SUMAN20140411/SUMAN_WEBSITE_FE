import { z } from "zod";
import type { TestCenterCopy } from "@/content/test-center/equipment";

export const MAX_CUSTOM_SPECS = 10;
export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
export const MAX_APPLICATION_FILES = 5;

export const BUSINESS_REG_EXTENSIONS = [
  ".pdf",
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".webp",
] as const;

export const APPLICATION_EXTENSIONS = [
  ".pdf",
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".webp",
  ".doc",
  ".docx",
  ".xls",
  ".xlsx",
  ".ppt",
  ".pptx",
  ".hwp",
  ".hwpx",
  ".zip",
] as const;

export const PURPOSES = ["reference", "quality", "customer", "other"] as const;
export const ANALYSIS_PURPOSES = [
  "rnd",
  "failure",
  "reliability",
  "certification",
  "other",
] as const;
export const MAX_ANALYSIS_PURPOSE_LENGTH = 500;
export const RECEPTION_TYPES = ["general"] as const;
export const RECEIVE_METHODS = ["visit", "mail", "email"] as const;
export const SAMPLE_HANDLINGS = ["dispose", "return"] as const;
export const ADDITIONAL_ANALYSIS_CHOICES = ["yes", "no"] as const;

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
  applicationFiles: File[];
};

export type ReportValues = {
  receptionType: string;
  purpose: string;
  purposeDetail: string;
  analysisPurposeChoices: string[];
  analysisPurposeOther: string;
  desiredCompletionDate: string;
  copyCount: string;
  receiveMethod: string;
  shippingName: string;
  recipientName: string;
  recipientPhone: string;
  postalCode: string;
  deliveryAddress: string;
  addressDetail: string;
  sampleHandling: string;
  additionalAnalysis: string;
  additionalAnalysisDetail: string;
};

export type ClientValues = {
  companyName: string;
  businessRegistrationNumber: string;
  businessRegistrationFile: File | null;
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
    applicationFiles: [],
  },
  report: {
    receptionType: "general",
    purpose: "",
    purposeDetail: "",
    analysisPurposeChoices: [],
    analysisPurposeOther: "",
    desiredCompletionDate: "",
    copyCount: "1",
    receiveMethod: "",
    shippingName: "",
    recipientName: "",
    recipientPhone: "",
    postalCode: "",
    deliveryAddress: "",
    addressDetail: "",
    sampleHandling: "",
    additionalAnalysis: "",
    additionalAnalysisDetail: "",
  },
  client: {
    companyName: "",
    businessRegistrationNumber: "",
    businessRegistrationFile: null,
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

export function hasAllowedExtension(
  filename: string,
  allowed: readonly string[],
) {
  const dot = filename.lastIndexOf(".");
  if (dot < 0) return false;
  const ext = filename.slice(dot).toLowerCase();
  return allowed.includes(ext);
}

export function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

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
  labels: { weight: string; size: string },
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

export function formatAnalysisPurpose(
  choices: readonly string[],
  otherText: string,
  options: TestCenterCopy["analysisPurposes"],
) {
  const trimmedOther = otherText.trim();
  return options
    .filter((option) => choices.includes(option.value))
    .map((option) =>
      option.value === "other" && trimmedOther
        ? `${option.label}: ${trimmedOther}`
        : option.label,
    )
    .join(", ");
}

function requiredText(required: string, tooLong: string, max = 200) {
  return z.string().trim().min(1, required).max(max, tooLong);
}

function choiceField(values: readonly string[], message: string) {
  return z
    .string()
    .trim()
    .refine((value) => values.includes(value), message);
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

function isBrowserFile(value: unknown): value is File {
  return typeof File !== "undefined" && value instanceof File;
}

function validateFileConstraints(
  file: File,
  allowedExtensions: readonly string[],
  messages: Pick<
    TestCenterCopy["errors"],
    "fileEmpty" | "fileTooLarge" | "fileTypeInvalid"
  >,
) {
  if (file.size <= 0) return messages.fileEmpty;
  if (file.size > MAX_FILE_SIZE_BYTES) return messages.fileTooLarge;
  if (!hasAllowedExtension(file.name, allowedExtensions)) {
    return messages.fileTypeInvalid;
  }
  return null;
}

function issue(
  ctx: z.RefinementCtx,
  path: (string | number)[],
  message: string,
) {
  ctx.addIssue({ code: "custom", path, message });
}

export function buildSampleSchema(
  copy: TestCenterCopy,
  options?: { vibrationRequired?: () => boolean },
) {
  const messages = copy.errors;
  return z
    .object({
      sampleName: requiredText(messages.sampleName, messages.tooLong),
      quantity: quantityField(
        messages.quantityRequired,
        messages.quantityInvalid,
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
          }),
        )
        .max(MAX_CUSTOM_SPECS),
      applicationFiles: z.array(z.custom<File>()),
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

      if (values.applicationFiles.length > MAX_APPLICATION_FILES) {
        issue(ctx, ["applicationFiles"], messages.applicationFilesTooMany);
      }

      values.applicationFiles.forEach((file, index) => {
        if (!isBrowserFile(file)) {
          issue(ctx, ["applicationFiles", index], messages.fileTypeInvalid);
          return;
        }
        const fileError = validateFileConstraints(
          file,
          APPLICATION_EXTENSIONS,
          messages,
        );
        if (fileError) {
          issue(ctx, ["applicationFiles", index], fileError);
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
      analysisPurposeChoices: z
        .array(choiceField(ANALYSIS_PURPOSES, messages.analysisPurpose))
        .min(1, messages.analysisPurpose),
      analysisPurposeOther: z.string().trim().max(300, messages.tooLong),
      desiredCompletionDate: z
        .string()
        .trim()
        .min(1, messages.desiredCompletionDateRequired)
        .refine(isOnOrAfterToday, messages.desiredCompletionDateInvalid),
      copyCount: quantityField(
        messages.copyCountRequired,
        messages.copyCountInvalid,
      ),
      receiveMethod: choiceField(RECEIVE_METHODS, messages.receiveMethod),
      shippingName: z.string().trim().max(200, messages.tooLong),
      recipientName: z.string().trim().max(200, messages.tooLong),
      recipientPhone: z.string().trim().max(40, messages.tooLong),
      postalCode: z.string().trim().max(10, messages.tooLong),
      deliveryAddress: z.string().trim().max(300, messages.tooLong),
      addressDetail: z.string().trim().max(200, messages.tooLong),
      sampleHandling: choiceField(SAMPLE_HANDLINGS, messages.sampleHandling),
      additionalAnalysis: choiceField(
        ADDITIONAL_ANALYSIS_CHOICES,
        messages.additionalAnalysis,
      ),
      additionalAnalysisDetail: z.string().trim().max(1000, messages.tooLong),
    })
    .superRefine((values, ctx) => {
      if (values.purpose === "customer" && !values.purposeDetail.trim()) {
        issue(ctx, ["purposeDetail"], messages.purposeDetail);
      }

      const hasOtherAnalysis = values.analysisPurposeChoices.includes("other");
      if (hasOtherAnalysis && !values.analysisPurposeOther.trim()) {
        issue(ctx, ["analysisPurposeOther"], messages.analysisPurposeOther);
      }
      if (
        formatAnalysisPurpose(
          values.analysisPurposeChoices,
          values.analysisPurposeOther,
          copy.analysisPurposes,
        ).length > MAX_ANALYSIS_PURPOSE_LENGTH
      ) {
        issue(
          ctx,
          hasOtherAnalysis
            ? ["analysisPurposeOther"]
            : ["analysisPurposeChoices"],
          messages.tooLong,
        );
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

      if (
        values.additionalAnalysis === "yes" &&
        !values.additionalAnalysisDetail.trim()
      ) {
        issue(
          ctx,
          ["additionalAnalysisDetail"],
          messages.additionalAnalysisDetail,
        );
      }
    });
}

export function buildClientSchema(copy: TestCenterCopy) {
  const messages = copy.errors;
  return z.object({
    companyName: requiredText(messages.companyName, messages.tooLong),
    businessRegistrationNumber: z
      .string()
      .trim()
      .max(20, messages.tooLong)
      .refine(
        (value) => value === "" || isBusinessRegistrationNumber(value),
        messages.businessNumberInvalid,
      ),
    businessRegistrationFile: z
      .custom<File | null>()
      .superRefine((file, ctx) => {
        if (!isBrowserFile(file)) {
          issue(ctx, [], messages.businessRegFileRequired);
          return;
        }
        const fileError = validateFileConstraints(
          file,
          BUSINESS_REG_EXTENSIONS,
          messages,
        );
        if (fileError) {
          issue(ctx, [], fileError);
        }
      }),
    contactName: requiredText(messages.contactName, messages.tooLong),
    phone: z
      .string()
      .trim()
      .min(1, messages.phone)
      .max(40, messages.tooLong)
      .refine(
        (value) => /^\d{2,4}-\d{3,4}-\d{4}$/.test(value),
        messages.phoneInvalid,
      ),
    email: emailField(
      messages.emailRequired,
      messages.emailInvalid,
      messages.tooLong,
    ),
    companyPostalCode: requiredText(
      messages.companyPostalCode,
      messages.tooLong,
      10,
    ),
    address: requiredText(messages.address, messages.tooLong, 300),
    companyAddressDetail: z.string().trim().max(200, messages.tooLong),
    remarks: z.string().trim().max(300, messages.tooLong),
  });
}

export function buildTestRequestSchema(
  copy: TestCenterCopy,
  options?: { vibrationRequired?: () => boolean },
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
