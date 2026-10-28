import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import Image from "next/image";
import { FormEvent, useEffect, useId, useMemo, useRef, useState } from "react";
import {
  useFieldArray,
  useForm,
  type Control,
  type FieldErrors,
  type UseFormRegister
} from "react-hook-form";
import {
  STANDARD_CHIPS,
  optionLabel,
  testCenterCopy,
  type ChoiceOption,
  type TestCenterCopy
} from "@/content/test-center/equipment";
import type {
  TestEquipmentCatalog,
  TestEquipmentCategory,
  TestEquipmentItem
} from "@/lib/strapi/collections/testEquipment";
import { buildTestRequestFormData } from "@/lib/test-center/payload";
import {
  MAX_CUSTOM_SPECS,
  TEST_REQUEST_STEP_FIELDS,
  buildSampleSpecs,
  buildTestRequestSchema,
  emptyTestRequest,
  isVibrationCategoryLabel,
  todayInputValue,
  type TestRequestValues
} from "@/lib/test-center/schema";
import { useLangStore } from "@/stores/langStore";

type ReceiptResult = {
  receiptNo: string;
  email: string;
};

function fieldClass(invalid: boolean) {
  return `w-full rounded px-3 py-2 bg-white text-gray-900 border ${
    invalid ? "border-red-500" : "border-gray-200"
  }`;
}

function messageOf(
  error: { message?: unknown; root?: { message?: unknown } } | undefined
) {
  if (!error) return undefined;
  if (typeof error.message === "string" && error.message) return error.message;
  if (typeof error.root?.message === "string" && error.root.message)
    return error.root.message;
  return undefined;
}

function FieldErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1 text-xs text-red-600">
      {message}
    </p>
  );
}

function OptionalMark({ label }: { label: string }) {
  return (
    <span className="ml-2 text-xs font-normal text-gray-500">{label}</span>
  );
}

function TextInput({
  label,
  error,
  optional,
  registration,
  type = "text",
  inputMode,
  autoComplete,
  hint,
  min,
  step
}: {
  label: string;
  error?: string;
  optional?: string;
  registration: ReturnType<UseFormRegister<TestRequestValues>>;
  type?: string;
  inputMode?: "text" | "decimal" | "numeric" | "email" | "tel";
  autoComplete?: string;
  hint?: string;
  min?: string | number;
  step?: string | number;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-gray-800"
      >
        {label}
        {optional ? <OptionalMark label={optional} /> : null}
      </label>
      <input
        id={id}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={
          [hint ? hintId : null, error ? errorId : null]
            .filter(Boolean)
            .join(" ") || undefined
        }
        className={fieldClass(Boolean(error))}
        {...registration}
        min={min}
        step={step}
      />
      {hint ? (
        <p id={hintId} className="mt-1 text-xs text-gray-500">
          {hint}
        </p>
      ) : null}
      <FieldErrorText id={errorId} message={error} />
    </div>
  );
}

function SelectInput({
  label,
  error,
  registration,
  placeholder,
  options
}: {
  label: string;
  error?: string;
  registration: ReturnType<UseFormRegister<TestRequestValues>>;
  placeholder: string;
  options: ChoiceOption[];
}) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-gray-800"
      >
        {label}
      </label>
      <select
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={fieldClass(Boolean(error))}
        {...registration}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <FieldErrorText id={errorId} message={error} />
    </div>
  );
}

function TextAreaInput({
  label,
  error,
  optional,
  registration
}: {
  label: string;
  error?: string;
  optional?: string;
  registration: ReturnType<UseFormRegister<TestRequestValues>>;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold text-gray-800"
      >
        {label}
        {optional ? <OptionalMark label={optional} /> : null}
      </label>
      <textarea
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={`${fieldClass(Boolean(error))} min-h-[120px]`}
        {...registration}
      />
      <FieldErrorText id={errorId} message={error} />
    </div>
  );
}

function displayValue(value: string, empty: string) {
  const trimmed = value.trim();
  return trimmed ? trimmed : empty;
}

function classificationLines(
  items: TestEquipmentItem[],
  categories: TestEquipmentCategory[],
  equipmentIds: string[]
) {
  const categoryById = new Map(
    categories.map((category) => [category.id, category.label])
  );
  return items
    .filter((item) => equipmentIds.includes(item.id))
    .map((item) => {
      const category = categoryById.get(item.categoryId) ?? "";
      return category ? `${category} > ${item.name}` : item.name;
    });
}

function isReceipt(value: unknown): value is { receiptNo: string } {
  if (typeof value !== "object" || value === null || !("receiptNo" in value)) {
    return false;
  }
  const receiptNo = value.receiptNo;
  return typeof receiptNo === "string" && receiptNo.trim().length > 0;
}

