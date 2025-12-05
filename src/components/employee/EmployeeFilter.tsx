import React, { useState } from "react";
import { Input } from "../common/input/Input";
import { FilterLines, Plus, SearchMd } from "@untitledui/icons";
import { DropdownButton } from "../common/dropdown/DropdownButton";
import { EmploymentStateLabels } from "@/constants/EmploymentStateLabels";
import { Button } from "../common/buttons/button";
import { DateRangePicker } from "../common/date-picker/DateRangePicker";

const EmployeeFilter = () => {
  const [isFilterActive, setIsFilterActive] = useState(false);

  const handleToggleFilter = () => {
    setIsFilterActive((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-4">
      <span className="text-tertiary text-sm">총 {}명</span>
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <Input
            icon={SearchMd}
            placeholder="이름 또는 이메일을 입력해주세요"
            className="w-80"
          />
          <DropdownButton label={EmploymentStateLabels} placeholder="상태" />
          <Button
            iconLeading={FilterLines}
            color="secondary"
            className="w-8 h-8"
            onClick={handleToggleFilter}
          />
        </div>
        {/* TODO: h-10이 적용 안됨 */}
        <Button iconLeading={<Plus data-icon color="white" />}>
          직원 등록하기
        </Button>
      </div>
      {isFilterActive && (
        <div className="flex gap-3 items-center">
          <Input placeholder="사번을 입력해주세요" className="w-80" />
          <Input
            placeholder="부서명 또는 직함을 입력해주세요"
            className="w-80"
          />
          <DateRangePicker placeholder="입사일을 선택해주세요" />
        </div>
      )}
    </div>
  );
};

export default EmployeeFilter;
