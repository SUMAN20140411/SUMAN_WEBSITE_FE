export type ChoiceOption = {
  value: string;
  label: string;
};

export type TestCenterCopy = {
  pageTitle: string;
  heroTitle: string;
  heroSubtitle: string;
  breadcrumb: string;
  steps: { short: string; title: string }[];
  columnGroup: string;
  columnTests: string;
  columnPreview: string;
  addItem: string;
  removeItem: string;
  selectedCount: (count: number) => string;
  next: string;
  back: string;
  submit: string;
  submitting: string;
  edit: string;
  optional: string;
  selectPlaceholder: string;
  businessNumberHint: string;
  consentPrivacy: string;
  consentDamage: string;
  missingApi: string;
  retry: string;
  successTitle: string;
  receiptLabel: string;
  successEmail: (email: string) => string;
  empty: string;
  requiredNote: string;
  sampleName: string;
  quantity: string;
  quantityUnit: string;
  classification: string;
  sampleWeight: string;
  weightUnit: string;
  sampleSize: string;
  sizeUnit: string;
  sizeWidth: string;
  sizeDepth: string;
  sizeHeight: string;
  sampleSpecsNote: string;
  addSpec: string;
  removeSpec: string;
  specLabel: string;
  specValue: string;
  receivedDate: string;
  receptionType: string;
  receptionTypeGeneral: string;
  receptionTypeKolasNote: string;
  purpose: string;
  purposeDetailPlaceholder: string;
  purposeHint: string;
  copyCount: string;
  copyCountUnit: string;
  receiveMethod: string;
  shippingName: string;
  recipientName: string;
  recipientPhone: string;
  recipientPhoneHint: string;
  deliveryAddress: string;
  addressSearch: string;
  addressDetail: string;
  addressSearchTitle: string;
  addressSearchPlaceholder: string;
  addressSearchButton: string;
  addressSearchLoading: string;
  addressSearchEmpty: string;
  addressSearchError: string;
  addressSearchClose: string;
  addressSelect: string;
  samplePhoto: string;
  samplePhotoAttach: string;
  samplePhotoSkip: string;
  sampleHandling: string;
  sampleHandlingDispose: string;
  sampleHandlingReturn: string;
  clientSectionTitle: string;
  companyName: string;
  representativeName: string;
  businessRegistrationNumber: string;
  contactName: string;
  phone: string;
  email: string;
  emailDomains: string[];
  emailDomainDirect: string;
  address: string;
  addressPlaceholder: string;
  remarks: string;
  remarksPlaceholder: string;
  purposes: ChoiceOption[];
  receiveMethods: ChoiceOption[];
  errors: {
    equipmentRequired: string;
    sampleName: string;
    quantityRequired: string;
    quantityInvalid: string;
    weightRequired: string;
    weightInvalid: string;
    sizeRequired: string;
    sizeInvalid: string;
    sizeIncomplete: string;
    customSpecIncomplete: string;
    receptionType: string;
    purpose: string;
    purposeDetail: string;
    copyCountRequired: string;
    copyCountInvalid: string;
    receiveMethod: string;
    shippingName: string;
    recipientName: string;
    recipientPhone: string;
    postalCode: string;
    deliveryAddress: string;
    addressDetail: string;
    samplePhoto: string;
    sampleHandling: string;
    emailRequired: string;
    emailInvalid: string;
    companyName: string;
    representativeName: string;
    businessNumberInvalid: string;
    contactName: string;
    phone: string;
    phoneInvalid: string;
    companyPostalCode: string;
    address: string;
    consentRequired: string;
    tooLong: string;
  };
};

