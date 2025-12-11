import { EmployeeChart } from "@/components/dashboard/employee-trend/EmployeeChart";
import StatSection from "@/components/dashboard/stat/StatSection";

export default function Dashboard() {
  return (
    <>
      {/* 대시보드 지표 */}
      <StatSection />

      <div className="rounded-xl bg-white p-5 shadow-xs">
        {/* 직원수 변동 추이 차트 */}
        <EmployeeChart />
      </div>
    </>
  );
}
