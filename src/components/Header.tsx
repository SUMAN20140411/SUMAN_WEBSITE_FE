"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLangStore } from "@/stores/langStore";

const navItemsKor = [
  {
    label: "회사소개",
    href: "/company/ceo",
    submenu: [
      { label: "CEO 인사말", href: "/company/ceo" },
      { label: "기업 비전", href: "/company/vision2" },
      { label: "연혁", href: "/company/history" },
      { label: "조직도", href: "/company/org" },
      { label: "CI", href: "/company/ci" },
      { label: "오시는 길", href: "/company/location" },
      { label: "인증 현황", href: "/company/certifications" },
    ],
  },
  {
    label: "사업분야",
    href: "/business/service",
    submenu: [
      { label: "기술 소개", href: "/business/service" },
      { label: "제품 소개", href: "/business/product" },
      { label: "연구 분야", href: "/business/rnd" },
    ],
  },
  {
    label: "인재채용",
    href: "/careers/philosophy",
    submenu: [
      { label: "인재상", href: "/careers/philosophy" },
      { label: "채용공고", href: "/careers/notice" },
      { label: "복리후생", href: "/careers/wellnessMain" },
    ],
  },
  {
    label: "고객지원",
    href: "/support/contact",
    submenu: [{ label: "문의하기", href: "/support/contact" }],
  },
];

const navItemsEng = [
  {
    label: "Company",
    href: "/eng/company/ceo",
    submenu: [
      { label: "CEO Message", href: "/eng/company/ceo" },
      { label: "Vision", href: "/eng/company/vision2" },
      { label: "History", href: "/eng/company/history" },
      { label: "Organization", href: "/eng/company/org" },
      { label: "CI", href: "/eng/company/ci" },
      { label: "Location", href: "/eng/company/location" },
      { label: "Certifications", href: "/eng/company/certifications" },
    ],
  },
  {
    label: "Business",
    href: "/eng/business/service",
    submenu: [
      { label: "Technology", href: "/eng/business/service" },
      { label: "Product", href: "/eng/business/product" },
      { label: "Research field", href: "/eng/business/rnd" },
    ],
  },
  {
    label: "Recruitment",
    href: "/eng/careers/philosophy",
    submenu: [
      { label: "Ideal Candidate", href: "/eng/careers/philosophy" },
      { label: "Recruit Notice", href: "/eng/careers/notice" },
      { label: "Employee Benefits", href: "/eng/careers/wellnessMain" },
    ],
  },
  {
    label: "Support",
    href: "/eng/support/contact",
    submenu: [{ label: "Contact Us", href: "/eng/support/contact" }],
  },
];

export default function Header() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileIndex, setExpandedMobileIndex] = useState<number | null>(null);
  const { lang } = useLangStore();
  const NAV_ITEMS = lang === "KOR" ? navItemsKor : navItemsEng;

  // UPDATED: dynamic logo href based on language
  const logoHref = lang === "KOR" ? "/" : "/eng";

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setExpandedMobileIndex(null);
  };

  return (
    <AnimatePresence>
      <motion.header
        role="navigation"
        aria-label="Main Navigation"
        className="fixed top-0 left-0 w-full z-50 bg-white transition-shadow duration-300 shadow-md"
      >
        {/* Main Nav Container (same spacing, height) */}
        <div
          className="w-full mx-auto max-w-screen-2xl px-4 lg:px-20 flex justify-between items-center text-sm lg:text-base font-medium text-black"
          style={{ height: "90px" }}
        >
          {/* Logo (same ml-10) */}
          <Link href={logoHref} className="flex items-center h-full mr-auto lg:mr-0 ml-10">
            <Image
              src="/images/logo_suman.png"
              alt="SUMAN CO., Ltd company logo"
              width={100}
              height={100}
              priority
              className="h-8 sm:h-10 lg:h-12 w-auto cursor-pointer"
            />
          </Link>

          {/* Desktop Navigation — centered (same gaps) */}
          <div className="hidden lg:flex flex-grow justify-center items-center h-full">
            <nav className="flex items-center gap-12 xl:gap-20 h-full">
              {NAV_ITEMS.map((item, index) => (
                <div
                  key={item.label}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="relative h-full flex items-center group cursor-pointer"
                >
                  <Link
                    href={item.href}
                    className="lg:text-lg font-bold hover:text-blue-600 transition-colors duration-200"
                  >
                    {item.label}
                  </Link>

                  <AnimatePresence>
                    {hoveredIndex === index && item.submenu.length > 0 && (
                      <motion.div
                        className="absolute top-[90px] left-1/2 -translate-x-1/2 w-max bg-white text-black py-4 px-6 border-t border-gray-200 shadow-lg flex flex-col space-y-2"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            className="font-normal text-gray-700 hover:text-blue-600 transition-colors duration-200 whitespace-nowrap"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>
          </div>

          {/* Mobile: Language switcher + burger (same placement) */}
          <div className="flex items-center gap-4 lg:hidden">
            <LanguageSwitcher />
            <button
              className="text-2xl text-black"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile menu"
            >
              ☰
            </button>
          </div>

          {/* Desktop Language Switcher (same placement) */}
          <div className="hidden lg:flex items-center h-full">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Mobile Menu — same animation & width */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden fixed top-0 right-0 w-[80%] max-w-sm h-screen bg-white text-black px-6 py-6 space-y-4 shadow-lg z-50 overflow-y-auto"
            >
              <div className="flex justify-end items-center mb-6">
                <button
                  onClick={closeMobileMenu}
                  className="text-xl"
                  aria-label="Close mobile menu"
                >
                  ✕
                </button>
              </div>

              {NAV_ITEMS.map((item, index) => (
                <div key={item.label}>
                  <div
                    className="flex justify-between items-center py-2 text-lg font-medium cursor-pointer"
                    onClick={() =>
                      setExpandedMobileIndex(expandedMobileIndex === index ? null : index)
                    }
                  >
                    <Link href={item.href} onClick={closeMobileMenu}>
                      {item.label}
                    </Link>
                    {item.submenu.length > 0 && (
                      <span className="text-gray-500 transition-transform duration-200 transform">
                        {expandedMobileIndex === index ? "−" : "+"}
                      </span>
                    )}
                  </div>

                  <AnimatePresence>
                    {expandedMobileIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="pl-4 overflow-hidden"
                      >
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.label}
                            href={sub.href}
                            className="block py-1 text-sm text-gray-700"
                            onClick={closeMobileMenu}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </AnimatePresence>
  );
}
