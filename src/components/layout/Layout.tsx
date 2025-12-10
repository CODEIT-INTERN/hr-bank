import { Outlet, useLocation } from "react-router-dom";
import Navigation from "@/components/layout/Navigation";
import Header from "../common/Header";
import { cx } from "@/utils/cx";

export default function Layout() {
  const { pathname } = useLocation();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <div className="flex h-screen bg-white overflow-y-auto">
      {/* 사이드바 */}
      <Navigation />

      {/* 메인 컨텐츠 영역 */}
      <main
        className={cx("flex-1 flex flex-col pt-[100px] pb-[50px] px-[60px] gap-7 min-w-0", isDashboard && "bg-gray-50")}
      >
        <Header />
        <div className="flex flex-1 flex-col gap-4 min-h-0 min-w-0 h-full ">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
