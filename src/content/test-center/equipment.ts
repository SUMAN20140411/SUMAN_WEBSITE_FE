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
  chooseFiles: string;
  fileHint: string;
  removeFile: string;
  standardsHint: string;
  businessNumberHint: string;
  consentPrivacy: string;
  consentDamage: string;
  missingApi: string;
  retry: string;
  successTitle: string;
  receiptLabel: string;
  successEmail: (email: string) => string;
  empty: string;
  noFiles: string;
  fileCount: (count: number) => string;
  sampleName: string;
  sampleType: string;
  modelName: string;
  manufacturer: string;
  ratedVoltage: string;
  capacityAh: string;
  quantity: string;
  sampleCondition: string;
  handlingNotes: string;
  attachments: string;
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
  sampleTypes: ChoiceOption[];
  sampleConditions: ChoiceOption[];
  purposes: ChoiceOption[];
  reportLanguages: ChoiceOption[];
  errors: {
    equipmentRequired: string;
    sampleName: string;
    sampleType: string;
    modelName: string;
    manufacturer: string;
    ratedVoltage: string;
    capacityRequired: string;
    capacityInvalid: string;
    quantityRequired: string;
    quantityInvalid: string;
    sampleCondition: string;
    purpose: string;
    reportLanguage: string;
    dateRequired: string;
    dateInvalid: string;
    emailRequired: string;
    emailInvalid: string;
    companyName: string;
    businessNumberRequired: string;
    businessNumberInvalid: string;
    contactName: string;
    department: string;
    phone: string;
    address: string;
    consentRequired: string;
    tooLong: string;
    filesMax: string;
    fileType: (name: string) => string;
    fileSize: (name: string) => string;
    fileInvalid: string;
  };
};

