import React, { useCallback, useEffect, useMemo, useState } from "react";

export type InquiryItem = {
  id: number;
  name: string;
  contactMasked: string;
  emailMasked: string;
  affiliationPreview?: string;
  department?: string;
  messagePreview: string;
  createdAt: string;
};

export type InquiryListResponse = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  items: InquiryItem[];
};

type Labels = {
  name: string;
  contact: string;
  email: string;
  affiliation: string;
  department: string;
  message: string;
  created: string;
  loading: string;
  page: string;
  prev: string;
  next: string;
  noInquiries: string;
  fetchError: string;
  adminOnlyTitle: string;
  adminOnlyDescription: string;
  adminPasswordPlaceholder: string;
  unlock: string;
  lock: string;
  passwordRequired: string;
  incorrectPassword: string;
};

export type InquiryTableProps = {
  labels: Labels;
  inquiries: InquiryListResponse | null;
  inquiriesLoading: boolean;
  inquiriesError: string | null;
  inquiriesPage: number;
  perPage: number;
  canGoPrev: boolean;
  canGoNext: boolean;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
};

const ADMIN_UNLOCKED_KEY = "suman_inquiries_admin_unlocked";
const ADMIN_PASSWORD =
  process.env.NEXT_PUBLIC_INQUIRIES_ADMIN_PASSWORD ?? "SUMAN_ADMIN_2026";

export default function InquiryTable(props: InquiryTableProps) {
  const {
    labels,
    inquiries,
    inquiriesLoading,
    inquiriesError,
    inquiriesPage,
    perPage,
    canGoPrev,
    canGoNext,
    totalPages,
    onPrev,
    onNext
  } = props;

  const [unlocked, setUnlocked] = useState(false);
  const [pw, setPw] = useState("");
  const [unlockError, setUnlockError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setUnlocked(window.sessionStorage.getItem(ADMIN_UNLOCKED_KEY) === "1");
    } catch {
      setUnlocked(false);
    }
  }, []);

  const hasInquiries = Boolean(inquiries?.items?.length);
  const pageDisplay = inquiries?.page ?? inquiriesPage;
  const totalPagesDisplay = inquiries?.total_pages ?? 1;

  const maskedError = useMemo(() => {
    // Avoid leaking backend state when locked.
    return unlocked ? inquiriesError : null;
  }, [unlocked, inquiriesError]);

  const onUnlock = useCallback(() => {
    const candidate = pw.trim();
    if (!candidate) {
      setUnlockError(labels.passwordRequired);
      return;
    }
    if (candidate !== ADMIN_PASSWORD) {
      setUnlockError(labels.incorrectPassword);
      return;
    }

    setUnlockError(null);
    setUnlocked(true);
    setPw("");
    try {
      window.sessionStorage.setItem(ADMIN_UNLOCKED_KEY, "1");
    } catch {
      // ignore storage failures (private mode / locked storage)
    }
  }, [pw, labels.passwordRequired, labels.incorrectPassword]);

  const onLock = useCallback(() => {
    setUnlocked(false);
    setUnlockError(null);
    setPw("");
    try {
      window.sessionStorage.removeItem(ADMIN_UNLOCKED_KEY);
    } catch {
      // ignore
    }
  }, []);

  if (!unlocked) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
        <div className="flex items-start justify-between gap-4 flex-col sm:flex-row">
          <div>
            <p className="text-sm font-semibold text-gray-900">
              {labels.adminOnlyTitle}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {labels.adminOnlyDescription}
            </p>
          </div>

          <div className="w-full sm:w-auto flex items-stretch gap-2">
            <input
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onUnlock();
              }}
              type="password"
              placeholder={labels.adminPasswordPlaceholder}
              className="w-full sm:w-64 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={onUnlock}
              className="px-4 py-2 rounded-md bg-gray-900 text-white text-sm font-medium hover:bg-gray-800"
            >
              {labels.unlock}
            </button>
          </div>
        </div>

        {unlockError && (
          <div className="mt-3 text-sm text-red-700">{unlockError}</div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-end mb-3">
        <button
          type="button"
          onClick={onLock}
          className="text-sm px-3 py-1.5 rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
        >
          {labels.lock}
        </button>
      </div>

      {maskedError && (
        <div className="mb-4 p-4 bg-red-50 border border-red-100 text-red-900 rounded">
          {maskedError || labels.fetchError}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm border border-gray-200 rounded-lg bg-white">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="px-4 py-3 font-semibold whitespace-nowrap">#</th>
              <th className="px-4 py-3 font-semibold whitespace-nowrap">
                {labels.name}
              </th>
              <th className="px-4 py-3 font-semibold whitespace-nowrap">
                {labels.contact}
              </th>
              <th className="px-4 py-3 font-semibold whitespace-nowrap">
                {labels.email}
              </th>
              <th className="px-4 py-3 font-semibold whitespace-nowrap">
                {labels.affiliation}
              </th>
              <th className="px-4 py-3 font-semibold whitespace-nowrap">
                {labels.department}
              </th>
              <th className="px-4 py-3 font-semibold">{labels.message}</th>
              <th className="px-4 py-3 font-semibold whitespace-nowrap">
                {labels.created}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {inquiriesLoading && (
              <tr>
                <td colSpan={8} className="px-4 py-6 text-gray-500">
                  {labels.loading}
                </td>
              </tr>
            )}

            {!inquiriesLoading &&
              hasInquiries &&
              inquiries!.items.map((item, idx) => (
                <tr key={item.id} className="hover:bg-gray-50/50">
                  <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                    {(inquiriesPage - 1) * perPage + idx + 1}
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
                    {item.department?.trim() ? item.department : "-"}
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
                  {labels.noInquiries}
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
          onClick={onPrev}
          className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {labels.prev}
        </button>

        <div className="text-sm text-gray-600 whitespace-nowrap">
          {labels.page}{" "}
          <span className="font-semibold text-gray-900">{pageDisplay}</span> /{" "}
          <span className="font-semibold text-gray-900">
            {totalPagesDisplay}
          </span>
        </div>

        <button
          type="button"
          disabled={inquiriesLoading || !canGoNext}
          onClick={onNext}
          className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {labels.next}
        </button>
      </div>
    </div>
  );
}
