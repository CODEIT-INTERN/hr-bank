import { Outlet } from "react-router-dom";
import Navigation from "@/components/layout/Navigation";

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 사이드바 */}
      <Navigation />

      {/* 메인 컨텐츠 영역 */}
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-15 py-25">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
