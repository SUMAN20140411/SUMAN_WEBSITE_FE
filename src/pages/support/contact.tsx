import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import BreadcrumbSection from "@/components/BreadcrumbSection";
import { motion } from "framer-motion";
import Head from "next/head";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLangStore } from "@/stores/langStore";
import {
  contactPage,
  contactPageContent
} from "@/lib/strapi/contact/contactPage";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const inquirySchema = z.object({
  name: z.string().trim().min(1, "이름을 입력해 주세요.").max(100),
  affiliation: z.string().trim().max(120).optional(),
  contact: z.string().trim().min(1, "연락처를 입력해 주세요.").max(60),
  email: z
    .email("이메일 형식을 확인해 주세요.")
    .trim()
    .min(1, "이메일을 입력해 주세요.")
    .max(254),
  department: z.string().trim().min(1, "문의부서를 선택해 주세요.").max(120),
  message: z.string().trim().min(1, "문의내용을 입력해 주세요.").max(2000),
  website: z.string().optional()
});

type InquiryFormValues = z.infer<typeof inquirySchema>;

export const getStaticProps = async () => {
  const content = await contactPage.find({
    locale: "ko-KR",
    populate: ["pageInfo", "section1", "section1.contacts"]
  });
  return {
    props: {
      content: content?.data
    }
  };
};

