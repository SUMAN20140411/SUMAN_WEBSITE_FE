import type { TestRequestValues } from "@/lib/test-center/schema";

type TextField = {
  [Key in keyof TestRequestValues]: TestRequestValues[Key] extends string
    ? Key
    : never;
}[keyof TestRequestValues];

type PayloadTextField = Exclude<TextField, "website">;

const TEXT_FIELDS = [
  "sampleName",
  "sampleType",
  "modelName",
  "manufacturer",
  "ratedVoltage",
  "capacityAh",
  "quantity",
  "sampleCondition",
  "handlingNotes",
  "purpose",
  "reportLanguage",
  "standards",
  "desiredCompletionDate",
  "reportEmail",
  "additionalRequest",
  "companyName",
  "businessRegistrationNumber",
  "contactName",
  "department",
  "phone",
  "email",
  "address",
] as const satisfies readonly PayloadTextField[];

type MissingTextField = Exclude<PayloadTextField, (typeof TEXT_FIELDS)[number]>;
type AssertAllTextFields<T extends never> = T;
type _AllTextFieldsAreSent = AssertAllTextFields<MissingTextField>;

export function buildTestRequestFormData(values: TestRequestValues) {
  const body = new FormData();
  [...new Set(values.equipmentIds)].forEach((id) => {
    body.append("equipmentIds", id);
  });
  TEXT_FIELDS.forEach((key) => {
    body.append(key, values[key].trim());
  });
  body.append("privacyConsent", values.privacyConsent ? "true" : "false");
  body.append("damageConsent", values.damageConsent ? "true" : "false");
  values.attachments.forEach((file) => {
    body.append("files", file, file.name);
  });
  return body;
}
