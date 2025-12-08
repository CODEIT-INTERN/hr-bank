import { useEffect } from "react";
import { BackupTable } from "@/components/backup/BackupTable";
import { useBackupListStore } from "@/store/backupStore";
import { BackupFilterSection } from "@/components/backup/BackupFilterSection";

export default function Backup() {
  // 백업 쿼리 스토어
  const { totalElements, filters, latestBackup, setFilters, loadFirstPage, getLatestBackup } = useBackupListStore();

  // store 필터 + 재조회
  useEffect(() => {
    loadFirstPage();
    getLatestBackup();
  }, [getLatestBackup, loadFirstPage, filters]);

  return (
    <div className="w-full space-y-4 mt-7">
      {/* 검색 및 백업하기 버튼 */}
      <BackupFilterSection />
      {/* 백업 목록 테이블 */}
      <BackupTable />
    </div>
  );
}
