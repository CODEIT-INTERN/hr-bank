import { useEffect, useState } from "react";
import { Button } from "@/components/common/buttons/Button";
import { Input } from "@/components/common/input/Input";
import { useBackupListStore } from "@/store/backupStore";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { RefreshCw04, SearchMd } from "@untitledui/icons";
import { formatIsoToYmdHms } from "@/utils/date";

export function BackupFilterSection() {
  const { totalElements, filters, latestBackup, setFilters, loadFirstPage, getLatestBackup } = useBackupListStore();

  const [keyword, setKeyword] = useState(filters.worker ?? ""); // 검색
  const [status, setStatus] = useState(filters.status); // 백업 상태
  const [startDate, setStartDate] = useState(filters.startedAtFrom); // 시작 날짜

  // 디바운스
  const debouncedKeyword = useDebouncedValue(keyword);

  useEffect(() => {
    setFilters({ worker: debouncedKeyword });
  }, [debouncedKeyword, setFilters]);

  return (
    <>
      {/* 총 백업 수 */}
      <span className="block font-normal text-sm text-gray-600">총 {totalElements}팀</span>
      {/* 검색 및 백업하기 버튼 */}
      <div className="flex items-center justify-between flex-wrap">
        <Input
          icon={SearchMd}
          iconClassName="text-black"
          placeholder="작업자를 입력해주세요"
          value={keyword}
          onChange={(value) => setKeyword(value)}
          className="max-w-80"
        />
        <div className="inline-flex gap-2">
          <div className="flex flex-col text-end text-sm font-normal text-gray-500">
            <span>마지막 백업</span>
            <span>{latestBackup && formatIsoToYmdHms(latestBackup?.startedAt)}</span>
          </div>
          <Button iconLeading={RefreshCw04} className="text-white" onClick={() => {}}>
            백업하기
          </Button>
        </div>
      </div>
    </>
  );
}
