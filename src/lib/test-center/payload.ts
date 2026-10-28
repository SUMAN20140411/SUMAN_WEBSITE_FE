import type { TestCenterCopy } from "@/content/test-center/equipment";
import {
  buildSampleSpecs,
  todayInputValue,
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

/** Cleared when receive method is not mail; still typed on the form. */
type MailOnlyField =
  | "shippingName"
  | "recipientName"
  | "recipientPhone"
  | "postalCode"
  | "deliveryAddress"
  | "addressDetail";

type PayloadTextField = Exclude<
  TextField,
  "website" | SpecSourceField | MailOnlyField
>;

const TEXT_FIELDS = [
  "sampleName",
  "quantity",
  "receptionType",
  "purpose",
  "purposeDetail",
  "copyCount",
  "receiveMethod",
  "samplePhoto",
  "sampleHandling",
  "companyName",
  "businessRegistrationNumber",
  "contactName",
  "department",
  "phone",
  "email",
  "address",
] as const satisfies readonly PayloadTextField[];

const MAIL_FIELDS = [
  "shippingName",
  "recipientName",
  "recipientPhone",
  "postalCode",
  "deliveryAddress",
  "addressDetail",
] as const satisfies readonly MailOnlyField[];

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
  body.append("receivedDate", todayInputValue());
  TEXT_FIELDS.forEach((key) => {
    body.append(key, values[key].trim());
  });
  if (values.receiveMethod === "mail") {
    MAIL_FIELDS.forEach((key) => {
      body.append(key, values[key].trim());
    });
  }
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
