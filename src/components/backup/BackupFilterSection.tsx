import { useEffect, useState } from "react";
import { Button } from "@/components/common/buttons/Button";
import { Input } from "@/components/common/input/Input";
import { useBackupListStore } from "@/store/backupStore";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { RefreshCw04, SearchMd } from "@untitledui/icons";
import { formatDateValueToIsoZ, formatIsoToYmdHms } from "@/utils/date";
import { DropdownButton } from "@/components/common/dropdown/DropdownButton";
import { BackupStatusFilterLabels } from "@/constants/BackupStateLabels";
import type { BackupStatus } from "@/model/backup";
import { type DateRange } from "react-aria-components";
import { DateRangePicker } from "../common/date-picker/DateRangePicker";
import { createBackup } from "@/api/backup/backupApi";
import { useToastStore } from "@/store/toastStore";
import axios from "axios";

export function BackupFilterSection() {
  const { totalElements, filters, latestBackup, setFilters, getLatestBackup, loadFirstPage } = useBackupListStore();
  const { successToast, errorToast } = useToastStore();

  const [keyword, setKeyword] = useState(filters.worker ?? ""); // 검색
  const [tempDateRange, setTempDateRange] = useState<DateRange | null>(null); // 시작 날짜

  // 디바운스
  const debouncedKeyword = useDebouncedValue(keyword);

  const handleKeywordChange = (value: string) => {
    setKeyword(value);
  };

  const handleStatusChange = (value: BackupStatus | "ALL") => {
    if (value === "ALL") {
      setFilters({ status: undefined });
      return;
    }
    setFilters({ status: value as BackupStatus });
  };

  const handleDateChange = (value: DateRange | null) => {
    setTempDateRange(value);
  };

  const handleDateApply = () => {
    if (!tempDateRange) return;
    const { start, end } = tempDateRange;
    setFilters({ startedAtFrom: formatDateValueToIsoZ(start), startedAtTo: formatDateValueToIsoZ(end) });
  };

  const onBackupClick = async () => {
    try {
      await createBackup();

      successToast("백업이 성공적으로 요청되었습니다");

      loadFirstPage();
      getLatestBackup();
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message as string;
        errorToast(`백업중 오류가 발생했습니다. ${message}`);
      }
    }
  };

  useEffect(() => {
    setFilters({ worker: debouncedKeyword }); // 디바운스된 값으로 필터 반영
  }, [debouncedKeyword, setFilters]);

  return (
    <>
      {/* 총 백업 수 */}
      <span className="block font-normal text-sm text-gray-600">총 {totalElements}팀</span>
      {/* 검색 및 백업하기 버튼 */}
      <div className="flex justify-between gap-3">
        <div className="flex flex-1 items-center gap-3 shrink-0 flex-wrap">
          <Input
            icon={SearchMd}
            iconClassName="text-black"
            placeholder="작업자를 입력해주세요"
            value={keyword}
            onChange={(value) => handleKeywordChange(value)}
            className="max-w-80"
          />
          <DropdownButton
            placeholder="상태"
            label={BackupStatusFilterLabels}
            onChange={(value) => handleStatusChange(value as BackupStatus)}
          />
          <DateRangePicker
            aria-label="백업 날짜"
            placeholder="날짜를 선택해주세요"
            value={tempDateRange}
            onChange={(value) => handleDateChange(value)}
            onApply={handleDateApply}
          />
        </div>

        <div className="inline-flex gap-2 shrink-0">
          <div className="flex flex-col text-end text-sm font-normal text-gray-500">
            <span>마지막 백업</span>
            <span>{latestBackup && formatIsoToYmdHms(latestBackup?.startedAt)}</span>
          </div>
          <Button iconLeading={RefreshCw04} className="text-white" onClick={onBackupClick}>
            백업하기
          </Button>
        </div>
      </div>
    </>
  );
}