const ko = {
  pageTitle: "시험 접수 | 수만",
  heroTitle: "시험센터",
  heroSubtitle: "시험 접수",
  breadcrumb: "시험센터 > 시험 접수",
  steps: [
    { short: "항목", title: "접수 항목 선택" },
    { short: "시료", title: "시료 정보 입력" },
    { short: "성적서", title: "성적서 정보 입력" },
    { short: "업체", title: "의뢰업체 정보 입력" },
    { short: "확인", title: "접수 내용 확인 및 동의" },
  ],
  columnGroup: "항목군",
  columnTests: "시험 항목",
  columnPreview: "장비 미리보기",
  addItem: "추가",
  removeItem: "제거",
  selectedCount: (count: number) => `${count}건 선택`,
  next: "다음",
  back: "이전",
  submit: "접수하기",
  submitting: "접수 중...",
  edit: "수정",
  optional: "선택",
  selectPlaceholder: "선택해 주세요",
  businessNumberHint: "숫자 10자리, 하이픈 입력 가능",
  consentPrivacy:
    "(필수) 개인정보 수집 및 이용에 동의합니다. 수집 항목은 업체명, 대표자명, 사업자등록번호, 담당자 연락처(성명, 전화번호, 이메일), 주소, 시료 정보입니다. 이용 목적은 시험 접수, 신청인 연락, 성적서 발급, 접수 확인 메일 발송이며, 보유 기간은 3년입니다.",
  consentDamage:
    "(필수) 시험 과정에서 시료가 손상되거나 파손될 수 있음을 이해합니다.",
  missingApi:
    "시험 접수 주소가 설정되지 않았습니다. 관리자에게 문의해 주세요.",
  retry: "접수에 실패했습니다. 입력 내용은 그대로입니다. 다시 시도해 주세요.",
  successTitle: "접수가 완료되었습니다",
  receiptLabel: "접수번호",
  successEmail: (email: string) =>
    `확인 메일이 이메일(${email})로 발송됩니다.`,
  empty: "없음",
  requiredNote: "* 은 필수입력 항목입니다. 반드시 입력해 주시기 바랍니다.",
  sampleName: "시료명",
  quantity: "시료수",
  quantityUnit: "개",
  classification: "분류",
  sampleWeight: "시료 중량",
  weightUnit: "kg",
  sampleSize: "시료 크기",
  sizeUnit: "mm",
  sizeWidth: "W",
  sizeDepth: "D",
  sizeHeight: "H",
  sampleSpecsNote:
    "「시료 크기, 시료 중량」은 진동시험 접수 시 필수사항입니다.",
  addSpec: "사양 추가",
  removeSpec: "삭제",
  specLabel: "항목",
  specValue: "내용",
  receivedDate: "접수일자",
  receptionType: "접수 구분",
  receptionTypeGeneral: "일반성적서",
  receptionTypeKolasNote: "추후에 KOLAS 인증받으면 기재 예정",
  purpose: "성적서 용도",
  purposeDetailPlaceholder: "거래처 제출용일 경우 제출처를 작성해 주세요.",
  purposeHint: "성적서 용도가 해당 없을 경우 기타를 선택하세요.",
  copyCount: "성적서 발급매수",
  copyCountUnit: "매",
  receiveMethod: "성적서 수령방법",
  shippingName: "우송처명",
  recipientName: "수령자",
  recipientPhone: "수령자 전화번호",
  recipientPhoneHint: "010-0000-0000",
  deliveryAddress: "성적서 수령지",
  addressSearch: "주소 검색",
  addressDetail: "상세주소",
  addressSearchTitle: "우편번호 검색",
  addressSearchPlaceholder: "도로명, 건물명 또는 지번을 입력하세요",
  addressSearchButton: "검색",
  addressSearchLoading: "검색 중...",
  addressSearchEmpty: "검색 결과가 없습니다. 검색어를 바꿔 보세요.",
  addressSearchError: "주소 검색에 실패했습니다. 잠시 후 다시 시도해 주세요.",
  addressSearchClose: "닫기",
  addressSelect: "선택",
  samplePhoto: "성적서 시료 사진 첨부 여부",
  samplePhotoAttach: "시료 사진 첨부",
  samplePhotoSkip: "미첨부",
  sampleHandling: "시험 후 시료 처리방법",
  sampleHandlingDispose: "폐기",
  sampleHandlingReturn: "반환",
  clientSectionTitle: "의뢰업체 정보(성적서 기입)",
  companyName: "업체명",
  representativeName: "대표자명",
  businessRegistrationNumber: "사업자 등록번호",
  contactName: "담당자명",
  phone: "담당자 연락처",
  email: "담당자 이메일",
  emailDomains: ["naver.com", "daum.net", "gmail.com", "hanmail.net", "nate.com"],
  emailDomainDirect: "직접입력",
  address: "주소",
  addressPlaceholder: "주소",
  remarks: "비고",
  remarksPlaceholder:
    "신청서 작성란에 없는 내용 중, 전달해야 할 사항이나 요청 사항이 있을 경우 작성해주시기 바랍니다.(300자 내외)",
  purposes: [
    { value: "reference", label: "참고용" },
    { value: "quality", label: "품질관리" },
    { value: "customer", label: "거래처제출" },
    { value: "other", label: "기타" },
  ],
  receiveMethods: [
    { value: "visit", label: "방문" },
    { value: "mail", label: "우송" },
    { value: "electronic", label: "전자성적서" },
  ],
  errors: {
    equipmentRequired: "시험 항목을 1개 이상 선택해 주세요.",
    sampleName: "시료명을 입력해 주세요.",
    quantityRequired: "시료수를 입력해 주세요.",
    quantityInvalid: "시료수는 1 이상의 정수로 입력해 주세요.",
    weightRequired: "시료 중량을 입력해 주세요.",
    weightInvalid: "시료 중량은 0보다 큰 숫자로 입력해 주세요.",
    sizeRequired: "시료 크기를 입력해 주세요.",
    sizeInvalid: "시료 크기는 0보다 큰 숫자로 입력해 주세요.",
    sizeIncomplete: "시료 크기(W, D, H)를 모두 입력해 주세요.",
    customSpecIncomplete: "사양의 항목과 내용을 모두 입력해 주세요.",
    receptionType: "접수 구분을 선택해 주세요.",
    purpose: "성적서 용도를 선택해 주세요.",
    purposeDetail: "제출처를 입력해 주세요.",
    copyCountRequired: "발급매수를 입력해 주세요.",
    copyCountInvalid: "발급매수는 1 이상의 정수로 입력해 주세요.",
    receiveMethod: "수령방법을 선택해 주세요.",
    shippingName: "우송처명을 입력해 주세요.",
    recipientName: "수령자를 입력해 주세요.",
    recipientPhone: "수령자 전화번호를 입력해 주세요.",
    postalCode: "주소 검색으로 우편번호를 선택해 주세요.",
    deliveryAddress: "수령지 주소를 선택해 주세요.",
    addressDetail: "상세주소를 입력해 주세요.",
    samplePhoto: "시료 사진 첨부 여부를 선택해 주세요.",
    sampleHandling: "시료 처리방법을 선택해 주세요.",
    emailRequired: "담당자 이메일을 입력해 주세요.",
    emailInvalid: "이메일 형식을 확인해 주세요.",
    companyName: "업체명을 입력해 주세요.",
    representativeName: "대표자명을 입력해 주세요.",
    businessNumberInvalid:
      "사업자등록번호는 숫자 10자리입니다. 하이픈은 사용할 수 있습니다.",
    contactName: "담당자명을 입력해 주세요.",
    phone: "담당자 연락처를 입력해 주세요.",
    phoneInvalid: "담당자 연락처 형식을 확인해 주세요.",
    companyPostalCode: "주소 검색으로 우편번호를 선택해 주세요.",
    address: "주소 검색으로 주소를 선택해 주세요.",
    consentRequired: "동의가 필요합니다.",
    tooLong: "입력 가능한 길이를 초과했습니다.",
  },
} satisfies TestCenterCopy;