export const STANDARD_CHIPS = ["UN 38.3", "IEC 62133", "IEC 62660"] as const;

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
  chooseFiles: "파일 선택",
  fileHint: "pdf, png, jpg, jpeg, zip · 파일당 10MB · 최대 5개",
  removeFile: "삭제",
  standardsHint: "규격을 누르면 아래 입력란에 추가됩니다.",
  businessNumberHint: "숫자 10자리, 하이픈 입력 가능",
  consentPrivacy:
    "(필수) 개인정보 수집 및 이용에 동의합니다. 수집 항목은 회사명, 사업자등록번호, 담당자 연락처(성명, 부서, 전화번호, 이메일), 주소, 시료 정보입니다. 이용 목적은 시험 접수, 신청인 연락, 성적서 발급, 접수 확인 메일 발송이며, 보유 기간은 3년입니다.",
  consentDamage:
    "(필수) 시험 과정에서 시료가 손상되거나 파손될 수 있음을 이해합니다.",
  missingApi:
    "시험 접수 주소가 설정되지 않았습니다. 관리자에게 문의해 주세요.",
  retry: "접수에 실패했습니다. 입력 내용은 그대로입니다. 다시 시도해 주세요.",
  successTitle: "접수가 완료되었습니다",
  receiptLabel: "접수번호",
  successEmail: (email: string) =>
    `확인 메일이 성적서 수령 이메일(${email})로 발송됩니다.`,
  empty: "없음",
  noFiles: "첨부파일 없음",
  fileCount: (count: number) => `${count} / 5`,
  sampleName: "시료명",
  sampleType: "구분",
  modelName: "모델명",
  manufacturer: "제조사",
  ratedVoltage: "정격 전압",
  capacityAh: "용량(Ah)",
  quantity: "수량",
  sampleCondition: "시료 상태",
  handlingNotes: "취급 주의",
  attachments: "첨부파일",
  purpose: "용도",
  reportLanguage: "성적서 언어",
  standards: "적용 규격",
  desiredCompletionDate: "희망 완료일",
  reportEmail: "성적서 수령 이메일",
  additionalRequest: "추가 요청",
  companyName: "회사명",
  businessRegistrationNumber: "사업자등록번호",
  contactName: "담당자",
  department: "부서",
  phone: "연락처",
  email: "이메일",
  address: "주소",
  sampleTypes: [
    { value: "cell", label: "셀" },
    { value: "module", label: "모듈" },
    { value: "pack", label: "팩" },
    { value: "other", label: "기타" },
  ],
  sampleConditions: [
    { value: "new", label: "신규" },
    { value: "used", label: "사용" },
  ],
  purposes: [
    { value: "quality", label: "품질" },
    { value: "certification", label: "인증제출" },
    { value: "customer", label: "고객제출" },
    { value: "other", label: "기타" },
  ],
  reportLanguages: [
    { value: "ko", label: "국문" },
    { value: "en", label: "영문" },
    { value: "both", label: "국문+영문" },
  ],
  errors: {
    equipmentRequired: "시험 항목을 1개 이상 선택해 주세요.",
    sampleName: "시료명을 입력해 주세요.",
    sampleType: "구분을 선택해 주세요.",
    modelName: "모델명을 입력해 주세요.",
    manufacturer: "제조사를 입력해 주세요.",
    ratedVoltage: "정격 전압을 입력해 주세요.",
    capacityRequired: "용량(Ah)을 입력해 주세요.",
    capacityInvalid: "용량(Ah)은 0보다 큰 숫자로 입력해 주세요.",
    quantityRequired: "수량을 입력해 주세요.",
    quantityInvalid: "수량은 1 이상의 정수로 입력해 주세요.",
    sampleCondition: "시료 상태를 선택해 주세요.",
    purpose: "용도를 선택해 주세요.",
    reportLanguage: "성적서 언어를 선택해 주세요.",
    dateRequired: "희망 완료일을 선택해 주세요.",
    dateInvalid: "희망 완료일은 오늘 또는 이후 날짜여야 합니다.",
    emailRequired: "이메일을 입력해 주세요.",
    emailInvalid: "이메일 형식을 확인해 주세요.",
    companyName: "회사명을 입력해 주세요.",
    businessNumberRequired: "사업자등록번호를 입력해 주세요.",
    businessNumberInvalid: "사업자등록번호는 숫자 10자리입니다. 하이픈은 사용할 수 있습니다.",
    contactName: "담당자를 입력해 주세요.",
    department: "부서를 입력해 주세요.",
    phone: "연락처를 입력해 주세요.",
    address: "주소를 입력해 주세요.",
    consentRequired: "동의가 필요합니다.",
    tooLong: "입력 가능한 길이를 초과했습니다.",
    filesMax: "첨부파일은 최대 5개까지 가능합니다.",
    fileType: (name: string) =>
      `${name} 파일은 pdf, png, jpg, jpeg, zip만 첨부할 수 있습니다.`,
    fileSize: (name: string) => `${name} 파일이 10MB를 초과합니다.`,
    fileInvalid: "첨부파일을 확인해 주세요.",
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
  chooseFiles: "Choose files",
  fileHint: "pdf, png, jpg, jpeg, zip · 10MB each · 5 files max",
  removeFile: "Remove",
  standardsHint: "Choosing a standard appends it to the text.",
  businessNumberHint: "10 digits, hyphens allowed",
  consentPrivacy:
    "(Required) I agree to the collection and use of personal information. Items collected: company name, business registration number, contact details (name, department, phone, email), address, and sample information. Purposes: receiving the test request, contacting the applicant, issuing the report, and sending the receipt email. Retention period: 3 years.",
  consentDamage:
    "(Required) I understand that a test may damage or destroy the sample.",
  missingApi:
    "The test request address is not configured. Please contact the administrator.",
  retry: "The request could not be submitted. Your entries are unchanged. Please try again.",
  successTitle: "Your request has been received",
  receiptLabel: "Request number",
  successEmail: (email: string) =>
    `A confirmation email will be sent to the report receipt address (${email}).`,
  empty: "None",
  noFiles: "No files attached",
  fileCount: (count: number) => `${count} / 5`,
  sampleName: "Sample name",
  sampleType: "Type",
  modelName: "Model",
  manufacturer: "Manufacturer",
  ratedVoltage: "Rated voltage",
  capacityAh: "Capacity (Ah)",
  quantity: "Quantity",
  sampleCondition: "Sample condition",
  handlingNotes: "Handling notes",
  attachments: "Attachments",
  purpose: "Purpose",
  reportLanguage: "Report language",
  standards: "Applied standards",
  desiredCompletionDate: "Requested completion date",
  reportEmail: "Report receipt email",
  additionalRequest: "Additional request",
  companyName: "Company name",
  businessRegistrationNumber: "Business registration number",
  contactName: "Contact person",
  department: "Department",
  phone: "Phone",
  email: "Email",
  address: "Address",
  sampleTypes: [
    { value: "cell", label: "Cell" },
    { value: "module", label: "Module" },
    { value: "pack", label: "Pack" },
    { value: "other", label: "Other" },
  ],
  sampleConditions: [
    { value: "new", label: "New" },
    { value: "used", label: "Used" },
  ],
  purposes: [
    { value: "quality", label: "Quality" },
    { value: "certification", label: "Certification submission" },
    { value: "customer", label: "Customer submission" },
    { value: "other", label: "Other" },
  ],
  reportLanguages: [
    { value: "ko", label: "Korean" },
    { value: "en", label: "English" },
    { value: "both", label: "Korean + English" },
  ],
  errors: {
    equipmentRequired: "Select at least one test.",
    sampleName: "Enter the sample name.",
    sampleType: "Select a sample type.",
    modelName: "Enter the model name.",
    manufacturer: "Enter the manufacturer.",
    ratedVoltage: "Enter the rated voltage.",
    capacityRequired: "Enter the capacity (Ah).",
    capacityInvalid: "Enter the capacity (Ah) as a number greater than 0.",
    quantityRequired: "Enter the quantity.",
    quantityInvalid: "Enter the quantity as a whole number of 1 or more.",
    sampleCondition: "Select the sample condition.",
    purpose: "Select a purpose.",
    reportLanguage: "Select a report language.",
    dateRequired: "Choose a requested completion date.",
    dateInvalid: "The requested completion date cannot be in the past.",
    emailRequired: "Enter an email address.",
    emailInvalid: "Check the email format.",
    companyName: "Enter the company name.",
    businessNumberRequired: "Enter the business registration number.",
    businessNumberInvalid:
      "Enter 10 digits. Hyphens are allowed.",
    contactName: "Enter the contact person.",
    department: "Enter the department.",
    phone: "Enter a phone number.",
    address: "Enter the address.",
    consentRequired: "Consent is required.",
    tooLong: "This entry is too long.",
    filesMax: "You can attach up to 5 files.",
    fileType: (name: string) =>
      `${name} must be a pdf, png, jpg, jpeg, or zip file.`,
    fileSize: (name: string) => `${name} is larger than 10MB.`,
    fileInvalid: "Check the attached files.",
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
