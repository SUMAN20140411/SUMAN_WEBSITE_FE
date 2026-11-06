// 로그아웃 컴포넌트
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/router";

const LogoutButton = () => {
  const { logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout(); // 상태 및 localStorage 정리
    alert("로그아웃 되었습니다.");
    router.replace("/admin/login"); // 로그인 페이지로 이동
  };

  return (
    <button
      onClick={handleLogout}
      className="px-3 py-1.5 rounded-md bg-blue-600 text-sm text-white hover:bg-red-700 transition"
    >
      로그아웃
    </button>
  );
};

export default LogoutButton;
