import { z } from "zod";
import type { TestCenterCopy } from "@/content/test-center/equipment";

export const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024;
export const MAX_ATTACHMENTS = 5;
export const ALLOWED_ATTACHMENT_EXTENSIONS = new Set([
  "pdf",
  "png",
  "jpg",
  "jpeg",
  "zip",
]);

const SAMPLE_TYPES = ["cell", "module", "pack", "other"] as const;
const SAMPLE_CONDITIONS = ["new", "used"] as const;
const PURPOSES = ["quality", "certification", "customer", "other"] as const;
const REPORT_LANGUAGES = ["ko", "en", "both"] as const;

const emailSchema = z.email();

export type TestRequestValues = {
  equipmentIds: string[];
  sampleName: string;
  sampleType: string;
  modelName: string;
  manufacturer: string;
  ratedVoltage: string;
  capacityAh: string;
  quantity: string;
  sampleCondition: string;
  handlingNotes: string;
  attachments: File[];
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
  sampleType: "",
  modelName: "",
  manufacturer: "",
  ratedVoltage: "",
  capacityAh: "",
  quantity: "",
  sampleCondition: "",
  handlingNotes: "",
  attachments: [],
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
    "sampleType",
    "modelName",
    "manufacturer",
    "ratedVoltage",
    "capacityAh",
    "quantity",
    "sampleCondition",
    "handlingNotes",
    "attachments",
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

export function fileExtension(name: string) {
  const index = name.lastIndexOf(".");
  return index >= 0 ? name.slice(index + 1).toLowerCase() : "";
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

function capacityField(required: string, invalid: string) {
  return z
    .string()
    .trim()
    .min(1, required)
    .refine((value) => {
      if (!/^\d+(\.\d+)?$/.test(value)) return false;
      const parsed = Number(value);
      return Number.isFinite(parsed) && parsed > 0;
    }, invalid);
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

function attachmentField(messages: TestCenterCopy["errors"]) {
  return z
    .custom<File[]>(
      (value) => Array.isArray(value),
      messages.fileInvalid
    )
    .superRefine((files, ctx) => {
      const problems: string[] = [];
      if (files.length > MAX_ATTACHMENTS) {
        problems.push(messages.filesMax);
      }
      files.forEach((file) => {
        if (typeof File === "undefined" || !(file instanceof File)) {
          problems.push(messages.fileInvalid);
          return;
        }
        if (!ALLOWED_ATTACHMENT_EXTENSIONS.has(fileExtension(file.name))) {
          problems.push(messages.fileType(file.name));
        }
        if (file.size > MAX_ATTACHMENT_BYTES) {
          problems.push(messages.fileSize(file.name));
        }
      });
      if (problems.length > 0) {
        ctx.addIssue(problems.join(" "));
      }
    });
}

export function buildTestRequestSchema(copy: TestCenterCopy) {
  const messages = copy.errors;
  return z.object({
    equipmentIds: z.array(z.string().trim().min(1)).min(1, messages.equipmentRequired),
    sampleName: requiredText(messages.sampleName, messages.tooLong),
    sampleType: choiceField(SAMPLE_TYPES, messages.sampleType),
    modelName: requiredText(messages.modelName, messages.tooLong),
    manufacturer: requiredText(messages.manufacturer, messages.tooLong),
    ratedVoltage: requiredText(messages.ratedVoltage, messages.tooLong, 40),
    capacityAh: capacityField(messages.capacityRequired, messages.capacityInvalid),
    quantity: quantityField(messages.quantityRequired, messages.quantityInvalid),
    sampleCondition: choiceField(SAMPLE_CONDITIONS, messages.sampleCondition),
    handlingNotes: optionalText(messages.tooLong),
    attachments: attachmentField(messages),
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
    email: emailField(messages.emailRequired, messages.emailInvalid, messages.tooLong),
    address: requiredText(messages.address, messages.tooLong, 300),
    privacyConsent: z.boolean().refine((value) => value, messages.consentRequired),
    damageConsent: z.boolean().refine((value) => value, messages.consentRequired),
    website: z.string(),
  });
}
