"use client";

import Image from "next/image";
import Link from "next/link";
import PopupModal from "./PopupModal";
import { PRIVACY_POLICY_TEXT, EMAIL_REFUSAL_TEXT } from "@/data/policy";
import { useState } from "react";
import { useLangStore } from "@/stores/langStore";

export default function Footer() {
  const [popupType, setPopupType] = useState<"privacy" | "email" | null>(null);
  const { lang } = useLangStore();

  const getPopupContent = () => {
    if (popupType === "privacy") {
      return {
        title: lang === "KOR" ? "개인정보 처리방침" : "Privacy Policy",
        content: PRIVACY_POLICY_TEXT[lang],
      };
    }
    if (popupType === "email") {
      return {
        title: lang === "KOR" ? "이메일 수집거부" : "Email Collection Refusal",
        content: EMAIL_REFUSAL_TEXT[lang],
      };
    }
    return null;
  };

  const popupContent = getPopupContent();

  return (
    <footer className="bg-white text-black text-sm border-t border-gray-100">
      {/* Container utama dengan tata letak minimalis */}
      <div className="max-w-7xl mx-auto px-6 md:px-[60px] lg:px-[0px] py-8 text-sm text-gray-600 flex flex-col gap-6 tracking-wide">
        {/* Two column layout */}

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-0">
          {/* Left: Company name and addresses */}
          <div className="space-y-2 flex flex-col justify-start">
            <span className="font-bold text-gray-800 text-base">
              {lang === "KOR" ? "㈜수만" : "SUMAN Co., Ltd."}
            </span>
            <span>
              {lang === "KOR"
                ? "| 본사: 대전광역시 대덕구 문평서로 17번길 105(문평동)"
                : "| HQ: 105, Munpyeongseo-ro 17beon-gil, Daedeok-gu, Daejeon"}
            </span>
            <span>
              {lang === "KOR"
                ? "| 천안지사: 충남 천안시 서북구 2공단 4로 40-11(성성동) G1 비즈캠퍼스 401호"
                : "| Cheonan: 40-11, 2gongdan 4-ro, Seobuk-gu, Cheonan-si, G1 Biz Campus 401"}
            </span>
            <span>
              {lang === "KOR"
                ? "| 시험센터: 대전광역시 유성구 테크노 2로 309-26(탑립동 929-1)"
                : "| Test Center: 309-26, Techno 2-ro, Yuseong-gu, Daejeon"}
            </span>
          </div>
          {/* Right: Contact info, aligned with addresses */}
          <div className="space-y-2 flex flex-col justify-start pl-0 md:pl-2" style={{ marginLeft: 0 }}>
            <span className="invisible">-</span>
            <span>
              {lang === "KOR"
                ? "| 대표전화 : 042-934-1517"
                : "| Tel: +82-42-934-1517"}
            </span>
            <span>
              {lang === "KOR"
                ? "| FAX : 042-934-1516"
                : "| Fax: +82-42-934-1516"}
            </span>
            <span>
              {lang === "KOR"
                ? "| E-Mail : suman20140411@suman.co.kr"
                : "| Email: suman20140411@suman.co.kr"}
            </span>
          </div>
        </div>

        {/* Policy links */}
        <div className="flex flex-wrap gap-4 text-gray-500 tracking-wide pt-4">
          <button
            onClick={() => setPopupType("privacy")}
            className="hover:underline cursor-pointer"
          >
            {lang === "KOR" ? "개인정보 처리방침" : "Privacy Policy"}
          </button>
          <button
            onClick={() => setPopupType("email")}
            className="hover:underline cursor-pointer"
          >
            {lang === "KOR" ? "이메일 수집거부" : "Email Collection Refusal"}
          </button>
        </div>
      </div>

      {/* Popup Modal */}
      {popupContent && (
        <PopupModal
          title={popupContent.title}
          content={popupContent.content}
          onClose={() => setPopupType(null)}
        />
      )}
    </footer>
  );
}