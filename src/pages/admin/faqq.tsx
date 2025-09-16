import React, { useState, useEffect } from 'react';
import { Plus, Save, X, Edit, Trash2, Eye, EyeOff, ChevronDown, HelpCircle } from 'lucide-react';
import { fetchFAQs, createFAQ, updateFAQ, deleteFAQ } from '@/lib/api/faq';
import AdminHeader from '@/components/AdminHeader';
import { withAdminAuth } from '@/components/WithAdminAuth';

// FAQ 인터페이스 정의
interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
  is_published: boolean;
}

interface CreateFAQData {
  question: string;
  answer: string;
  category: string;
  is_published: boolean;
}

interface UpdateFAQData {
  question: string;
  answer: string;
  category: string;
  is_published: boolean;
}

const AdminFAQPage = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [displayCount, setDisplayCount] = useState(10);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [editCategoryDropdownOpen, setEditCategoryDropdownOpen] = useState(false);
  const categoryOptions = ['회사', '제품', '기술', '채용', '기타'];

  // 새 FAQ 폼 데이터
  const [newFAQ, setNewFAQ] = useState<CreateFAQData>({
    question: '',
    answer: '',
    category: '',
    is_published: true
  });

  // 수정 폼 데이터
  const [editFAQ, setEditFAQ] = useState<UpdateFAQData>({
    question: '',
    answer: '',
    category: '',
    is_published: true
  });

  // ---------------------------------
  //         FAQ 불러오기 (loadFAQs)
  // ---------------------------------
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

  // ------------------------------------
  //          FAQ 신규 등록, 수정
  // ------------------------------------
  const handleCreate = async () => {
    if (!newFAQ.question.trim() || !newFAQ.answer.trim() || !newFAQ.category) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    try {
      setActionLoading(-1);
      const createdFAQ = await createFAQ(newFAQ);
      setFaqs([createdFAQ, ...faqs]);
      setNewFAQ({ question: '', answer: '', category: '', is_published: true });
      setIsCreating(false);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'FAQ 등록에 실패했습니다.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleEdit = (faq: FAQ) => {
    setEditingId(faq.id);
    setEditFAQ({
      question: faq.question,
      answer: faq.answer,
      category: faq.category,
      is_published: faq.is_published
    });
  };

  const handleUpdate = async () => {
    if (!editFAQ.question.trim() || !editFAQ.answer.trim() || !editFAQ.category) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    try {
      setActionLoading(editingId!);
      const updatedFAQ = await updateFAQ(editingId!, editFAQ);
      setFaqs(faqs.map(faq => faq.id === editingId ? updatedFAQ : faq));
      alert('수정이 완료되었습니다.')
      setEditingId(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'FAQ 수정에 실패했습니다.');
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('정말로 이 FAQ를 삭제하시겠습니까?')) return;

    try {
      setActionLoading(id);
      console.log('삭제ID: ',id)
      await deleteFAQ(id);
      setFaqs(faqs.filter(faq => faq.id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : 'FAQ 삭제에 실패했습니다.');
    } finally {
      setActionLoading(null);
    }
  };

  const displayedFaqs = faqs.slice(0, displayCount);
  const hasMore = displayCount < faqs.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">FAQ를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <AdminHeader />
      
      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">FAQ 관리</h1>
            <p className="text-slate-300 mt-2">자주 묻는 질문을 관리할 수 있습니다.</p>
          </div>
          <button
            onClick={() => setIsCreating(true)}
            className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Plus className="h-5 w-5 mr-2" />
            새 FAQ 등록
          </button>
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl backdrop-blur-sm">
            <p className="text-red-300">{error}</p>
            <button 
              onClick={loadFAQs}
              className="mt-2 text-sm text-red-400 hover:text-red-300 transition-colors"
            >
              다시 시도
            </button>
          </div>
        )}

        {/* 새 FAQ 등록 폼 */}
        {isCreating && (
          <div className="mb-6 p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-2xl">
            <h3 className="text-xl font-semibold mb-6 text-white flex items-center">
              <HelpCircle className="h-6 w-6 mr-3 text-blue-400" />
              새 FAQ 등록
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">카테고리</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setCategoryDropdownOpen(prev => !prev)}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-left text-white"
                  >
                    {newFAQ.category ? (newFAQ.category) : '카테고리를 선택하세요'}
                  </button>
                  {categoryDropdownOpen && (
                    <ul className="absolute z-10 w-full mt-2 bg-slate-800 border border-white/20 rounded-lg shadow-lg">
                      {categoryOptions.map((label, idx) => (
                        <li
                          key={label}
                          onClick={() => {
                            setNewFAQ({ ...newFAQ, category: label });
                            setCategoryDropdownOpen(false);
                          }}
                          className="px-4 py-2 hover:bg-slate-700 text-white cursor-pointer"
                        >
                          {label}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">질문</label>
                <input
                  type="text"
                  value={newFAQ.question}
                  onChange={(e) => setNewFAQ({...newFAQ, question: e.target.value})}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400 backdrop-blur-sm"
                  placeholder="질문을 입력하세요"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">답변</label>
                <textarea
                  value={newFAQ.answer}
                  onChange={(e) => setNewFAQ({...newFAQ, answer: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400 backdrop-blur-sm resize-none"
                  placeholder="답변을 입력하세요"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="new-published"
                  checked={newFAQ.is_published}
                  onChange={(e) => setNewFAQ({...newFAQ, is_published: e.target.checked})}
                  className="h-5 w-5 text-blue-500 focus:ring-blue-500 border-white/30 rounded bg-white/10"
                />
                <label htmlFor="new-published" className="ml-3 text-sm text-slate-300">
                  게시
                </label>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={handleCreate}
                  disabled={actionLoading === -1}
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {actionLoading === -1 ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Save className="h-5 w-5 mr-2" />
                  )}
                  등록
                </button>
                <button
                  onClick={() => {
                    setIsCreating(false);
                    setNewFAQ({ question: '', answer: '', category: '', is_published: true });
                  }}
                  className="flex items-center px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-all duration-200 shadow-lg"
                >
                  <X className="h-5 w-5 mr-2" />
                  취소
                </button>
              </div>
            </div>
          </div>
        )}

        {/* FAQ 목록 */}
        <div className="space-y-4">
          {displayedFaqs.map((faq) => (
            <div key={faq.id} className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 hover:bg-white/10">
              {editingId === faq.id ? (
                // 수정 모드
                <div className="p-6">
                  <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">카테고리</label>
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => setEditCategoryDropdownOpen(prev => !prev)}
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-left text-white"
                          >
                            {editFAQ.category || '카테고리를 선택하세요'}
                          </button>
                          {editCategoryDropdownOpen && (
                            <ul className="absolute z-10 w-full mt-2 bg-slate-800 border border-white/20 rounded-lg shadow-lg">
                              {categoryOptions.map((label) => (
                                <li
                                  key={label}
                                  onClick={() => {
                                    setEditFAQ({ ...editFAQ, category: label });
                                    setEditCategoryDropdownOpen(false);
                                  }}
                                  className="px-4 py-2 hover:bg-slate-700 text-white cursor-pointer"
                                >
                                  {label}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">질문</label>
                      <input
                        type="text"
                        value={editFAQ.question}
                        onChange={(e) => setEditFAQ({...editFAQ, question: e.target.value})}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400 backdrop-blur-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">답변</label>
                      <textarea
                        value={editFAQ.answer}
                        onChange={(e) => setEditFAQ({...editFAQ, answer: e.target.value})}
                        rows={4}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400 backdrop-blur-sm resize-none"
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`edit-published-${faq.id}`}
                        checked={editFAQ.is_published}
                        onChange={(e) => setEditFAQ({...editFAQ, is_published: e.target.checked})}
                        className="h-5 w-5 text-blue-500 focus:ring-blue-500 border-white/30 rounded bg-white/10"
                      />
                      <label htmlFor={`edit-published-${faq.id}`} className="ml-3 text-sm text-slate-300">
                        게시
                      </label>
                    </div>
                    <div className="flex space-x-3">
                      <button
                        onClick={handleUpdate}
                        disabled={actionLoading === faq.id}
                        className="flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                      >
                        {actionLoading === faq.id ? (
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        ) : (
                          <Save className="h-5 w-5 mr-2" />
                        )}
                        저장
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="flex items-center px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-all duration-200 shadow-lg"
                      >
                        <X className="h-5 w-5 mr-2" />
                        취소
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // 일반 모드
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-3">
                        <span className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-600/20 text-blue-300 text-sm rounded-full mr-3 border border-blue-500/30">
                          {faq.category}
                        </span>
                        <span className="flex items-center text-sm text-slate-400">
                          {faq.is_published ? (
                            <>
                              <Eye className="h-4 w-4 mr-1 text-green-400" />
                              <span className="text-green-400">게시됨</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="h-4 w-4 mr-1 text-red-400" />
                              <span className="text-red-400">비공개</span>
                            </>
                          )}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-3 leading-relaxed">{faq.question}</h3>
                      <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
                    </div>
                    <div className="flex space-x-2 ml-6">
                      <button
                        onClick={() => handleEdit(faq)}
                        className="p-3 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-all duration-200 hover:scale-105"
                        title="수정"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(faq.id)}
                        disabled={actionLoading === faq.id}
                        className="p-3 text-red-400 hover:bg-red-500/20 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105"
                        title="삭제"
                      >
                        {actionLoading === faq.id ? (
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-400"></div>
                        ) : (
                          <Trash2 className="h-5 w-5" />
                        )}
                      </button>
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
              onClick={() => setDisplayCount(prev => prev + 10)}
              className="inline-flex items-center px-8 py-4 border border-white/20 text-base font-medium rounded-xl text-slate-300 bg-white/5 hover:bg-white/10 transition-all duration-200 backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <ChevronDown className="h-5 w-5 mr-2" />
              더보기 ({displayCount} / {faqs.length})
            </button>
          </div>
        )}

        {/* FAQ가 없을 때 */}
        {faqs.length === 0 && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <HelpCircle className="h-12 w-12 text-blue-400" />
              </div>
              <p className="text-slate-400 mb-6 text-lg">등록된 FAQ가 없습니다.</p>
              <button
                onClick={() => setIsCreating(true)}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Plus className="h-5 w-5 mr-2" />
                첫 FAQ 등록하기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default withAdminAuth(AdminFAQPage);