export default function HistoryPage({
  content
}: Readonly<{ content: contactPageContent }>) {
  const { lang } = useLangStore();
  const defaultDepartment =
    lang === "ENG" ? "Sales / Marketing" : "영업 / 마케팅";

  const inquiriesEndpoint = useMemo(() => {
    const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
    if (!wpUrl) return "/wp-json/suman/v1/inquiries";

    try {
      const origin = new URL(wpUrl).origin;
      return `${origin}/wp-json/suman/v1/inquiries`;
    } catch {
      // Fallback to relative URL if parsing fails (same-origin deployments).
      return "/wp-json/suman/v1/inquiries";
    }
  }, []);

  const departmentOptions = useMemo(() => {
    const raw =
      content?.section1?.contacts
        ?.map((c) => c.department)
        .filter((d): d is string => Boolean(d)) ?? [];

    const uniq = Array.from(new Set(raw));
    return uniq.length ? uniq : [defaultDepartment];
  }, [content, defaultDepartment]);

  const initialDepartment = departmentOptions[0] ?? defaultDepartment;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors }
  } = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: "",
      affiliation: "",
      contact: "",
      email: "",
      department: initialDepartment,
      message: "",
      website: ""
    }
  });

  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  useEffect(() => {
    // When locale/content changes, keep `department` valid.
    const current = getValues("department");
    if (!departmentOptions.includes(current)) {
      setValue("department", initialDepartment, { shouldValidate: true });
    }
  }, [departmentOptions, initialDepartment, getValues, setValue]);

  const PER_PAGE = 5;

  type InquiryItem = {
    id: number;
    name: string;
    contactMasked: string;
    emailMasked: string;
    affiliationPreview?: string;
    department?: string;
    messagePreview: string;
    createdAt: string;
  };

  type InquiryListResponse = {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    items: InquiryItem[];
  };

  const [inquiries, setInquiries] = useState<InquiryListResponse | null>(null);
  const [inquiriesLoading, setInquiriesLoading] = useState(false);
  const [inquiriesError, setInquiriesError] = useState<string | null>(null);
  const [inquiriesPage, setInquiriesPage] = useState(1);

  const totalPages = inquiries?.total_pages ?? 1;
  const canGoPrev = inquiriesPage > 1;
  const canGoNext = inquiries ? inquiriesPage < inquiries.total_pages : false;
  const hasInquiries = Boolean(inquiries?.items?.length);

  const t = useMemo(() => {
    if (lang === "ENG") {
      return {
        pageTitle: "Contact Us",
        intro:
          "Please fill in the form below. We will respond promptly to the email address provided below.",
        formTitle: "Inquiry Form",
        latestTitle: "Latest Inquiries",
        submit: "Submit Inquiry",
        submitting: "Submitting...",
        success: "Your inquiry has been submitted successfully.",
        name: "Name",
        affiliation: "Affiliation",
        contact: "Contact (Phone)",
        email: "Email",
        department: "Inquiry Department",
        message: "Message",
        requiredHint: "All fields marked as required must be provided.",
        fetchError: "Failed to load inquiries.",
        submitError: "Failed to submit inquiry. Please try again.",
        prev: "Previous",
        next: "Next",
        noInquiries: "No recent inquiries yet."
      } as const;
    }

    return {
      pageTitle: "문의하기",
      intro:
        "아래의 내용을 기재하여 하단의 메일주소로 문의 주시면 신속하게 답변드리도록 하겠습니다.",
      formTitle: "문의 접수",
      latestTitle: "최근 문의 내역",
      submit: "문의하기",
      submitting: "전송 중...",
      success: "문의가 성공적으로 접수되었습니다.",
      name: "이름",
      affiliation: "소속",
      contact: "연락처(전화번호)",
      email: "이메일",
      department: "문의부서",
      message: "문의내용",
      requiredHint: "필수 항목을 모두 입력해 주세요.",
      fetchError: "문의 내역을 불러오지 못했습니다.",
      submitError: "문의 접수에 실패했습니다. 다시 시도해 주세요.",
      prev: "이전",
      next: "다음",
      noInquiries: "최근 문의 내역이 없습니다."
    } as const;
  }, [lang]);

  const loadInquiries = useCallback(
    async (page: number) => {
      setInquiriesLoading(true);
      setInquiriesError(null);

      try {
        const url = `${inquiriesEndpoint}?page=${page}&per_page=${PER_PAGE}`;
        const res = await fetch(url, {
          method: "GET",
          headers: {
            Accept: "application/json"
          }
        });

        const data = (await res.json()) as InquiryListResponse;

        if (!res.ok) {
          throw new Error((data as any)?.error ?? t.fetchError);
        }

        setInquiries(data);
      } catch (err) {
        setInquiriesError(err instanceof Error ? err.message : t.fetchError);
      } finally {
        setInquiriesLoading(false);
      }
    },
    [inquiriesEndpoint, PER_PAGE, t.fetchError]
  );

  useEffect(() => {
    loadInquiries(inquiriesPage);
  }, [inquiriesPage, loadInquiries]);

  const onInquirySubmit = useCallback(
    async (values: InquiryFormValues) => {
      setSubmitError(null);
      setSubmitSuccess(null);
      setSubmitLoading(true);

      try {
        const payload = {
          name: values.name,
          affiliation: values.affiliation ?? "",
          contact: values.contact,
          email: values.email,
          department: values.department,
          message: values.message,
          language: lang,
          website: values.website ?? "" // Honeypot (anti-spam)
        };

        const res = await fetch(inquiriesEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify(payload)
        });

        const data = await res.json().catch(() => null);
        if (!res.ok || !data?.ok) {
          throw new Error(data?.error ?? t.submitError);
        }

        setSubmitSuccess(t.success);
        reset({
          name: "",
          affiliation: "",
          contact: "",
          email: "",
          department: initialDepartment,
          message: "",
          website: ""
        });
        setInquiriesPage(1);
      } catch (err) {
        setSubmitError(err instanceof Error ? err.message : t.submitError);
      } finally {
        setSubmitLoading(false);
      }
    },
    [
      inquiriesEndpoint,
      lang,
      initialDepartment,
      reset,
      setInquiriesPage,
      t.success,
      t.submitError
    ]
  );

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <Layout>
      <Head>
        <title>{content?.pageInfo?.title || `${t.pageTitle} | 수만`}</title>
      </Head>
      <main className="min-h-screen bg-white pt-[90px] text-slate-900">
        <HeroSection
          title={content?.pageInfo?.title || "문의하기"}
          backgroundImage={
            content?.pageInfo?.hero || "/images/sub_banner/support_banner.png"
          }
        />

        <div className="relative z-30 -mt-8 sm:-mt-10">
          <BreadcrumbSection
            path={content?.pageInfo?.pageLocation || "고객지원 > 문의하기"}
          />
        </div>

        <div className="content-wrapper py-12 md:py-20 px-4 md:px-8 bg-white">
          <div className="max-w-4xl mx-auto w-full">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInVariants}
              className="bg-white rounded-lg p-6 md:p-8 shadow-lg border border-gray-100"
            >
              <section className="w-full">
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-800">
                  {content?.section1?.title || "문의하기"}
                </h2>

                <div className="mb-10 p-5 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-base md:text-lg text-gray-700 text-center">
                    {content?.section1?.description || t.intro}
                  </p>
                </div>

                <div className="mb-10">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                    {t.formTitle}
                  </h3>

                  {submitSuccess && (
                    <div className="mb-4 p-4 bg-emerald-50 border border-emerald-100 text-emerald-900 rounded">
                      {submitSuccess}
                    </div>
                  )}

                  {submitError && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-100 text-red-900 rounded">
                      {submitError}
                    </div>
                  )}

                  <form
                    className="space-y-6"
                    onSubmit={handleSubmit(onInquirySubmit)}
                  >
                    {/* Honeypot (bots often fill this). */}
                    <input
                      type="text"
                      {...register("website")}
                      className="hidden"
                      aria-hidden="true"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                          {t.name}
                        </label>
                        <input
                          {...register("name")}
                          className={`w-full rounded px-3 py-2 bg-white text-gray-900 border ${
                            errors.name ? "border-red-500" : "border-gray-200"
                          }`}
                          type="text"
                        />
                        {errors.name?.message && (
                          <p className="mt-1 text-xs text-red-600">
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                          {t.affiliation}
                        </label>
                        <input
                          {...register("affiliation")}
                          className={`w-full rounded px-3 py-2 bg-white text-gray-900 border ${
                            errors.affiliation
                              ? "border-red-500"
                              : "border-gray-200"
                          }`}
                          type="text"
                        />
                        {errors.affiliation?.message && (
                          <p className="mt-1 text-xs text-red-600">
                            {errors.affiliation.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                          {t.contact}
                        </label>
                        <input
                          {...register("contact")}
                          className={`w-full rounded px-3 py-2 bg-white text-gray-900 border ${
                            errors.contact
                              ? "border-red-500"
                              : "border-gray-200"
                          }`}
                          type="text"
                        />
                        {errors.contact?.message && (
                          <p className="mt-1 text-xs text-red-600">
                            {errors.contact.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                          {t.email}
                        </label>
                        <input
                          {...register("email")}
                          className={`w-full rounded px-3 py-2 bg-white text-gray-900 border ${
                            errors.email ? "border-red-500" : "border-gray-200"
                          }`}
                          type="email"
                        />
                        {errors.email?.message && (
                          <p className="mt-1 text-xs text-red-600">
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                          {t.department}
                        </label>
                        <select
                          {...register("department")}
                          className={`w-full rounded px-3 py-2 bg-white text-gray-900 border ${
                            errors.department
                              ? "border-red-500"
                              : "border-gray-200"
                          }`}
                        >
                          {departmentOptions.map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                        </select>
                        {errors.department?.message && (
                          <p className="mt-1 text-xs text-red-600">
                            {errors.department.message}
                          </p>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                          {t.message}
                        </label>
                        <textarea
                          {...register("message")}
                          className={`w-full rounded px-3 py-2 bg-white text-gray-900 min-h-[140px] border ${
                            errors.message
                              ? "border-red-500"
                              : "border-gray-200"
                          }`}
                        ></textarea>
                        {errors.message?.message && (
                          <p className="mt-1 text-xs text-red-600">
                            {errors.message.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-end">
                      <button
                        type="submit"
                        disabled={submitLoading}
                        className="inline-flex items-center justify-center px-6 py-3 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {submitLoading ? t.submitting : t.submit}
                      </button>
                    </div>
                  </form>
                </div>

                <div className="mt-2 mb-10">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                    {t.latestTitle}
                  </h3>

                  {inquiriesError && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-100 text-red-900 rounded">
                      {inquiriesError}
                    </div>
                  )}

                  <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm border border-gray-200 rounded-lg bg-white">
                      <thead className="bg-gray-50 text-gray-700">
                        <tr>
                          <th className="px-4 py-3 font-semibold whitespace-nowrap">
                            #
                          </th>
                          <th className="px-4 py-3 font-semibold whitespace-nowrap">
                            {t.name}
                          </th>
                          <th className="px-4 py-3 font-semibold whitespace-nowrap">
                            {t.contact}
                          </th>
                          <th className="px-4 py-3 font-semibold whitespace-nowrap">
                            {t.email}
                          </th>
                          <th className="px-4 py-3 font-semibold whitespace-nowrap">
                            {t.affiliation}
                          </th>
                          <th className="px-4 py-3 font-semibold whitespace-nowrap">
                            {t.department}
                          </th>
                          <th className="px-4 py-3 font-semibold">
                            {t.message}
                          </th>
                          <th className="px-4 py-3 font-semibold whitespace-nowrap">
                            Created
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {inquiriesLoading && (
                          <tr>
                            <td colSpan={8} className="px-4 py-6 text-gray-500">
                              Loading...
                            </td>
                          </tr>
                        )}

                        {!inquiriesLoading &&
                          hasInquiries &&
                          inquiries!.items.map((item, idx) => (
                            <tr key={item.id} className="hover:bg-gray-50/50">
                              <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                                {(inquiriesPage - 1) * PER_PAGE + idx + 1}
                              </td>
                              <td className="px-4 py-3 text-gray-900 whitespace-nowrap">
                                {item.name}
                              </td>
                              <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                                {item.contactMasked}
                              </td>
                              <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                                {item.emailMasked}
                              </td>
                              <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                                {item.affiliationPreview?.trim()
                                  ? item.affiliationPreview
                                  : "-"}
                              </td>
                              <td className="px-4 py-3 text-gray-700 whitespace-nowrap">
                                {item.department?.trim()
                                  ? item.department
                                  : "-"}
                              </td>
                              <td className="px-4 py-3 text-gray-700 break-words max-w-[320px]">
                                {item.messagePreview}
                              </td>
                              <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                                {item.createdAt}
                              </td>
                            </tr>
                          ))}

                        {!inquiriesLoading && !hasInquiries && (
                          <tr>
                            <td colSpan={8} className="px-4 py-6 text-gray-500">
                              {t.noInquiries}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="flex items-center justify-between gap-4 mt-4">
                    <button
                      type="button"
                      disabled={inquiriesLoading || !canGoPrev}
                      onClick={() =>
                        setInquiriesPage((p) => Math.max(1, p - 1))
                      }
                      className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {t.prev}
                    </button>

                    <div className="text-sm text-gray-600 whitespace-nowrap">
                      Page{" "}
                      <span className="font-semibold text-gray-900">
                        {inquiries?.page ?? inquiriesPage}
                      </span>{" "}
                      /{" "}
                      <span className="font-semibold text-gray-900">
                        {inquiries?.total_pages ?? 1}
                      </span>
                    </div>

                    <button
                      type="button"
                      disabled={inquiriesLoading || !canGoNext}
                      onClick={() =>
                        setInquiriesPage((p) => Math.min(totalPages, p + 1))
                      }
                      className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {t.next}
                    </button>
                  </div>
                </div>
              </section>
            </motion.div>
          </div>
        </div>
        <hr className="my-8 border-gray-200 w-full" />
      </main>
    </Layout>
  );
}
