import React, { useState } from "react";
import { Input } from "../common/input/Input";
import { FilterLines, Plus, SearchMd } from "@untitledui/icons";
import { DropdownButton } from "../common/dropdown/DropdownButton";
import { EmploymentStateLabels } from "@/constants/EmploymentStateLabels";
import { Button } from "../common/buttons/Button";
import { DateRangePicker } from "../common/date-picker/DateRangePicker";
import { useEmployeeListStore } from "@/store/employeeStore";
import type { EmployeeStatus, HistoryType } from "@/types/enums";
import { formatDateRange } from "@/utils/date";
import type { DateRange } from "react-aria-components";
import CreateUpdateEmployeeModal from "../employee/CreateUpdateEmployeeModal";
import { useHistoryListStore } from "@/store/historyStore";
import { HistoryTypeLabels } from "@/constants/HistoryTypeLabels";

const HistoryFilterSection = () => {
  const { setFilters, filters, totalElements } = useHistoryListStore();
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [committedRange, setCommittedRange] = useState<DateRange | null>(null);
  const [tempRange, setTempRange] = useState<DateRange | null>(null);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

  const handleToggleFilter = () => {
    setIsFilterActive((prev) => !prev);
  };

  const handleRangeChange = (value: DateRange | null) => {
    const formattedDate = formatDateRange(value);
    setFilters({
      hireDateFrom: formattedDate.start,
      hireDateTo: formattedDate.end,
    });
  };

  const handleRangeApply = () => {
    setCommittedRange(tempRange);
  };

  const handleRangeCancel = () => {
    setTempRange(null);
    setCommittedRange(null);
  };

  const handleClickCreateButton = () => {
    setIsCreateModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-4">
      <span className="text-tertiary text-sm">총 {totalElements}건</span>
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <Input
            icon={SearchMd}
            iconClassName="w-5 h-5 stroke-black"
            placeholder="사번을 입력해주세요"
            className="w-80"
            onChange={(value) => {
              setFilters({ employeeNumber: value });
            }}
          />
          <DropdownButton
            label={HistoryTypeLabels}
            value={filters.type}
            placeholder="유형"
            onChange={(value) => {
              setFilters({ type: value as HistoryType });
            }}
            className="min-w-[110px] h-10"
          />
          <Button
            iconLeading={<FilterLines className="stroke-black" size={20} />}
            color="secondary"
            className="w-8 h-8 data-icon-only:p-0"
            onClick={handleToggleFilter}
          />
        </div>
      </div>
      {isFilterActive && (
        <div className="flex gap-3 items-center">
          <Input
            placeholder="내용을 입력해주세요"
            className="w-80"
            onChange={(value) => {
              setFilters({ memo: value });
            }}
          />
          <Input
            placeholder="IP 주소를 입력해주세요"
            className="w-80"
            onChange={(value) => {
              // TODO:
              setFilters({ ipAddress: value });
            }}
          />
          <DateRangePicker
            placeholder="날짜를 선택해주세요"
            onChange={handleRangeChange}
            onApply={handleRangeApply}
            onCancel={handleRangeCancel}
          />
        </div>
      )}
      <CreateUpdateEmployeeModal
        employee={null}
        isOpen={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
      />
    </div>
  );
};

export default HistoryFilterSection;
