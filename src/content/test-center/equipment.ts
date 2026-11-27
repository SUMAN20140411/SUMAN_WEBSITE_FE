export type ChoiceOption = {
  value: string;
  label: string;
};

export type TestCenterCopy = {
  pageTitle: string;
  heroTitle: string;
  heroSubtitle: string;
  breadcrumb: string;
  applicationFormTitle: string;
  applicationFormDescription: string;
  applicationFormDownload: string;
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
  applicationFiles: string;
  applicationFilesHint: string;
  filesAddButton: string;
  fileSelectButton: string;
  fileRemove: string;
  fileCountStatus: (count: number, max: number) => string;
  receivedDate: string;
  desiredCompletionDate: string;
  desiredCompletionDateBadge: string;
  desiredCompletionDateNotice: string;
  receptionType: string;
  receptionTypeGeneral: string;
  receptionTypeKolasNote: string;
  purpose: string;
  purposeDetailPlaceholder: string;
  purposeHint: string;
  analysisPurpose: string;
  analysisPurposePlaceholder: string;
  analysisPurposeHint: string;
  analysisPurposes: ChoiceOption[];
  copyCount: string;
  copyCountUnit: string;
  receiveMethod: string;
  receiveMethodEmailNote: string;
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
  sampleHandling: string;
  sampleHandlingDispose: string;
  sampleHandlingReturn: string;
  additionalAnalysis: string;
  additionalAnalysisYes: string;
  additionalAnalysisNo: string;
  additionalAnalysisPlaceholder: string;
  clientSectionTitle: string;
  companyName: string;
  businessRegistrationNumber: string;
  businessRegistrationFile: string;
  businessRegistrationFileHint: string;
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
    applicationFilesTooMany: string;
    fileEmpty: string;
    fileTooLarge: string;
    fileTypeInvalid: string;
    receptionType: string;
    purpose: string;
    purposeDetail: string;
    analysisPurpose: string;
    analysisPurposeOther: string;
    desiredCompletionDateRequired: string;
    desiredCompletionDateInvalid: string;
    copyCountRequired: string;
    copyCountInvalid: string;
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
    emailRequired: string;
    emailInvalid: string;
    companyName: string;
    businessNumberInvalid: string;
    businessRegFileRequired: string;
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
  applicationFormTitle: "시험분석신청서 양식",
  applicationFormDescription:
    "오프라인 작성이나 상세 시험 내용 첨부가 필요한 경우 양식을 다운로드하여 작성한 뒤 2단계 '신청서 첨부파일'에 업로드해 주세요.",
  applicationFormDownload: "시험분석신청서 다운로드",
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
    "(필수) 개인정보 수집 및 이용에 동의합니다. 수집 항목은 업체명, 사업자등록번호, 사업자등록증, 담당자 연락처(성명, 전화번호, 이메일), 주소, 시료 정보(신청서 첨부파일 포함)입니다. 이용 목적은 시험 접수, 신청인 연락, 성적서 발급, 접수 확인 메일 발송이며, 보유 기간은 3년입니다.",
  consentDamage:
    "(필수) 시험 과정에서 시료가 손상되거나 파손될 수 있음을 이해합니다.",
  missingApi: "시험 접수 주소가 설정되지 않았습니다. 관리자에게 문의해 주세요.",
  retry: "접수에 실패했습니다. 입력 내용은 그대로입니다. 다시 시도해 주세요.",
  successTitle: "접수가 완료되었습니다",
  receiptLabel: "접수번호",
  successEmail: (email: string) => `확인 메일이 이메일(${email})로 발송됩니다.`,
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
  applicationFiles: "신청서 첨부파일",
  applicationFilesHint:
    "PDF, 이미지, 오피스 문서, HWP/HWPX, ZIP 파일 · 최대 5개 · 개당 10MB 이하",
  filesAddButton: "파일 추가",
  fileSelectButton: "파일 선택",
  fileRemove: "삭제",
  fileCountStatus: (count: number, max: number) => `${count} / ${max}개`,
  receivedDate: "접수일자",
  desiredCompletionDate: "희망 완료일",
  desiredCompletionDateBadge: "* 협의 필수",
  desiredCompletionDateNotice:
    "희망 완료일은 시험 일정 및 장비 상황에 따라 접수 후 담당자와 협의가 반드시 필요합니다.",
  receptionType: "접수 구분",
  receptionTypeGeneral: "일반성적서",
  receptionTypeKolasNote: "추후에 KOLAS 인증받으면 기재 예정",
  purpose: "성적서 용도",
  purposeDetailPlaceholder: "거래처 제출용일 경우 제출처를 작성해 주세요.",
  purposeHint: "성적서 용도가 해당 없을 경우 기타를 선택하세요.",
  analysisPurpose: "분석 용도",
  analysisPurposePlaceholder: "기타 분석 용도를 직접 입력해 주세요.",
  analysisPurposeHint:
    "해당하는 항목을 모두 선택해 주세요. 목록에 없는 경우 기타를 선택해 직접 입력할 수 있습니다.",
  analysisPurposes: [
    { value: "rnd", label: "연구개발 / 개발 검증" },
    { value: "failure", label: "불량 / 고장 원인 분석" },
    { value: "reliability", label: "신뢰성 평가 / 양산 품질 확인" },
    { value: "certification", label: "인증 / 규격 대응" },
    { value: "other", label: "기타" },
  ],
  copyCount: "성적서 발급매수",
  copyCountUnit: "매",
  receiveMethod: "성적서 수령방법",
  receiveMethodEmailNote:
    "이메일 수령 시 4단계에서 입력한 담당자 이메일로 성적서가 발송됩니다.",
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
  sampleHandling: "시험 후 시료 처리방법",
  sampleHandlingDispose: "폐기",
  sampleHandlingReturn: "반환",
  additionalAnalysis: "추가 분석 요구사항 여부",
  additionalAnalysisYes: "있음",
  additionalAnalysisNo: "없음",
  additionalAnalysisPlaceholder:
    "추가로 진행하고 싶은 분석시험 내용을 구체적으로 입력해 주세요.",
  clientSectionTitle: "의뢰업체 정보(성적서 기입)",
  companyName: "업체명",
  businessRegistrationNumber: "사업자 등록번호",
  businessRegistrationFile: "사업자등록증 첨부",
  businessRegistrationFileHint:
    "PDF 또는 이미지(JPG, PNG, GIF, WEBP) · 1개 · 10MB 이하",
  contactName: "담당자명",
  phone: "담당자 연락처",
  email: "담당자 이메일",
  emailDomains: [
    "naver.com",
    "daum.net",
    "gmail.com",
    "hanmail.net",
    "nate.com",
  ],
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
    { value: "mail", label: "우편" },
    { value: "email", label: "이메일" },
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
    applicationFilesTooMany:
      "신청서 첨부파일은 최대 5개까지 첨부할 수 있습니다.",
    fileEmpty: "빈 파일은 첨부할 수 없습니다.",
    fileTooLarge: "첨부파일은 개당 10MB 이하만 업로드할 수 있습니다.",
    fileTypeInvalid: "허용되지 않는 파일 형식입니다.",
    receptionType: "접수 구분을 선택해 주세요.",
    purpose: "성적서 용도를 선택해 주세요.",
    purposeDetail: "제출처를 입력해 주세요.",
    analysisPurpose: "분석 용도를 1개 이상 선택해 주세요.",
    analysisPurposeOther: "기타 분석 용도를 입력해 주세요.",
    desiredCompletionDateRequired: "희망 완료일을 선택해 주세요.",
    desiredCompletionDateInvalid:
      "희망 완료일은 오늘 이후 날짜로 선택해 주세요.",
    copyCountRequired: "발급매수를 입력해 주세요.",
    copyCountInvalid: "발급매수는 1 이상의 정수로 입력해 주세요.",
    receiveMethod: "수령방법을 선택해 주세요.",
    shippingName: "우송처명을 입력해 주세요.",
    recipientName: "수령자를 입력해 주세요.",
    recipientPhone: "수령자 전화번호를 입력해 주세요.",
    postalCode: "주소 검색으로 우편번호를 선택해 주세요.",
    deliveryAddress: "수령지 주소를 선택해 주세요.",
    addressDetail: "상세주소를 입력해 주세요.",
    sampleHandling: "시료 처리방법을 선택해 주세요.",
    additionalAnalysis: "추가 분석 요구사항 여부를 선택해 주세요.",
    additionalAnalysisDetail: "추가 분석 요구사항 내용을 입력해 주세요.",
    emailRequired: "담당자 이메일을 입력해 주세요.",
    emailInvalid: "이메일 형식을 확인해 주세요.",
    companyName: "업체명을 입력해 주세요.",
    businessNumberInvalid:
      "사업자등록번호는 숫자 10자리입니다. 하이픈은 사용할 수 있습니다.",
    businessRegFileRequired: "사업자등록증 파일을 첨부해 주세요.",
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
  applicationFormTitle: "Test & Analysis Application Form (KOR)",
  applicationFormDescription:
    "Download this form if you need to prepare an offline application, then attach the completed file under Step 2 (Application attachments).",
  applicationFormDownload: "Download Form",
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
    "(Required) I agree to the collection and use of personal information. Items collected: company name, business registration number, business registration certificate, contact details (name, phone, email), address, and sample information (including application attachments). Purposes: receiving the test request, contacting the applicant, issuing the report, and sending the receipt email. Retention period: 3 years.",
  consentDamage:
    "(Required) I understand that a test may damage or destroy the sample.",
  missingApi:
    "The test request address is not configured. Please contact the administrator.",
  retry:
    "The request could not be submitted. Your entries are unchanged. Please try again.",
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
  applicationFiles: "Application attachments",
  applicationFilesHint:
    "PDF, images, Office docs, HWP/HWPX, or ZIP · Up to 5 files · Max 10MB each",
  filesAddButton: "Add files",
  fileSelectButton: "Select file",
  fileRemove: "Remove",
  fileCountStatus: (count: number, max: number) => `${count} / ${max} files`,
  receivedDate: "Reception date",
  desiredCompletionDate: "Desired completion date",
  desiredCompletionDateBadge: "* Consultation required",
  desiredCompletionDateNotice:
    "The desired completion date must be confirmed through consultation with our manager based on testing schedules.",
  receptionType: "Reception type",
  receptionTypeGeneral: "General report",
  receptionTypeKolasNote: "To be filled after KOLAS certification",
  purpose: "Report purpose",
  purposeDetailPlaceholder: "If submitting to a customer, enter the recipient.",
  purposeHint: "If none apply, select Other.",
  analysisPurpose: "Analysis purpose",
  analysisPurposePlaceholder: "Enter the other analysis purpose.",
  analysisPurposeHint:
    "Select all that apply. Choose Other to enter a custom purpose.",
  analysisPurposes: [
    { value: "rnd", label: "R&D / Development verification" },
    { value: "failure", label: "Failure / Defect cause analysis" },
    { value: "reliability", label: "Reliability / Mass-production QC" },
    { value: "certification", label: "Certification / Standard compliance" },
    { value: "other", label: "Other" },
  ],
  copyCount: "Number of copies",
  copyCountUnit: "copies",
  receiveMethod: "Receiving method",
  receiveMethodEmailNote:
    "When Email is selected, the report will be sent to the contact email entered in Step 4.",
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
  sampleHandling: "Sample handling after testing",
  sampleHandlingDispose: "Dispose",
  sampleHandlingReturn: "Return",
  additionalAnalysis: "Additional analysis requirements",
  additionalAnalysisYes: "Yes",
  additionalAnalysisNo: "No",
  additionalAnalysisPlaceholder:
    "Please describe any additional analysis or tests you would like to request.",
  clientSectionTitle: "Requesting company (printed on the report)",
  companyName: "Company name",
  businessRegistrationNumber: "Business registration number",
  businessRegistrationFile: "Business registration certificate",
  businessRegistrationFileHint:
    "PDF or image (JPG, PNG, GIF, WEBP) · 1 file · Max 10MB",
  contactName: "Contact name",
  phone: "Contact phone",
  email: "Contact email",
  emailDomains: [
    "naver.com",
    "daum.net",
    "gmail.com",
    "hanmail.net",
    "nate.com",
  ],
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
    { value: "email", label: "Email" },
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
    customSpecIncomplete:
      "Enter both the label and value for each specification.",
    applicationFilesTooMany: "You can attach up to 5 application files.",
    fileEmpty: "Empty files cannot be uploaded.",
    fileTooLarge: "Each file must be 10MB or smaller.",
    fileTypeInvalid: "This file type is not supported.",
    receptionType: "Select a reception type.",
    purpose: "Select a report purpose.",
    purposeDetail: "Enter the submission recipient.",
    analysisPurpose: "Select at least one analysis purpose.",
    analysisPurposeOther: "Enter the other analysis purpose.",
    desiredCompletionDateRequired: "Select a desired completion date.",
    desiredCompletionDateInvalid:
      "Select today or a future date for the desired completion date.",
    copyCountRequired: "Enter the number of copies.",
    copyCountInvalid:
      "Enter the number of copies as a whole number of 1 or more.",
    receiveMethod: "Select a receiving method.",
    shippingName: "Enter the mail recipient name.",
    recipientName: "Enter the recipient name.",
    recipientPhone: "Enter the recipient phone number.",
    postalCode: "Select a postal code via address search.",
    deliveryAddress: "Select a delivery address.",
    addressDetail: "Enter the detail address.",
    sampleHandling: "Select sample handling after testing.",
    additionalAnalysis: "Select whether additional analysis is required.",
    additionalAnalysisDetail: "Enter the additional analysis details.",
    emailRequired: "Enter the contact email.",
    emailInvalid: "Check the email format.",
    companyName: "Enter the company name.",
    businessNumberInvalid: "Enter 10 digits. Hyphens are allowed.",
    businessRegFileRequired: "Attach the business registration certificate.",
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

export type TestRequestStatusCopy = {
  pageTitle: string;
  heroTitle: string;
  heroSubtitle: string;
  breadcrumb: string;
  title: string;
  intro: string;
  receiptLabel: string;
  passwordLabel: string;
  submit: string;
  submitting: string;
  missingApi: string;
  retry: string;
  statusLabel: string;
  receivedDate: string;
  sampleName: string;
  companyName: string;
  empty: string;
  statuses: Record<
    "received" | "in_progress" | "completed" | "cancelled",
    string
  >;
};

const statusKo = {
  pageTitle: "진행 조회 | SUMAN",
  heroTitle: "시험센터",
  heroSubtitle: "진행 조회",
  breadcrumb: "시험센터 > 진행 조회",
  title: "진행 상황 조회",
  intro: "접수 번호와 비밀번호를 입력하면 진행 상황을 확인할 수 있습니다.",
  receiptLabel: "접수번호",
  passwordLabel: "비밀번호",
  submit: "조회",
  submitting: "조회 중...",
  missingApi: "진행 조회 주소가 설정되지 않았습니다. 관리자에게 문의해 주세요.",
  retry: "조회에 실패했습니다. 다시 시도해 주세요.",
  statusLabel: "진행 상태",
  receivedDate: "접수일자",
  sampleName: "시료명",
  companyName: "업체명",
  empty: "없음",
  statuses: {
    received: "접수",
    in_progress: "진행 중",
    completed: "완료",
    cancelled: "취소",
  },
} satisfies TestRequestStatusCopy;

const statusEn = {
  pageTitle: "Check Progress | SUMAN",
  heroTitle: "Test Center",
  heroSubtitle: "Check Progress",
  breadcrumb: "Test Center > Check Progress",
  title: "Check request progress",
  intro: "Enter the receipt number and password to check progress.",
  receiptLabel: "Request number",
  passwordLabel: "Password",
  submit: "Look up",
  submitting: "Looking up...",
  missingApi:
    "The progress lookup address is not configured. Please contact the administrator.",
  retry: "The lookup failed. Please try again.",
  statusLabel: "Status",
  receivedDate: "Reception date",
  sampleName: "Sample name",
  companyName: "Company name",
  empty: "None",
  statuses: {
    received: "Received",
    in_progress: "In progress",
    completed: "Completed",
    cancelled: "Cancelled",
  },
} satisfies TestRequestStatusCopy;

export const testRequestStatusCopy = { ko: statusKo, en: statusEn };

export function optionLabel(
  options: ChoiceOption[],
  value: string,
  empty: string,
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
