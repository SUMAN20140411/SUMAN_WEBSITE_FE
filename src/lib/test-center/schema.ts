import { z } from "zod";
import type { TestCenterCopy } from "@/content/test-center/equipment";

export const MAX_CUSTOM_SPECS = 10;

const PURPOSES = ["quality", "certification", "customer", "other"] as const;
const REPORT_LANGUAGES = ["ko", "en", "both"] as const;

const emailSchema = z.email();

export type CustomSpecValues = {
  label: string;
  value: string;
};

export type TestSpec = {
  label: string;
  value: string;
};

export type TestRequestValues = {
  equipmentIds: string[];
  sampleName: string;
  quantity: string;
  sampleWeight: string;
  sampleSizeW: string;
  sampleSizeD: string;
  sampleSizeH: string;
  customSpecs: CustomSpecValues[];
  purpose: string;
  reportLanguage: string;
  standards: string;
  desiredCompletionDate: string;
  reportEmail: string;
  additionalRequest: string;
  companyName: string;
  businessRegistrationNumber: string;
  contactName: string;
  department: string;
  phone: string;
  email: string;
  address: string;
  privacyConsent: boolean;
  damageConsent: boolean;
  website: string;
};

export const emptyTestRequest: TestRequestValues = {
  equipmentIds: [],
  sampleName: "",
  quantity: "",
  sampleWeight: "",
  sampleSizeW: "",
  sampleSizeD: "",
  sampleSizeH: "",
  customSpecs: [],
  purpose: "",
  reportLanguage: "",
  standards: "",
  desiredCompletionDate: "",
  reportEmail: "",
  additionalRequest: "",
  companyName: "",
  businessRegistrationNumber: "",
  contactName: "",
  department: "",
  phone: "",
  email: "",
  address: "",
  privacyConsent: false,
  damageConsent: false,
  website: "",
};

export const TEST_REQUEST_STEP_FIELDS: (keyof TestRequestValues)[][] = [
  ["equipmentIds"],
  [
    "sampleName",
    "quantity",
    "sampleWeight",
    "sampleSizeW",
    "sampleSizeD",
    "sampleSizeH",
    "customSpecs",
  ],
  [
    "purpose",
    "reportLanguage",
    "standards",
    "desiredCompletionDate",
    "reportEmail",
    "additionalRequest",
  ],
  [
    "companyName",
    "businessRegistrationNumber",
    "contactName",
    "department",
    "phone",
    "email",
    "address",
  ],
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
    TestRequestValues,
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

function optionalText(tooLong: string, max = 2000) {
  return z.string().trim().max(max, tooLong);
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

export function buildTestRequestSchema(
  copy: TestCenterCopy,
  options?: { vibrationRequired?: () => boolean }
) {
  const messages = copy.errors;
  return z
    .object({
      equipmentIds: z
        .array(z.string().trim().min(1))
        .min(1, messages.equipmentRequired),
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
      purpose: choiceField(PURPOSES, messages.purpose),
      reportLanguage: choiceField(REPORT_LANGUAGES, messages.reportLanguage),
      standards: optionalText(messages.tooLong, 500),
      desiredCompletionDate: z
        .string()
        .trim()
        .min(1, messages.dateRequired)
        .refine(isOnOrAfterToday, messages.dateInvalid),
      reportEmail: emailField(
        messages.emailRequired,
        messages.emailInvalid,
        messages.tooLong
      ),
      additionalRequest: optionalText(messages.tooLong),
      companyName: requiredText(messages.companyName, messages.tooLong),
      businessRegistrationNumber: z
        .string()
        .trim()
        .min(1, messages.businessNumberRequired)
        .max(20, messages.tooLong)
        .refine(isBusinessRegistrationNumber, messages.businessNumberInvalid),
      contactName: requiredText(messages.contactName, messages.tooLong),
      department: requiredText(messages.department, messages.tooLong),
      phone: requiredText(messages.phone, messages.tooLong, 40),
      email: emailField(
        messages.emailRequired,
        messages.emailInvalid,
        messages.tooLong
      ),
      address: requiredText(messages.address, messages.tooLong, 300),
      privacyConsent: z
        .boolean()
        .refine((value) => value, messages.consentRequired),
      damageConsent: z
        .boolean()
        .refine((value) => value, messages.consentRequired),
      website: z.string(),
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
