import { Shield, ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";
import LogoutButton from "./LogoutButton";

// 관리자 페이지 전용 헤더
export default function AdminHeader() {
  const router = useRouter();
  return (
    <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push("/admin/dashboard")}
              className="cursor-pointer p-2 hover:bg-white/10 rounded-lg transition-colors duration-200 group"
            >
              <ArrowLeft className="h-6 w-6 text-gray-300 group-hover:text-white" />
            </button>
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">관리자 대시보드</h1>
              <p className="text-blue-200 mt-1">시스템 통합 관리 센터</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-300">환영합니다, 관리자님</p>
              <LogoutButton />
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">관</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
