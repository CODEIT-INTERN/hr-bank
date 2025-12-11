import { useEffect } from "react";
import {
  ClockFastForward,
  Database01,
  FaceSmile,
  Users01,
} from "@untitledui/icons";
import { StatCard } from "@/components/dashboard/stat/StatCard";
import { useBackupListStore } from "@/store/backupStore";
import { useEmployeeCountStore } from "@/store/employeeCountStore";
import { hoursAgoFromNow } from "@/utils/date";

export default function StatSection() {
  const { count, monthCount, getCount, getThisMonthCount } =
    useEmployeeCountStore();
  const { latestBackup, getLatestBackup } = useBackupListStore();

  useEffect(() => {
    const fetchAll = async () => {
      try {
        await Promise.all([getCount(), getThisMonthCount(), getLatestBackup()]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAll();
  }, [getCount, getThisMonthCount, getLatestBackup]);

  const backupHoursAgo =
    latestBackup?.endedAt != null
      ? hoursAgoFromNow(latestBackup.endedAt)
      : null;

  return (
    <section className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-3">
      <StatCard icon={Users01} label="총 직원 수" value={count} unit="명" />
      {/* TODO: 최근 변경 연동 */}
      <StatCard
        icon={ClockFastForward}
        label="최근 변경 건수"
        value={1234512345}
        unit="건"
      />
      <StatCard
        icon={FaceSmile}
        label="이번 달 신규 입사자"
        value={monthCount}
        unit="명"
      />
      <StatCard
        icon={Database01}
        label="마지막 백업"
        value={backupHoursAgo}
        unit="시간 전"
      />
    </section>
  );
}
