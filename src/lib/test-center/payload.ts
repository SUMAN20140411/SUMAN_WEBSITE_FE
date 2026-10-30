import type { TestCenterCopy } from "@/content/test-center/equipment";
import {
  buildSampleSpecs,
  type TestRequestValues,
} from "@/lib/test-center/schema";

export function buildTestRequestPayload(
  values: TestRequestValues,
  copy: Pick<TestCenterCopy, "sampleWeight" | "sampleSize">,
  locale: "ko" | "en" = "ko"
) {
  const { sample, report, client } = values;
  const mail = report.receiveMethod === "mail";

  return {
    equipmentIds: [...new Set(values.equipmentIds)],
    locale: locale === "en" ? "en" : "ko",
    website: values.website,
    privacyConsent: values.privacyConsent,
    damageConsent: values.damageConsent,
    sample: {
      sampleName: sample.sampleName.trim(),
      quantity: sample.quantity.trim(),
      specs: buildSampleSpecs(sample, {
        weight: copy.sampleWeight,
        size: copy.sampleSize,
      }),
    },
    report: {
      receptionType: report.receptionType.trim(),
      purpose: report.purpose.trim(),
      purposeDetail: report.purposeDetail.trim(),
      copyCount: report.copyCount.trim(),
      receiveMethod: report.receiveMethod.trim(),
      samplePhoto: report.samplePhoto.trim(),
      sampleHandling: report.sampleHandling.trim(),
      ...(mail
        ? {
            shippingName: report.shippingName.trim(),
            recipientName: report.recipientName.trim(),
            recipientPhone: report.recipientPhone.trim(),
            postalCode: report.postalCode.trim(),
            deliveryAddress: report.deliveryAddress.trim(),
            addressDetail: report.addressDetail.trim(),
          }
        : {}),
    },
    client: {
      companyName: client.companyName.trim(),
      representativeName: client.representativeName.trim(),
      businessRegistrationNumber: client.businessRegistrationNumber.trim(),
      contactName: client.contactName.trim(),
      phone: client.phone.trim(),
      email: client.email.trim(),
      companyPostalCode: client.companyPostalCode.trim(),
      address: client.address.trim(),
      companyAddressDetail: client.companyAddressDetail.trim(),
      remarks: client.remarks.trim(),
    },
  };
}
