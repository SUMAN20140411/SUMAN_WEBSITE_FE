// src/components/BreadcrumbSection.tsx
import React from "react";

interface BreadcrumbSectionProps {
  path: string; // 예: "회사소개 > CI"
}

export default function BreadcrumbSection({ path }: BreadcrumbSectionProps) {
  return (
    <section className="breadcrumb-section bg-gray-700 py-4 text-white">
      {/* max-w-7xl mx-auto가 적용된 div에 헤더와 동일한 패딩 적용 */}
      <div className="max-w-7xl mx-auto px-6 md:px-[60px] lg:px-[0px]">
        <p className="lg:text-lg 2xl:text-xl text-md">{path}</p>
      </div>
    </section>
  );
}
