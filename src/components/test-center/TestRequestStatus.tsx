import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/router";
import {
  formatReceivedDate,
  testRequestStatusCopy,
  type TestRequestStatusCopy,
} from "@/content/test-center/equipment";
import { useLangStore } from "@/stores/langStore";

const STATUS_KEYS = [
  "received",
  "in_progress",
  "completed",
  "cancelled",
] as const;

type StatusKey = (typeof STATUS_KEYS)[number];

type StatusResult = {
  receiptNo: string;
  status: string;
  receivedDate: string;
  sampleName: string;
  companyName: string;
};

function fieldClass(invalid: boolean) {
  return `w-full rounded px-3 py-2 bg-white text-gray-900 border ${
    invalid ? "border-red-500" : "border-gray-200"
  }`;
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

function textOf(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isStatusResult(value: unknown): value is StatusResult {
  if (typeof value !== "object" || value === null) return false;
  const record = value as Record<string, unknown>;
  return textOf(record.receiptNo).length > 0 && typeof record.status === "string";
}

function statusLabel(copy: TestRequestStatusCopy, status: string) {
  if ((STATUS_KEYS as readonly string[]).includes(status)) {
    return copy.statuses[status as StatusKey];
  }
  return copy.empty;
}

function localReceivedDate(value: string) {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }
  return date;
}

function displayValue(value: string, empty: string) {
  return value.trim() ? value.trim() : empty;
}

export default function TestRequestStatus() {
  const router = useRouter();
  const { lang } = useLangStore();
  const copy = lang === "ENG" ? testRequestStatusCopy.en : testRequestStatusCopy.ko;
  const dateLang = lang === "ENG" ? "en" : "ko";
  const receiptId = useId();
  const passwordId = useId();
  const errorId = useId();
  const prefilled = useRef(false);
  const [receiptNo, setReceiptNo] = useState("");
  const [password, setPassword] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<StatusResult | null>(null);

  useEffect(() => {
    if (!router.isReady || prefilled.current) return;
    const value = router.query.receiptNo;
    if (typeof value === "string" && value.trim()) {
      setReceiptNo(value);
    }
    prefilled.current = true;
  }, [router.isReady, router.query.receiptNo]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);
    setResult(null);

    const endpoint = process.env.NEXT_PUBLIC_TEST_STATUS_API_URL;
    if (!endpoint) {
      setSubmitError(copy.missingApi);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          receiptNo: receiptNo.trim(),
          password,
          locale: dateLang,
        }),
      });
      const payload = await readJson(response);
      if (response.status === 200 && isStatusResult(payload)) {
        setResult({
          receiptNo: textOf(payload.receiptNo),
          status: textOf(payload.status),
          receivedDate: textOf(payload.receivedDate),
          sampleName: textOf(payload.sampleName),
          companyName: textOf(payload.companyName),
        });
        return;
      }
      setSubmitError(serverMessage(payload) ?? copy.retry);
    } catch {
      setSubmitError(copy.retry);
    } finally {
      setIsSubmitting(false);
    }
  };

  const received = result ? localReceivedDate(result.receivedDate) : null;

  return (
    <div className="mx-auto max-w-2xl rounded-lg border border-gray-100 bg-white p-4 shadow-lg sm:p-6 md:p-8">
      <h2 className="text-xl font-bold text-gray-900 md:text-2xl">{copy.title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-gray-600">{copy.intro}</p>

      <form className="mt-8 space-y-5" noValidate onSubmit={onSubmit}>
        <div>
          <label
            htmlFor={receiptId}
            className="mb-2 block text-sm font-semibold text-gray-800"
          >
            {copy.receiptLabel}
          </label>
          <input
            id={receiptId}
            name="receiptNo"
            type="text"
            autoComplete="off"
            value={receiptNo}
            aria-invalid={Boolean(submitError)}
            aria-describedby={submitError ? errorId : undefined}
            className={fieldClass(Boolean(submitError))}
            onChange={(event) => setReceiptNo(event.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor={passwordId}
            className="mb-2 block text-sm font-semibold text-gray-800"
          >
            {copy.passwordLabel}
          </label>
          <input
            id={passwordId}
            name="password"
            type="password"
            autoComplete="off"
            value={password}
            aria-invalid={Boolean(submitError)}
            aria-describedby={submitError ? errorId : undefined}
            className={fieldClass(Boolean(submitError))}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        {submitError ? (
          <p id={errorId} className="text-sm text-red-600" role="alert">
            {submitError}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded bg-blue-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? copy.submitting : copy.submit}
        </button>
      </form>

      {result ? (
        <dl
          className="mt-8 grid gap-4 border-t border-gray-100 pt-6 sm:grid-cols-2"
          role="status"
        >
          <div>
            <dt className="text-sm font-semibold text-gray-500">{copy.receiptLabel}</dt>
            <dd className="mt-1 break-all text-lg font-bold text-blue-700">
              {result.receiptNo}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-gray-500">{copy.statusLabel}</dt>
            <dd className="mt-1 text-lg font-bold text-gray-900">
              {statusLabel(copy, result.status)}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-gray-500">{copy.receivedDate}</dt>
            <dd className="mt-1 text-base text-gray-900">
              {received
                ? formatReceivedDate(received, dateLang)
                : displayValue(result.receivedDate, copy.empty)}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-gray-500">{copy.sampleName}</dt>
            <dd className="mt-1 text-base text-gray-900">
              {displayValue(result.sampleName, copy.empty)}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-semibold text-gray-500">{copy.companyName}</dt>
            <dd className="mt-1 text-base text-gray-900">
              {displayValue(result.companyName, copy.empty)}
            </dd>
          </div>
        </dl>
      ) : null}
    </div>
  );
}
