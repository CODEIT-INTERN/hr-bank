import {
  Building05,
  ClockFastForward,
  Database01,
  LineChartUp02,
  Users01,
} from "@untitledui/icons";
import type { FC } from "react";
import { NavLink } from "react-router-dom";

interface NavigationItem {
  label: string;
  path: string;
  icon: FC<{ className?: string }>;
}

const NAV_ITEMS: NavigationItem[] = [
  {
    label: "대시보드",
    path: "/dashboard",
    icon: LineChartUp02,
  },
  {
    label: "부서 관리",
    path: "/departments",
    icon: Building05,
  },
  {
    label: "직원 관리",
    path: "/employees",
    icon: Users01,
  },
  {
    label: "수정 이력",
    path: "/histories",
    icon: ClockFastForward,
  },
  {
    label: "데이터 백업",
    path: "/backups",
    icon: Database01,
  },
];

export default function Navigation() {
  return (
    <aside className="flex min-w-70 flex-col border-r border-gray-200 bg-white p-4">
      {/* 브랜드 영역 */}
      <div className="mt-6 mb-8 flex items-center gap-3 px-2">
        <a href="/dashboard" aria-label="홈">
          <img src="/logo.ico" alt="HR Bank" width={40} height={40} />
        </a>
        <div className="flex flex-col">
          <span className="text-xl font-bold leading-none text-gray-900">
            HR Bank
          </span>
          <span className="text-xs leading-4 text-gray-500">
            인사관리시스템
          </span>
        </div>
      </div>

      {/* 네비게이션 섹션들 */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {NAV_ITEMS.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === "/dashboard"}
                className={({ isActive }) =>
                  [
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-base transition",
                    isActive
                      ? "bg-brand-100 text-primary font-semibold"
                      : "text-quaternary hover:bg-gray-50 font-normal",
                  ].join(" ")
                }
              >
                <item.icon className="size-5" aria-hidden="true" />
                <span className="truncate">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