function serverMessage(value: unknown) {
  if (typeof value !== "object" || value === null) return null;
  if (
    "message" in value &&
    typeof value.message === "string" &&
    value.message.trim()
  ) {
    return value.message.trim();
  }
  if (
    "error" in value &&
    typeof value.error === "string" &&
    value.error.trim()
  ) {
    return value.error.trim();
  }
  return null;
}

async function readJson(response: Response) {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return null;
  }
}

function SummaryRows({
  rows
}: {
  rows: { label: string; value: string; key?: string }[];
}) {
  return (
    <dl className="grid grid-cols-1 gap-y-3 sm:grid-cols-[minmax(9rem,14rem)_1fr] sm:gap-x-4">
      {rows.map((row, index) => (
        <div key={row.key ?? `${row.label}-${index}`} className="contents">
          <dt className="text-sm text-gray-500">{row.label}</dt>
          <dd className="whitespace-pre-line text-sm font-medium break-words text-gray-900">
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export default function TestRequestWizard({
  catalog
}: {
  catalog: TestEquipmentCatalog;
}) {
  const { lang } = useLangStore();
  const copy = lang === "ENG" ? testCenterCopy.en : testCenterCopy.ko;
  const vibrationRequiredRef = useRef(false);
  const schema = useMemo(
    () =>
      buildTestRequestSchema(copy, {
        vibrationRequired: () => vibrationRequiredRef.current
      }),
    [copy]
  );
  const resolver = useMemo(
    () => zodResolver(schema, undefined, { raw: true }),
    [schema]
  );
  const {
    register,
    control,
    trigger,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors, isSubmitting }
  } = useForm<TestRequestValues>({
    defaultValues: emptyTestRequest,
    resolver,
    mode: "onSubmit"
  });
  const [step, setStep] = useState(0);
  const stepRef = useRef(step);
  stepRef.current = step;
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<ReceiptResult | null>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const selectedIds = watch("equipmentIds");
  const standards = watch("standards");
  const classifications = useMemo(
    () => classificationLines(catalog.items, catalog.categories, selectedIds),
    [catalog.items, catalog.categories, selectedIds]
  );

  vibrationRequiredRef.current = selectedIds.some((id) => {
    const item = catalog.items.find((entry) => entry.id === id);
    if (!item) return false;
    const category = catalog.categories.find(
      (entry) => entry.id === item.categoryId
    );
    return category ? isVibrationCategoryLabel(category.label) : false;
  });

  const goToStep = (nextStep: number) => {
    setStep(nextStep);
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const goNext = async () => {
    const current = stepRef.current;
    const valid = await trigger(TEST_REQUEST_STEP_FIELDS[current]);
    if (valid && stepRef.current === current) {
      goToStep(Math.min(current + 1, TEST_REQUEST_STEP_FIELDS.length - 1));
    }
  };

  const toggleEquipment = (id: string) => {
    const current = getValues("equipmentIds");
    const next = current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id];
    setValue("equipmentIds", next, {
      shouldDirty: true,
      shouldValidate: Boolean(errors.equipmentIds)
    });
  };

  const appendStandard = (chip: string) => {
    const current = getValues("standards");
    if (current.toLowerCase().includes(chip.toLowerCase())) return;
    const next = current.trim() ? `${current.trim()}, ${chip}` : chip;
    setValue("standards", next, { shouldDirty: true, shouldValidate: true });
  };

  const onSubmit = async (values: TestRequestValues) => {
    setSubmitError(null);
    if (values.website.trim()) {
      setSubmitError(copy.retry);
      return;
    }
    const endpoint = process.env.NEXT_PUBLIC_TEST_INTAKE_API_URL;
    if (!endpoint) {
      setSubmitError(copy.missingApi);
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: buildTestRequestFormData(values, copy)
      });
      const payload = await readJson(response);
      if (response.status === 201 && isReceipt(payload)) {
        setReceipt({
          receiptNo: payload.receiptNo.trim(),
          email: values.reportEmail.trim()
        });
        return;
      }
      setSubmitError(serverMessage(payload) ?? copy.retry);
    } catch {
      setSubmitError(copy.retry);
    }
  };

  const onFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (step < TEST_REQUEST_STEP_FIELDS.length - 1) {
      event.preventDefault();
      void goNext();
      return;
    }
    void handleSubmit(onSubmit)(event);
  };

  if (receipt) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="rounded-lg border border-gray-100 bg-white p-6 shadow-lg md:p-10"
        role="status"
      >
        <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
          {copy.successTitle}
        </h2>
        <p className="mt-6 text-sm font-semibold text-gray-500">
          {copy.receiptLabel}
        </p>
        <p className="mt-1 text-3xl font-bold tracking-wide break-all text-blue-700">
          {receipt.receiptNo}
        </p>
        <p className="mt-6 text-base leading-relaxed text-gray-700">
          {copy.successEmail(receipt.email)}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={topRef}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="scroll-mt-28 rounded-lg border border-gray-100 bg-white p-4 shadow-lg sm:p-6 md:p-8"
    >
      <Stepper
        copy={copy}
        step={step}
        disabled={isSubmitting}
        onStep={(index) => {
          if (index < step) goToStep(index);
        }}
      />

      <form className="mt-8" noValidate onSubmit={onFormSubmit}>
        <input
          type="text"
          {...register("website")}
          className="hidden"
          aria-hidden="true"
          tabIndex={-1}
          autoComplete="off"
        />

        <motion.div
          key={step}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <h2 className="text-xl font-bold text-gray-900 md:text-2xl">
            {step + 1}. {copy.steps[step].title}
          </h2>

          {step === 0 ? (
            <EquipmentStep
              copy={copy}
              items={catalog.items}
              categories={catalog.categories}
              selectedIds={selectedIds}
              error={messageOf(errors.equipmentIds)}
              onToggle={toggleEquipment}
            />
          ) : null}

          {step === 1 ? (
            <SampleStep
              copy={copy}
              control={control}
              register={register}
              errors={errors}
              classifications={classifications}
            />
          ) : null}

          {step === 2 ? (
            <ReportStep
              copy={copy}
              register={register}
              errors={errors}
              standards={standards}
              onAppendStandard={appendStandard}
            />
          ) : null}

          {step === 3 ? (
            <ClientStep copy={copy} register={register} errors={errors} />
          ) : null}

          {step === 4 ? (
            <ReviewStep
              copy={copy}
              items={catalog.items}
              categories={catalog.categories}
              values={watch()}
              register={register}
              errors={errors}
              onEdit={goToStep}
            />
          ) : null}
        </motion.div>

        {submitError ? (
          <div
            role="alert"
            className="mt-6 rounded border border-red-100 bg-red-50 p-4 text-sm text-red-900"
          >
            {submitError}
          </div>
        ) : null}

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          {step > 0 ? (
            <button
              type="button"
              onClick={() => goToStep(step - 1)}
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-md border border-gray-300 px-6 py-3 font-medium text-gray-800 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {copy.back}
            </button>
          ) : (
            <span />
          )}
          {step < TEST_REQUEST_STEP_FIELDS.length - 1 ? (
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
            >
              {copy.next}
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? copy.submitting : copy.submit}
            </button>
          )}
        </div>
      </form>
    </motion.div>
  );
}

