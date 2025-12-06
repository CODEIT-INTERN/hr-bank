import React, { useState } from "react";
import { Input } from "../common/input/Input";
import { FilterLines, Plus, SearchMd } from "@untitledui/icons";
import { DropdownButton } from "../common/dropdown/DropdownButton";
import { EmploymentStateLabels } from "@/constants/EmploymentStateLabels";
import { Button } from "../common/buttons/Button";
import { DateRangePicker } from "../common/date-picker/DateRangePicker";
import { useEmployeeListStore } from "@/store/employeeStore";
import type { EmployeeStatus } from "@/types/enums";
import { formatDateRange } from "@/utils/date";
import type { DateRange } from "react-aria-components";

interface EmployeeFilterSectionProps {
  onClickCreateButton: () => void;
}

const EmployeeFilterSection = ({
  onClickCreateButton,
}: EmployeeFilterSectionProps) => {
  const { setFilters, totalElements } = useEmployeeListStore();
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [committedRange, setCommittedRange] = useState<DateRange | null>(null);
  const [tempRange, setTempRange] = useState<DateRange | null>(null);

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

  return (
    <div className="flex flex-col gap-4">
      <span className="text-tertiary text-sm">총 {totalElements}명</span>
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <Input
            icon={SearchMd}
            placeholder="이름 또는 이메일을 입력해주세요"
            className="w-80"
            onChange={(value) => {
              setFilters({ nameOrEmail: value });
            }}
          />
          <DropdownButton
            label={EmploymentStateLabels}
            placeholder="상태"
            onChange={(value) => {
              setFilters({ status: value as EmployeeStatus });
            }}
          />
          <Button
            iconLeading={FilterLines}
            color="secondary"
            className="w-8 h-8"
            onClick={handleToggleFilter}
          />
        </div>
        {/* TODO: h-10이 적용 안됨 */}
        <Button
          iconLeading={<Plus data-icon color="white" />}
          onClick={onClickCreateButton}
        >
          직원 등록하기
        </Button>
      </div>
      {isFilterActive && (
        <div className="flex gap-3 items-center">
          <Input
            placeholder="사번을 입력해주세요"
            className="w-80"
            onChange={(value) => {
              setFilters({ employeeNumber: value });
            }}
          />
          <Input
            placeholder="부서명을 입력해주세요"
            className="w-80"
            onChange={(value) => {
              // TODO:
              setFilters({ departmentName: value });
            }}
          />
          <Input
            placeholder="직함을 입력해주세요"
            className="w-80"
            onChange={(value) => {
              // TODO:
              setFilters({ position: value });
            }}
          />
          <DateRangePicker
            placeholder="입사일을 선택해주세요"
            onChange={handleRangeChange}
            onApply={handleRangeApply}
            onCancel={handleRangeCancel}
          />
        </div>
      )}
    </div>
  );
};

export default EmployeeFilterSection;
