import React, { useCallback, useMemo, useState } from "react";
import { motion, type Transition } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const cardAppearTransition: Transition = {
  duration: 0.7,
  ease: [0.22, 1, 0.36, 1]
};

const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const ALLOWED_EXTS = ["pdf", "doc", "docx", "hwp"] as const;

type JobApplicationFormValues = {
  name: string;
  email: string;
  phone: string;
  position: string;
  message?: string;
  website?: string;
  resume: FileList;
};

const formatBytes = (bytes: number) => {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0B";
  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let i = 0;
  while (value >= 1024 && i < units.length - 1) {
    value /= 1024;
    i += 1;
  }
  const shown = i === 0 ? Math.round(value) : Math.round(value * 10) / 10;
  return `${shown}${units[i]}`;
};

export const JobApplicationUploadForm: React.FC<{ lang: "KOR" | "ENG" }> = ({
  lang
}) => {
  const t = useMemo(() => {
    if (lang === "ENG") {
      return {
        title: "Apply Online",
        subtitle:
          "Upload your resume and submit your application. HR will review and contact you by email.",
        hint: `Allowed formats: PDF/DOC/DOCX/HWP (max ${formatBytes(
          MAX_RESUME_BYTES
        )}).`,
        name: "Name",
        email: "Email",
        phone: "Phone",
        position: "Position",
        message: "Message (optional)",
        resume: "Resume / Documents",
        submit: "Submit Application",
        submitting: "Submitting...",
        success: "Your application has been submitted successfully.",
        submitError: "Failed to submit. Please try again.",
        required: "Please fill out all required fields.",
        invalidEmail: "Please enter a valid email address.",
        invalidFileRequired: "Please attach your resume/document.",
        invalidFileSize: `File must be <= ${formatBytes(MAX_RESUME_BYTES)}.`,
        invalidFileExt: "File type not allowed.",
        fileSelected: "Selected",
        clear: "Clear"
      } as const;
    }

    return {
      title: "온라인 지원",
      subtitle:
        "이력서(서류)를 업로드하여 지원하실 수 있습니다. 접수 후 담당자가 이메일로 안내드립니다.",
      hint: `가능한 형식: PDF/DOC/DOCX/HWP (최대 ${formatBytes(
        MAX_RESUME_BYTES
      )}).`,
      name: "이름",
      email: "이메일",
      phone: "연락처(전화번호)",
      position: "지원 분야",
      message: "메시지(선택)",
      resume: "이력서/첨부 서류",
      submit: "지원하기",
      submitting: "전송 중...",
      success: "지원이 성공적으로 접수되었습니다.",
      submitError: "접수에 실패했습니다. 다시 시도해 주세요.",
      required: "필수 항목을 모두 입력해 주세요.",
      invalidEmail: "이메일 형식을 확인해 주세요.",
      invalidFileRequired: "이력서/서류 파일을 첨부해 주세요.",
      invalidFileSize: `파일은 ${formatBytes(
        MAX_RESUME_BYTES
      )} 이하여야 합니다.`,
      invalidFileExt: "허용되지 않는 파일 형식입니다.",
      fileSelected: "선택됨",
      clear: "초기화"
    } as const;
  }, [lang]);

  const endpoint = useMemo(() => {
    const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL;
    if (!wpUrl) return "/wp-json/suman/v1/job-applications";

    try {
      const origin = new URL(wpUrl).origin;
      return `${origin}/wp-json/suman/v1/job-applications`;
    } catch {
      return "/wp-json/suman/v1/job-applications";
    }
  }, []);

  const schema = useMemo(() => {
    const allowedExts = new Set<string>(ALLOWED_EXTS);
    return z.object({
      name: z.string().trim().min(1, t.required).max(100),
      email: z
        .string()
        .trim()
        .min(1, t.required)
        .email(t.invalidEmail)
        .max(254),
      phone: z.string().trim().min(1, t.required).max(60),
      position: z.string().trim().min(1, t.required).max(120),
      message: z.string().trim().max(2000).optional(),
      website: z.string().optional(),
      resume: z
        .any()
        .refine(
          (files: unknown) => files instanceof FileList && files.length === 1,
          t.invalidFileRequired
        )
        .refine((files: FileList) => {
          const file = files.item(0);
          return Boolean(file && file.size <= MAX_RESUME_BYTES);
        }, t.invalidFileSize)
        .refine((files: FileList) => {
          const file = files.item(0);
          if (!file) return false;
          const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
          return allowedExts.has(ext);
        }, t.invalidFileExt)
    });
  }, [t]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors }
  } = useForm<JobApplicationFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      position: "",
      message: "",
      website: ""
    } as any
  });

  const resumeFiles = watch("resume");
  const selectedFile = resumeFiles?.item?.(0) ?? null;

  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const clearForm = useCallback(() => {
    setSubmitError(null);
    setSubmitSuccess(null);
    reset({
      name: "",
      email: "",
      phone: "",
      position: "",
      message: "",
      website: ""
    } as any);
    setValue("resume", undefined as any, { shouldValidate: false });
  }, [reset, setValue]);

  const onSubmit = useCallback(
    async (values: JobApplicationFormValues) => {
      setSubmitError(null);
      setSubmitSuccess(null);
      setSubmitLoading(true);

      try {
        const file = values.resume?.item?.(0);
        if (!file) throw new Error(t.invalidFileRequired);

        const fd = new FormData();
        fd.append("name", values.name);
        fd.append("email", values.email);
        fd.append("phone", values.phone);
        fd.append("position", values.position);
        fd.append("message", values.message ?? "");
        fd.append("website", values.website ?? "");
        fd.append("resume", file);

        const res = await fetch(endpoint, {
          method: "POST",
          body: fd
        });

        const data = await res.json().catch(() => null);
        if (!res.ok || !data?.ok) {
          throw new Error(data?.error ?? t.submitError);
        }

        setSubmitSuccess(t.success);
        clearForm();
      } catch (err) {
        setSubmitError(err instanceof Error ? err.message : t.submitError);
      } finally {
        setSubmitLoading(false);
      }
    },
    [clearForm, endpoint, t]
  );

  return (
    <section className="bg-gradient-to-b from-white via-slate-50/40 to-white mt-10 px-6 md:px-[60px] lg:px-[0px] pb-14">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white p-8 sm:p-10 shadow-[0_25px_70px_-50px_rgba(15,23,42,0.35)]"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0, transition: cardAppearTransition }}
          viewport={{ once: true, amount: 0.25 }}
        >
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-sky-50/80 via-white to-white" />
          <div className="relative z-10">
            <div className="flex flex-col gap-3">
              <span className="inline-flex w-fit items-center rounded-full bg-slate-900/5 px-3 py-1 text-xs font-semibold tracking-[0.28em] text-slate-700">
                {t.title}
              </span>
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                {t.title}
              </h2>
              <p className="max-w-3xl text-sm text-slate-600 sm:text-base">
                {t.subtitle}
              </p>
              <p className="text-xs font-medium text-slate-500">{t.hint}</p>
            </div>

            <form
              className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                type="text"
                tabIndex={-1}
                aria-hidden="true"
                className="hidden"
                autoComplete="off"
                {...register("website")}
              />

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-800">
                  {t.name}
                </label>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400"
                  {...register("name")}
                />
                {errors.name?.message ? (
                  <p className="text-xs font-medium text-rose-600">
                    {String(errors.name.message)}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-800">
                  {t.email}
                </label>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400"
                  inputMode="email"
                  autoComplete="email"
                  {...register("email")}
                />
                {errors.email?.message ? (
                  <p className="text-xs font-medium text-rose-600">
                    {String(errors.email.message)}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-800">
                  {t.phone}
                </label>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400"
                  autoComplete="tel"
                  {...register("phone")}
                />
                {errors.phone?.message ? (
                  <p className="text-xs font-medium text-rose-600">
                    {String(errors.phone.message)}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-800">
                  {t.position}
                </label>
                <input
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400"
                  {...register("position")}
                />
                {errors.position?.message ? (
                  <p className="text-xs font-medium text-rose-600">
                    {String(errors.position.message)}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-slate-800">
                  {t.message}
                </label>
                <textarea
                  className="min-h-[120px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400"
                  {...register("message")}
                />
                {errors.message?.message ? (
                  <p className="text-xs font-medium text-rose-600">
                    {String(errors.message.message)}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-slate-800">
                  {t.resume}
                </label>
                <div className="flex flex-col gap-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 p-5">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <input
                      type="file"
                      accept={ALLOWED_EXTS.map((e) => `.${e}`).join(",")}
                      className="block w-full text-sm file:mr-4 file:rounded-xl file:border-0 file:bg-[#0A1633] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-[#102042]"
                      {...register("resume")}
                    />
                    <button
                      type="button"
                      onClick={clearForm}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm whitespace-nowrap font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto"
                    >
                      {t.clear}
                    </button>
                  </div>

                  {selectedFile ? (
                    <div className="flex flex-col gap-1 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between">
                      <span>
                        {t.fileSelected}:{" "}
                        <span className="font-semibold text-slate-800">
                          {selectedFile.name}
                        </span>
                      </span>
                      <span className="font-medium">
                        {formatBytes(selectedFile.size)}
                      </span>
                    </div>
                  ) : null}

                  {errors.resume?.message ? (
                    <p className="text-xs font-medium text-rose-600">
                      {String(errors.resume.message)}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="md:col-span-2">
                {submitError ? (
                  <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
                    {submitError}
                  </div>
                ) : null}
                {submitSuccess ? (
                  <div className="mb-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                    {submitSuccess}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={submitLoading}
                  className="w-full rounded-2xl bg-[#0A1633] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[#0a1633]/20 transition hover:bg-[#102042] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitLoading ? t.submitting : t.submit}
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