function Stepper({
  copy,
  step,
  disabled,
  onStep
}: {
  copy: TestCenterCopy;
  step: number;
  disabled: boolean;
  onStep: (index: number) => void;
}) {
  return (
    <ol className="flex gap-2 overflow-x-auto pb-1">
      {copy.steps.map((item, index) => {
        const current = index === step;
        const done = index < step;
        return (
          <li key={item.short} className="min-w-[4.5rem] flex-1">
            <button
              type="button"
              disabled={disabled || index > step}
              aria-current={current ? "step" : undefined}
              onClick={() => onStep(index)}
              className="flex w-full flex-col items-center gap-2 text-center disabled:cursor-default"
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                  current
                    ? "bg-blue-600 text-white"
                    : done
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {index + 1}
              </span>
              <span
                className={`text-[11px] leading-tight sm:text-xs ${
                  current ? "font-bold text-blue-700" : "text-gray-600"
                }`}
              >
                {item.short}
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}

const EQUIPMENT_NAVY = "#3E5870";

function EquipmentStep({
  copy,
  items,
  categories,
  selectedIds,
  error,
  onToggle
}: {
  copy: TestCenterCopy;
  items: TestEquipmentItem[];
  categories: TestEquipmentCategory[];
  selectedIds: string[];
  error?: string;
  onToggle: (id: string) => void;
}) {
  const errorId = useId();
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id ?? "");
  const [previewId, setPreviewId] = useState(items[0]?.id ?? "");
  const categoryItems = useMemo(
    () => items.filter((item) => item.categoryId === activeCategory),
    [items, activeCategory]
  );
  const previewItem =
    categoryItems.find((item) => item.id === previewId) ?? categoryItems[0];

  useEffect(() => {
    if (!categoryItems.some((item) => item.id === previewId)) {
      setPreviewId(categoryItems[0]?.id ?? "");
    }
  }, [categoryItems, previewId]);

  return (
    <div className="mt-6 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-blue-700">
          {copy.selectedCount(selectedIds.length)}
        </p>
      </div>
      {error ? (
        <p id={errorId} className="text-xs text-red-600">
          {error}
        </p>
      ) : null}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)_minmax(0,1.6fr)]">
        <section className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          <h3
            className="px-4 py-3 text-center text-sm font-bold text-white"
            style={{ backgroundColor: EQUIPMENT_NAVY }}
          >
            {copy.columnGroup}
          </h3>
          <ul className="divide-y divide-gray-100">
            {categories.map((category) => {
              const active = category.id === activeCategory;
              const selectedInCategory = items.filter(
                (item) =>
                  item.categoryId === category.id &&
                  selectedIds.includes(item.id)
              ).length;
              return (
                <li key={category.id}>
                  <button
                    type="button"
                    aria-pressed={active}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex w-full items-center gap-2 px-4 py-3 text-left text-sm transition-colors ${
                      active
                        ? "font-semibold text-white"
                        : "text-gray-800 hover:bg-slate-50"
                    }`}
                    style={
                      active ? { backgroundColor: EQUIPMENT_NAVY } : undefined
                    }
                  >
                    <span
                      className={`mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                        active ? "bg-white" : "bg-gray-400"
                      }`}
                      aria-hidden="true"
                    />
                    <span className="min-w-0 flex-1 break-words">
                      {category.label}
                    </span>
                    {selectedInCategory > 0 ? (
                      <span
                        className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${
                          active
                            ? "bg-white/20 text-white"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {selectedInCategory}
                      </span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          <h3
            className="px-4 py-3 text-center text-sm font-bold text-white"
            style={{ backgroundColor: EQUIPMENT_NAVY }}
          >
            {copy.columnTests}
          </h3>
          <ul className="divide-y divide-gray-100">
            {categoryItems.map((item) => {
              const selected = selectedIds.includes(item.id);
              const previewing = previewItem?.id === item.id;
              const name = item.name;
              return (
                <li key={item.id}>
                  <div
                    className={`flex items-center gap-2 px-3 py-2 transition-colors ${
                      selected
                        ? "text-white"
                        : previewing
                        ? "bg-slate-100 text-gray-900"
                        : "text-gray-800 hover:bg-slate-50"
                    }`}
                    style={
                      selected ? { backgroundColor: EQUIPMENT_NAVY } : undefined
                    }
                  >
                    <button
                      type="button"
                      onMouseEnter={() => setPreviewId(item.id)}
                      onFocus={() => setPreviewId(item.id)}
                      onClick={() => setPreviewId(item.id)}
                      className={`flex min-w-0 flex-1 items-center gap-2 py-1 text-left text-sm ${
                        selected || previewing ? "font-semibold" : ""
                      }`}
                    >
                      <span
                        className={`mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                          selected ? "bg-white" : "bg-gray-400"
                        }`}
                        aria-hidden="true"
                      />
                      <span className="min-w-0 flex-1 break-words">{name}</span>
                    </button>
                    <button
                      type="button"
                      aria-pressed={selected}
                      aria-describedby={error ? errorId : undefined}
                      onClick={() => {
                        setPreviewId(item.id);
                        onToggle(item.id);
                      }}
                      className={`shrink-0 rounded px-2.5 py-1 text-xs font-semibold transition-colors ${
                        selected
                          ? "bg-white/20 text-white hover:bg-white/30"
                          : "border border-gray-300 bg-white text-gray-800 hover:border-slate-400 hover:bg-slate-50"
                      }`}
                    >
                      {selected ? copy.removeItem : copy.addItem}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="overflow-hidden rounded-lg border border-gray-200 bg-white">
          <h3
            className="px-4 py-3 text-center text-sm font-bold text-white"
            style={{ backgroundColor: EQUIPMENT_NAVY }}
          >
            {copy.columnPreview}
          </h3>
          {previewItem ? (
            <div className="space-y-3 p-4">
              <div
                className={`overflow-hidden rounded-md border bg-white ${
                  selectedIds.includes(previewItem.id)
                    ? "border-transparent ring-2 ring-[#3E5870] ring-offset-1"
                    : "border-gray-200"
                }`}
              >
                <div className="relative aspect-[4/3] w-full bg-slate-100">
                  {previewItem.image ? (
                    <Image
                      src={previewItem.image}
                      alt={previewItem.name}
                      fill
                      objectFit="contain"
                      sizes="(min-width: 1024px) 28rem, 100vw"
                      className="object-cover"
                      priority
                    />
                  ) : null}
                </div>
                <span
                  className="block px-3 py-2.5 text-center text-sm font-semibold text-white"
                  style={{ backgroundColor: EQUIPMENT_NAVY }}
                >
                  {previewItem.name}
                </span>
              </div>
              {previewItem.summary ? (
                <p className="text-sm text-gray-700">{previewItem.summary}</p>
              ) : null}
              {previewItem.specs.length > 0 ? (
                <dl className="space-y-1 text-sm">
                  {previewItem.specs.map((spec, index) => (
                    <div
                      key={`${spec.label}-${index}`}
                      className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] gap-3"
                    >
                      <dt className="text-gray-500">{spec.label}</dt>
                      <dd className="font-medium break-words text-gray-900">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : null}
              <button
                type="button"
                aria-pressed={selectedIds.includes(previewItem.id)}
                aria-describedby={error ? errorId : undefined}
                onClick={() => onToggle(previewItem.id)}
                className={`w-full rounded-md px-4 py-2.5 text-sm font-semibold transition-colors ${
                  selectedIds.includes(previewItem.id)
                    ? "border border-gray-300 bg-white text-gray-800 hover:bg-slate-50"
                    : "text-white hover:opacity-90"
                }`}
                style={
                  selectedIds.includes(previewItem.id)
                    ? undefined
                    : { backgroundColor: EQUIPMENT_NAVY }
                }
              >
                {selectedIds.includes(previewItem.id)
                  ? copy.removeItem
                  : copy.addItem}
              </button>
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}

function RequiredAsterisk() {
  return (
    <span className="ml-0.5 font-semibold text-red-600" aria-hidden="true">
      *
    </span>
  );
}

function SampleFieldLabel({
  htmlFor,
  label,
  required
}: {
  htmlFor: string;
  label: string;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="shrink-0 text-sm font-semibold text-gray-800 md:w-28"
    >
      {label}
      {required ? <RequiredAsterisk /> : null}
    </label>
  );
}

function SampleStep({
  copy,
  control,
  register,
  errors,
  classifications
}: {
  copy: TestCenterCopy;
  control: Control<TestRequestValues>;
  register: UseFormRegister<TestRequestValues>;
  errors: FieldErrors<TestRequestValues>;
  classifications: string[];
}) {
  const nameId = useId();
  const quantityId = useId();
  const weightId = useId();
  const widthId = useId();
  const depthId = useId();
  const heightId = useId();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "customSpecs"
  });

  const nameError = messageOf(errors.sampleName);
  const quantityError = messageOf(errors.quantity);
  const weightError = messageOf(errors.sampleWeight);
  const widthError = messageOf(errors.sampleSizeW);
  const depthError = messageOf(errors.sampleSizeD);
  const heightError = messageOf(errors.sampleSizeH);
  const sizeError = widthError || depthError || heightError;
  const customSpecsError = messageOf(errors.customSpecs);

  return (
    <div className="mt-6 space-y-4">
      <p className="text-right text-xs font-medium text-red-600">
        {copy.requiredNote}
      </p>

      <div className="rounded-lg border border-gray-200 bg-white p-4 md:p-6">
        <div className="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
          <div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <SampleFieldLabel
                htmlFor={nameId}
                label={copy.sampleName}
                required
              />
              <input
                id={nameId}
                type="text"
                autoComplete="off"
                aria-invalid={Boolean(nameError)}
                className={fieldClass(Boolean(nameError))}
                {...register("sampleName")}
              />
            </div>
            <FieldErrorText id={`${nameId}-error`} message={nameError} />
          </div>

          <div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <SampleFieldLabel
                htmlFor={quantityId}
                label={copy.quantity}
                required
              />
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <input
                  id={quantityId}
                  type="number"
                  inputMode="numeric"
                  min="1"
                  step="1"
                  autoComplete="off"
                  aria-invalid={Boolean(quantityError)}
                  className={fieldClass(Boolean(quantityError))}
                  {...register("quantity")}
                />
                <span className="shrink-0 text-sm text-gray-700">
                  {copy.quantityUnit}
                </span>
              </div>
            </div>
            <FieldErrorText
              id={`${quantityId}-error`}
              message={quantityError}
            />
          </div>

          <div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
              <span className="shrink-0 pt-2 text-sm font-semibold text-gray-800 md:w-28">
                {copy.classification}
              </span>
              <div className="min-w-0 flex-1 rounded border border-gray-200 bg-slate-50 px-3 py-2 text-sm text-gray-800">
                {classifications.length > 0 ? (
                  <ul className="space-y-1">
                    {classifications.map((line) => (
                      <li key={line} className="break-words">
                        {line}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-gray-400">{copy.empty}</span>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <SampleFieldLabel htmlFor={weightId} label={copy.sampleWeight} />
              <div className="flex min-w-0 flex-1 items-center gap-2">
                <input
                  id={weightId}
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="any"
                  autoComplete="off"
                  aria-invalid={Boolean(weightError)}
                  className={fieldClass(Boolean(weightError))}
                  {...register("sampleWeight")}
                />
                <span className="shrink-0 text-sm text-gray-700">
                  {copy.weightUnit}
                </span>
              </div>
            </div>
            <FieldErrorText id={`${weightId}-error`} message={weightError} />
          </div>

          <div className="md:col-span-2">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <span className="shrink-0 text-sm font-semibold text-gray-800 md:w-28">
                {copy.sampleSize}
              </span>
              <div className="flex min-w-0 flex-1 flex-wrap items-center gap-3">
                <label className="flex items-center gap-1.5 text-sm text-gray-700">
                  <span>{copy.sizeWidth}</span>
                  <input
                    id={widthId}
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="any"
                    autoComplete="off"
                    aria-label={`${copy.sampleSize} ${copy.sizeWidth}`}
                    aria-invalid={Boolean(widthError)}
                    className={`w-20 rounded px-2 py-2 text-gray-900 border ${
                      widthError ? "border-red-500" : "border-gray-200"
                    }`}
                    {...register("sampleSizeW")}
                  />
                  <span>{copy.sizeUnit}</span>
                </label>
                <label className="flex items-center gap-1.5 text-sm text-gray-700">
                  <span>{copy.sizeDepth}</span>
                  <input
                    id={depthId}
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="any"
                    autoComplete="off"
                    aria-label={`${copy.sampleSize} ${copy.sizeDepth}`}
                    aria-invalid={Boolean(depthError)}
                    className={`w-20 rounded px-2 py-2 text-gray-900 border ${
                      depthError ? "border-red-500" : "border-gray-200"
                    }`}
                    {...register("sampleSizeD")}
                  />
                  <span>{copy.sizeUnit}</span>
                </label>
                <label className="flex items-center gap-1.5 text-sm text-gray-700">
                  <span>{copy.sizeHeight}</span>
                  <input
                    id={heightId}
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="any"
                    autoComplete="off"
                    aria-label={`${copy.sampleSize} ${copy.sizeHeight}`}
                    aria-invalid={Boolean(heightError)}
                    className={`w-20 rounded px-2 py-2 text-gray-900 border ${
                      heightError ? "border-red-500" : "border-gray-200"
                    }`}
                    {...register("sampleSizeH")}
                  />
                  <span>{copy.sizeUnit}</span>
                </label>
              </div>
            </div>
            <FieldErrorText id={`${widthId}-error`} message={sizeError} />
          </div>
        </div>

        <p className="mt-5 text-sm text-blue-700">
          <span aria-hidden="true">● </span>
          {copy.sampleSpecsNote}
        </p>

        <div className="mt-5 border-t border-gray-100 pt-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-semibold text-gray-800">
              {copy.addSpec}
            </p>
            <button
              type="button"
              disabled={fields.length >= MAX_CUSTOM_SPECS}
              onClick={() => append({ label: "", value: "" })}
              className="rounded border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-800 hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {copy.addItem}
            </button>
          </div>
          {fields.length > 0 ? (
            <ul className="space-y-3">
              {fields.map((field, index) => {
                const rowError = messageOf(errors.customSpecs?.[index]);
                return (
                  <li
                    key={field.id}
                    className="grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)_auto]"
                  >
                    <input
                      type="text"
                      placeholder={copy.specLabel}
                      aria-label={copy.specLabel}
                      aria-invalid={Boolean(rowError)}
                      className={fieldClass(Boolean(rowError))}
                      {...register(`customSpecs.${index}.label`)}
                    />
                    <input
                      type="text"
                      placeholder={copy.specValue}
                      aria-label={copy.specValue}
                      aria-invalid={Boolean(rowError)}
                      className={fieldClass(Boolean(rowError))}
                      {...register(`customSpecs.${index}.value`)}
                    />
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="rounded border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      {copy.removeSpec}
                    </button>
                    {rowError ? (
                      <p className="text-xs text-red-600 sm:col-span-3">
                        {rowError}
                      </p>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          ) : null}
          <FieldErrorText id="custom-specs-error" message={customSpecsError} />
        </div>
      </div>
    </div>
  );
}

function ReportStep({
  copy,
  register,
  errors,
  standards,
  onAppendStandard
}: {
  copy: TestCenterCopy;
  register: UseFormRegister<TestRequestValues>;
  errors: FieldErrors<TestRequestValues>;
  standards: string;
  onAppendStandard: (chip: string) => void;
}) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
      <SelectInput
        label={copy.purpose}
        error={messageOf(errors.purpose)}
        registration={register("purpose")}
        placeholder={copy.selectPlaceholder}
        options={copy.purposes}
      />
      <SelectInput
        label={copy.reportLanguage}
        error={messageOf(errors.reportLanguage)}
        registration={register("reportLanguage")}
        placeholder={copy.selectPlaceholder}
        options={copy.reportLanguages}
      />
      <div className="md:col-span-2">
        <TextAreaInput
          label={copy.standards}
          optional={copy.optional}
          error={messageOf(errors.standards)}
          registration={register("standards")}
        />
        <p className="mt-2 text-xs text-gray-500">{copy.standardsHint}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {STANDARD_CHIPS.map((chip) => {
            const included = standards
              .toLowerCase()
              .includes(chip.toLowerCase());
            return (
              <button
                key={chip}
                type="button"
                onClick={() => onAppendStandard(chip)}
                className={`rounded-full border px-3 py-1 text-sm ${
                  included
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-blue-200 bg-blue-50 text-blue-800 hover:bg-blue-100"
                }`}
              >
                {chip}
              </button>
            );
          })}
        </div>
      </div>
      <TextInput
        label={copy.desiredCompletionDate}
        error={messageOf(errors.desiredCompletionDate)}
        registration={register("desiredCompletionDate")}
        type="date"
        min={todayInputValue()}
        autoComplete="off"
      />
      <TextInput
        label={copy.reportEmail}
        error={messageOf(errors.reportEmail)}
        registration={register("reportEmail")}
        type="email"
        inputMode="email"
        autoComplete="email"
      />
      <div className="md:col-span-2">
        <TextAreaInput
          label={copy.additionalRequest}
          optional={copy.optional}
          error={messageOf(errors.additionalRequest)}
          registration={register("additionalRequest")}
        />
      </div>
    </div>
  );
}

function ClientStep({
  copy,
  register,
  errors
}: {
  copy: TestCenterCopy;
  register: UseFormRegister<TestRequestValues>;
  errors: FieldErrors<TestRequestValues>;
}) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
      <TextInput
        label={copy.companyName}
        error={messageOf(errors.companyName)}
        registration={register("companyName")}
        autoComplete="organization"
      />
      <TextInput
        label={copy.businessRegistrationNumber}
        error={messageOf(errors.businessRegistrationNumber)}
        registration={register("businessRegistrationNumber")}
        autoComplete="off"
        hint={copy.businessNumberHint}
      />
      <TextInput
        label={copy.contactName}
        error={messageOf(errors.contactName)}
        registration={register("contactName")}
        autoComplete="name"
      />
      <TextInput
        label={copy.department}
        error={messageOf(errors.department)}
        registration={register("department")}
        autoComplete="organization-title"
      />
      <TextInput
        label={copy.phone}
        error={messageOf(errors.phone)}
        registration={register("phone")}
        type="tel"
        inputMode="tel"
        autoComplete="tel"
      />
      <TextInput
        label={copy.email}
        error={messageOf(errors.email)}
        registration={register("email")}
        type="email"
        inputMode="email"
        autoComplete="email"
      />
      <div className="md:col-span-2">
        <TextInput
          label={copy.address}
          error={messageOf(errors.address)}
          registration={register("address")}
          autoComplete="street-address"
        />
      </div>
    </div>
  );
}

function ReviewStep({
  copy,
  items,
  categories,
  values,
  register,
  errors,
  onEdit
}: {
  copy: TestCenterCopy;
  items: TestEquipmentItem[];
  categories: TestEquipmentCategory[];
  values: TestRequestValues;
  register: UseFormRegister<TestRequestValues>;
  errors: FieldErrors<TestRequestValues>;
  onEdit: (step: number) => void;
}) {
  const selected = items.filter((item) =>
    values.equipmentIds.includes(item.id)
  );
  return (
    <div className="mt-6 space-y-4">
      <ReviewSection
        title={copy.steps[0].title}
        editLabel={copy.edit}
        onEdit={() => onEdit(0)}
      >
        <p className="mb-3 text-sm font-semibold text-blue-700">
          {copy.selectedCount(values.equipmentIds.length)}
        </p>
        <div className="space-y-4">
          {categories.map((category) => {
            const categoryItems = selected.filter(
              (item) => item.categoryId === category.id
            );
            if (categoryItems.length === 0) return null;
            return (
              <div key={category.id}>
                <h4 className="text-sm font-bold text-gray-800">
                  {category.label}
                </h4>
                <ul className="mt-1 list-disc pl-5 text-sm text-gray-900">
                  {categoryItems.map((item) => (
                    <li key={item.id} className="break-words">
                      {item.name}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </ReviewSection>

      <ReviewSection
        title={copy.steps[1].title}
        editLabel={copy.edit}
        onEdit={() => onEdit(1)}
      >
        <SummaryRows
          rows={[
            {
              label: copy.sampleName,
              value: displayValue(values.sampleName, copy.empty)
            },
            {
              label: copy.quantity,
              value: values.quantity.trim()
                ? `${values.quantity.trim()} ${copy.quantityUnit}`
                : copy.empty
            },
            {
              label: copy.classification,
              value:
                classificationLines(
                  items,
                  categories,
                  values.equipmentIds
                ).join("\n") || copy.empty
            },
            ...buildSampleSpecs(values, {
              weight: copy.sampleWeight,
              size: copy.sampleSize
            }).map((spec, index) => ({
              key: `spec-${index}-${spec.label}`,
              label: spec.label,
              value: spec.value
            }))
          ]}
        />
      </ReviewSection>

      <ReviewSection
        title={copy.steps[2].title}
        editLabel={copy.edit}
        onEdit={() => onEdit(2)}
      >
        <SummaryRows
          rows={[
            {
              label: copy.purpose,
              value: optionLabel(copy.purposes, values.purpose, copy.empty)
            },
            {
              label: copy.reportLanguage,
              value: optionLabel(
                copy.reportLanguages,
                values.reportLanguage,
                copy.empty
              )
            },
            {
              label: copy.standards,
              value: displayValue(values.standards, copy.empty)
            },
            {
              label: copy.desiredCompletionDate,
              value: displayValue(values.desiredCompletionDate, copy.empty)
            },
            {
              label: copy.reportEmail,
              value: displayValue(values.reportEmail, copy.empty)
            },
            {
              label: copy.additionalRequest,
              value: displayValue(values.additionalRequest, copy.empty)
            }
          ]}
        />
      </ReviewSection>

      <ReviewSection
        title={copy.steps[3].title}
        editLabel={copy.edit}
        onEdit={() => onEdit(3)}
      >
        <SummaryRows
          rows={[
            {
              label: copy.companyName,
              value: displayValue(values.companyName, copy.empty)
            },
            {
              label: copy.businessRegistrationNumber,
              value: displayValue(values.businessRegistrationNumber, copy.empty)
            },
            {
              label: copy.contactName,
              value: displayValue(values.contactName, copy.empty)
            },
            {
              label: copy.department,
              value: displayValue(values.department, copy.empty)
            },
            {
              label: copy.phone,
              value: displayValue(values.phone, copy.empty)
            },
            {
              label: copy.email,
              value: displayValue(values.email, copy.empty)
            },
            {
              label: copy.address,
              value: displayValue(values.address, copy.empty)
            }
          ]}
        />
      </ReviewSection>

      <ConsentBox
        label={copy.consentPrivacy}
        error={messageOf(errors.privacyConsent)}
        registration={register("privacyConsent")}
      />
      <ConsentBox
        label={copy.consentDamage}
        error={messageOf(errors.damageConsent)}
        registration={register("damageConsent")}
      />
    </div>
  );
}

function ReviewSection({
  title,
  editLabel,
  onEdit,
  children
}: {
  title: string;
  editLabel: string;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border border-gray-200 p-4 md:p-5">
      <div className="mb-4 flex items-start justify-between gap-3">
        <h3 className="text-base font-bold text-gray-900">{title}</h3>
        <button
          type="button"
          onClick={onEdit}
          className="shrink-0 text-sm font-semibold text-blue-700 underline hover:text-blue-800"
        >
          {editLabel}
        </button>
      </div>
      {children}
    </section>
  );
}

function ConsentBox({
  label,
  error,
  registration
}: {
  label: string;
  error?: string;
  registration: ReturnType<UseFormRegister<TestRequestValues>>;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div className="rounded-lg border border-gray-200 p-4">
      <label
        htmlFor={id}
        className="flex items-start gap-3 text-sm leading-relaxed text-gray-800"
      >
        <input
          id={id}
          type="checkbox"
          className="mt-1 h-4 w-4 shrink-0 accent-blue-600"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          {...registration}
        />
        <span>{label}</span>
      </label>
      <FieldErrorText id={errorId} message={error} />
    </div>
  );
}
