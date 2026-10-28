import type { TestCenterCopy } from "@/content/test-center/equipment";
import {
  buildSampleSpecs,
  type TestRequestValues,
} from "@/lib/test-center/schema";

type TextField = {
  [Key in keyof TestRequestValues]: TestRequestValues[Key] extends string
    ? Key
    : never;
}[keyof TestRequestValues];

/** Fields used only to build the `specs` JSON payload. */
type SpecSourceField =
  | "sampleWeight"
  | "sampleSizeW"
  | "sampleSizeD"
  | "sampleSizeH";

type PayloadTextField = Exclude<TextField, "website" | SpecSourceField>;

const TEXT_FIELDS = [
  "sampleName",
  "quantity",
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

export function buildTestRequestFormData(
  values: TestRequestValues,
  copy: Pick<TestCenterCopy, "sampleWeight" | "sampleSize">
) {
  const body = new FormData();
  [...new Set(values.equipmentIds)].forEach((id) => {
    body.append("equipmentIds", id);
  });
  TEXT_FIELDS.forEach((key) => {
    body.append(key, values[key].trim());
  });
  body.append(
    "specs",
    JSON.stringify(
      buildSampleSpecs(values, {
        weight: copy.sampleWeight,
        size: copy.sampleSize,
      })
    )
  );
  body.append("privacyConsent", values.privacyConsent ? "true" : "false");
  body.append("damageConsent", values.damageConsent ? "true" : "false");
  return body;
}
