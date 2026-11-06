"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  // 스크롤 감지해서 버튼 표시 여부 결정
  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 200); // 200px 이상 스크롤하면 표시
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // 맨 위로 부드럽게 스크롤
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    visible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 bg-[#0c1221] text-white p-3 rounded shadow-md hover:opacity-90 transition-opacity"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    )
  );
}
