import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { fetchFAQs } from '@/lib/api/faq';
import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection"; 
import BreadcrumbSection from "@/components/BreadcrumbSection"; 
import { motion, type Transition } from "framer-motion"; 
import Head from "next/head";
import { useLangStore } from '@/stores/langStore';

// FAQ 인터페이스 정의
interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
  is_published: boolean;
}

const FAQPage = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());
  const [displayCount, setDisplayCount] = useState(5);
  const { lang } = useLangStore();
  
  // 백엔드 서버 슬립 깨우기 요청
  useEffect(() => {
  fetch("https://suman-project-31hc.onrender.com/api/")
    .then(() => console.log("Render 서버 깨우기 완료"))
    .catch(() => console.warn("Render 서버 깨우기 실패"));
  }, []);

  // FAQ 가져오기
  useEffect(() => {   
    loadFAQs();
  }, []);

  const loadFAQs = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchFAQs();
        setFaqs(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'FAQ를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

  const toggleItem = (id: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const showMore = () => {
    setDisplayCount(prev => prev + 5); // 더보기를 누르면 5개씩 추가됨. (초기값 5개)
  };

  const displayedFaqs = faqs.slice(0, displayCount);
  const hasMore = displayCount < faqs.length;

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" } as Transition,
    },
  };

  if (loading) {
    return (
      <Layout> {/* Layout으로 감싸기 */}
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">FAQ를 불러오는 중...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout> {/* Layout으로 감싸기 */}
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              다시 시도
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Head>
        <title>FAQ | 수만</title> {/* 페이지 타이틀 설정 */}
      </Head>
      <Layout>
        <HeroSection
          title="자주 묻는 질문"
          subtitle="Frequently Asked Questions"
          backgroundImage="/images/sub_banner/support_banner.png" // 적절한 배경 이미지 경로로 변경
        />

        <BreadcrumbSection path="고객지원 > FAQ" />

        <div className="content-wrapper py-20 px-4 md:px-8 bg-white flex justify-center items-center">
          <div className="max-w-4xl mx-auto w-full"> {/* max-w-4xl 유지 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInVariants}
            >
              {/* 헤더 */}
              <div className="text-center mb-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {lang === "KOR" ? "SUMAN에 관한" : "Check All About"}
                </h1>
                <h2 className="text-2xl font-semibold text-gray-800">
                  {lang === "KOR" ? " 궁금하신 사항을 확인하세요" : "Suman Here"}
                </h2>
              </div>

              {/* FAQ 목록 */}
              <div className="space-y-4">
                {displayedFaqs.map((faq) => (
                  <div key={faq.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
                    {/* 카테고리 */}
                    <div className="px-6 py-2 bg-gray-50 border-b border-gray-200">
                      <span className="text-sm font-medium text-gray-600">{faq.category}</span>
                    </div>

                    {/* 질문 */}
                    <div
                      className="px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                      onClick={() => toggleItem(faq.id)}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 pr-4">
                          {faq.question}
                        </h3>
                        {openItems.has(faq.id) ? (
                          <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        )}
                      </div>
                    </div>

                    {/* 답변 */}
                    {openItems.has(faq.id) && (
                      <div className="px-6 py-4 border-t border-gray-200 bg-blue-50">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4">
                            <span className="text-white font-bold text-sm">A</span>
                          </div>
                          <div className="text-gray-700 leading-relaxed">
                            {faq.answer}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* 더보기 버튼 */}
              {hasMore && (
                <div className="text-center mt-8">
                  <button
                    onClick={showMore}
                    className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    더보기 ({displayCount} / {faqs.length})
                  </button>
                </div>
              )}

              {/* FAQ가 없을 때 */}
              {faqs.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">등록된 FAQ가 없습니다.</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
        <hr className="my-8 border-gray-200 w-full" />
      </Layout>
    </>
  );
};

export default FAQPage;