import { Outlet } from "react-router-dom";
import Navigation from "@/components/layout/Navigation";
import Header from "../common/Header";

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-white">
      {/* 사이드바 */}
      <Navigation />

      {/* 메인 컨텐츠 영역 */}
      <main className="flex-1 flex flex-col pt-[100px] px-[60px]">
        <Header />
        <div className="max-w-6xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