const en = {
  pageTitle: "Test Request | SUMAN",
  heroTitle: "Test Center",
  heroSubtitle: "Test Request",
  breadcrumb: "Test Center > Test Request",
  steps: [
    { short: "Tests", title: "Select tests" },
    { short: "Sample", title: "Sample information" },
    { short: "Report", title: "Report information" },
    { short: "Client", title: "Client information" },
    { short: "Review", title: "Review and consent" },
  ],
  columnGroup: "Item group",
  columnTests: "Test items",
  columnPreview: "Equipment preview",
  addItem: "Add",
  removeItem: "Remove",
  selectedCount: (count: number) => `${count} selected`,
  next: "Next",
  back: "Back",
  submit: "Submit request",
  submitting: "Submitting...",
  edit: "Edit",
  optional: "Optional",
  selectPlaceholder: "Select",
  businessNumberHint: "10 digits, hyphens allowed",
  consentPrivacy:
    "(Required) I agree to the collection and use of personal information. Items collected: company name, representative name, business registration number, contact details (name, phone, email), address, and sample information. Purposes: receiving the test request, contacting the applicant, issuing the report, and sending the receipt email. Retention period: 3 years.",
  consentDamage:
    "(Required) I understand that a test may damage or destroy the sample.",
  missingApi:
    "The test request address is not configured. Please contact the administrator.",
  retry: "The request could not be submitted. Your entries are unchanged. Please try again.",
  successTitle: "Your request has been received",
  receiptLabel: "Request number",
  successEmail: (email: string) =>
    `A confirmation email will be sent to (${email}).`,
  empty: "None",
  requiredNote: "* Required fields. Please fill them in.",
  sampleName: "Sample name",
  quantity: "Sample count",
  quantityUnit: "pcs",
  classification: "Classification",
  sampleWeight: "Sample weight",
  weightUnit: "kg",
  sampleSize: "Sample size",
  sizeUnit: "mm",
  sizeWidth: "W",
  sizeDepth: "D",
  sizeHeight: "H",
  sampleSpecsNote:
    "Sample size and sample weight are required when requesting a vibration test.",
  addSpec: "Add specification",
  removeSpec: "Remove",
  specLabel: "Label",
  specValue: "Value",
  receivedDate: "Reception date",
  receptionType: "Reception type",
  receptionTypeGeneral: "General report",
  receptionTypeKolasNote: "To be filled after KOLAS certification",
  purpose: "Report purpose",
  purposeDetailPlaceholder:
    "If submitting to a customer, enter the recipient.",
  purposeHint: "If none apply, select Other.",
  copyCount: "Number of copies",
  copyCountUnit: "copies",
  receiveMethod: "Receiving method",
  shippingName: "Mail recipient name",
  recipientName: "Recipient",
  recipientPhone: "Recipient phone",
  recipientPhoneHint: "010-0000-0000",
  deliveryAddress: "Report delivery address",
  addressSearch: "Search address",
  addressDetail: "Detail address",
  addressSearchTitle: "Postal code search",
  addressSearchPlaceholder: "Enter a road name, building, or lot number",
  addressSearchButton: "Search",
  addressSearchLoading: "Searching...",
  addressSearchEmpty: "No results. Try a different keyword.",
  addressSearchError: "Address search failed. Please try again shortly.",
  addressSearchClose: "Close",
  addressSelect: "Select",
  samplePhoto: "Attach sample photos to report",
  samplePhotoAttach: "Attach sample photos",
  samplePhotoSkip: "Do not attach",
  sampleHandling: "Sample handling after testing",
  sampleHandlingDispose: "Dispose",
  sampleHandlingReturn: "Return",
  clientSectionTitle: "Requesting company (printed on the report)",
  companyName: "Company name",
  representativeName: "Representative",
  businessRegistrationNumber: "Business registration number",
  contactName: "Contact name",
  phone: "Contact phone",
  email: "Contact email",
  emailDomains: ["naver.com", "daum.net", "gmail.com", "hanmail.net", "nate.com"],
  emailDomainDirect: "Enter directly",
  address: "Address",
  addressPlaceholder: "Address",
  remarks: "Remarks",
  remarksPlaceholder:
    "If you need to pass along or request something that is not covered by this form, please write it here. (About 300 characters)",
  purposes: [
    { value: "reference", label: "Reference" },
    { value: "quality", label: "Quality control" },
    { value: "customer", label: "Customer submission" },
    { value: "other", label: "Other" },
  ],
  receiveMethods: [
    { value: "visit", label: "Visit" },
    { value: "mail", label: "Mail" },
    { value: "electronic", label: "Electronic report" },
  ],
  errors: {
    equipmentRequired: "Select at least one test.",
    sampleName: "Enter the sample name.",
    quantityRequired: "Enter the sample count.",
    quantityInvalid: "Enter the sample count as a whole number of 1 or more.",
    weightRequired: "Enter the sample weight.",
    weightInvalid: "Enter the sample weight as a number greater than 0.",
    sizeRequired: "Enter the sample size.",
    sizeInvalid: "Enter the sample size as a number greater than 0.",
    sizeIncomplete: "Enter all sample size values (W, D, H).",
    customSpecIncomplete: "Enter both the label and value for each specification.",
    receptionType: "Select a reception type.",
    purpose: "Select a report purpose.",
    purposeDetail: "Enter the submission recipient.",
    copyCountRequired: "Enter the number of copies.",
    copyCountInvalid: "Enter the number of copies as a whole number of 1 or more.",
    receiveMethod: "Select a receiving method.",
    shippingName: "Enter the mail recipient name.",
    recipientName: "Enter the recipient name.",
    recipientPhone: "Enter the recipient phone number.",
    postalCode: "Select a postal code via address search.",
    deliveryAddress: "Select a delivery address.",
    addressDetail: "Enter the detail address.",
    samplePhoto: "Select whether to attach sample photos.",
    sampleHandling: "Select sample handling after testing.",
    emailRequired: "Enter the contact email.",
    emailInvalid: "Check the email format.",
    companyName: "Enter the company name.",
    representativeName: "Enter the representative name.",
    businessNumberInvalid: "Enter 10 digits. Hyphens are allowed.",
    contactName: "Enter the contact name.",
    phone: "Enter the contact phone number.",
    phoneInvalid: "Check the contact phone number.",
    companyPostalCode: "Select a postal code via address search.",
    address: "Select an address via address search.",
    consentRequired: "Consent is required.",
    tooLong: "This entry is too long.",
  },
} satisfies TestCenterCopy;

export const testCenterCopy = { ko, en };

export function optionLabel(
  options: ChoiceOption[],
  value: string,
  empty: string
) {
  return options.find((option) => option.value === value)?.label ?? empty;
}

export function formatReceivedDate(date: Date, lang: "ko" | "en") {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  if (lang === "en") {
    const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
    return `${year}-${month}-${day} (${weekday})`;
  }
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"] as const;
  return `${year}-${month}-${day} (${weekdays[date.getDay()]})`;
}
