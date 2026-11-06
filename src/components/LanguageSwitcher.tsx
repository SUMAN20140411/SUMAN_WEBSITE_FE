// 헤더 우측 언어변경 기능 관련 함수(여기서 언어변경이 일어나면, langStore.ts에 변경 사항 저장)

"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLangStore } from "@/stores/langStore";

const LANGUAGES = ["KOR", "ENG"];

export default function LanguageSwitcherv2() {
  const [open, setOpen] = useState(false);
  const { lang, setLang } = useLangStore();
  const pathname = usePathname();
  const router = useRouter();

  const handleSelect = (newLang: "KOR" | "ENG") => {
    if (newLang === lang) {
      setOpen(false);
      return;
    }

    setLang(newLang);
    setOpen(false);

    // 리다이렉션 처리
    const newPath =
      newLang === "KOR"
        ? pathname.replace(/^\/eng/, "") // 영어 → 한국어: /eng 제거
        : pathname.startsWith("/eng")
          ? pathname
          : `/eng${pathname}`; // 한국어 → 영어: /eng 추가

    router.push(newPath);
  };

  return (
    <div className="relative inline-block text-left">
      {/* 메인 언어변경 버튼 */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-pointer px-6 py-1 flex items-center gap-1 text-sm font-semibold tracking-wide text-gray-800 bg-white/80  hover:bg-white rounded-full transition duration-200 shadow-sm"
      >
        {lang}
        <svg
          className={`w-3 h-3 transform transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* 드롭다운 메뉴 */}
      {open && (
        <div className="absolute mt-2 w-full rounded-md bg-white shadow-lg border z-10">
          {LANGUAGES.map((item) => (
            <button
              key={item}
              onClick={() => handleSelect(item as "KOR" | "ENG")}
              className="cursor-pointer w-full text-middle px-4 py-2 hover:bg-blue-100 text-sm text-black"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
