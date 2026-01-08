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
    <footer className="bg-white text-black text-sm">
      {/* Container utama dengan tata letak minimalis */}
      <div className="max-w-7xl mx-auto px-6 py-6 text-xs text-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4 tracking-wide">
        {/* Kiri: Informasi kontak */}
        <div>
          <p> 
            {lang === "KOR"
              ? "㈜ SUMAN | 본사: 대전광역시 대덕구 문평서로 17번길 105(문평동) | 천안사업장: 충남 천안시 서북구 2공단 4로 40-11(성성동) G1 비즈캠퍼스 401호"
              : "SUMAN Co., Ltd. | HQ: 105, Munpyeongseo-ro 17beon-gil, Daedeok-gu, Daejeon | Cheonan: 40-11, 2gongdan 4-ro, Seobuk-gu, Cheonan-si "}
          </p>
          <p>
            {lang === "KOR"
              ? "| 시험센터: 대전광역시 유성구 테크노 2로 309-26(탑립동 929-1) | 대표전화 : 042-934-1517 | FAX : 042-934-1516 | E-Mail : suman20140411@suman.co.kr"
              : "| Test Center: 309-26, Techno 2-ro, Yuseong-gu, Daejeon | Tel: +82-42-934-1517 | Fax: +82-42-934-1516 | Email: suman20140411@suman.co.kr"}
          </p>
        </div>

        {/* Kanan: Tautan kebijakan */}
        <div className="flex flex-wrap gap-4 text-gray-500 tracking-wide">
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