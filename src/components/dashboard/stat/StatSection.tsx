import { useEffect, useState } from "react";

import { StatCard } from "@/components/dashboard/stat/StatCard";
import { useBackupListStore } from "@/store/backupStore";
import { useEmployeeCountStore } from "@/store/employeeCountStore";
import { hoursAgoFromNow } from "@/utils/date";
import {
  ClockFastForward,
  Database01,
  FaceSmile,
  Users01,
} from "@untitledui/icons";

export default function StatSection() {
  const [isLoading, setIsLoading] = useState(false);

  const { count, monthCount, getCount, getThisMonthCount } =
    useEmployeeCountStore();
  const { latestBackup, getLatestBackup } = useBackupListStore();

  useEffect(() => {
    const fetchAll = async () => {
      setIsLoading(true);
      try {
        await Promise.all([getCount(), getThisMonthCount(), getLatestBackup()]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAll();
  }, [getCount, getThisMonthCount, getLatestBackup]);

  return (
    <section className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-3">
      <StatCard
        icon={Users01}
        label="총 직원 수"
        value={`${count?.toLocaleString()}명`}
        isLoading={isLoading}
      />
      {/* TODO: 최근 변경 연동 */}
      <StatCard
        icon={ClockFastForward}
        label="최근 변경 건수"
        value={`${(1234512345).toLocaleString()}건`}
        isLoading={isLoading}
      />
      <StatCard
        icon={FaceSmile}
        label="이번 달 신규 입사자"
        value={`${monthCount?.toLocaleString()}명`}
        isLoading={isLoading}
      />
      <StatCard
        icon={Database01}
        label="마지막 백업"
        value={`${hoursAgoFromNow(latestBackup?.endedAt)?.toLocaleString()}시간 전`}
        isLoading={isLoading}
      />
    </section>
  );
}
