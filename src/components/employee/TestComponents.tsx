import { XClose, Plus } from "@untitledui/icons";
import { useEffect, useState } from "react";
import { DropdownButton } from "../common/dropdown/DropdownButton";
import { Button } from "../common/buttons/button";
import { EmploymentStateLabels } from "@/constants/EmploymentStateLabels";
import { DatePicker } from "../common/date-picker/date-picker";
import { DateRangePicker } from "../common/date-picker/date-range-picker";
import type { DateValue } from "react-aria-components";
import { getLocalTimeZone } from "@internationalized/date";
// TODO : 페이지 구현 후 삭제

type DateRange = { start: DateValue; end: DateValue };

const TestComponents = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [committedDate, setCommittedDate] = useState<DateValue | null>(null);
  const [tempDate, setTempDate] = useState<DateValue | null>(null);
  const [committedRange, setCommittedRange] = useState<DateRange | null>(null);
  const [tempRange, setTempRange] = useState<DateRange | null>(null);
  const getLoading = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleTempChange = (value: DateValue | null) => {
    setTempDate(value);
  };

  const handleApply = () => {
    setCommittedDate(tempDate);
  };

  const handleCancel = () => {
    setTempDate(committedDate);
  };

  const handleRangeChange = (value: DateRange | null) => {
    setTempRange(value);
  };

  const handleRangeApply = () => {
    setCommittedRange(tempRange);
  };

  const handleRangeCancel = () => {
    setTempRange(null);
    setCommittedRange(null);
  };
  const formatDateValue = (dateValue: DateValue | null) => {
    if (!dateValue) return "";

    const jsDate = dateValue.toDate(getLocalTimeZone());

    const year = jsDate.getFullYear();
    const month = String(jsDate.getMonth() + 1).padStart(2, "0");
    const day = String(jsDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    console.log("tempDate", formatDateValue(tempDate));
    console.log("tempRange", tempRange);
  }, [tempDate, tempRange]);

  return (
    <div className="flex flex-col gap-3 py-5 px-5">
      <div className="flex gap-3">
        <h1>Primary</h1>
        <Button color="primary">버튼</Button>
        <Button color="primary" isDisabled>
          버튼
        </Button>
        <Button
          color="primary"
          isLoading={isLoading}
          showTextWhileLoading
          onClick={getLoading}
        >
          {isLoading ? "등록 중..." : "등록하기"}
        </Button>
        <Button color="primary" iconLeading={<Plus data-icon color="white" />}>
          직원 등록하기
        </Button>
      </div>
      <div className="flex gap-3">
        <h1>Secondary</h1>
        <Button color="secondary">버튼</Button>
        <Button color="secondary" isDisabled>
          버튼
        </Button>
      </div>
      <div className="flex gap-3">
        <h1>Primary-destructive</h1>
        <Button color="primary-destructive">버튼</Button>
        <Button color="primary-destructive" isDisabled>
          버튼
        </Button>
        <Button
          color="primary-destructive"
          isLoading={isLoading}
          showTextWhileLoading
          onClick={getLoading}
        >
          {isLoading ? "등록 중..." : "등록하기"}
        </Button>
      </div>
      <div className="flex gap-3">
        <h1>Icon</h1>
        <Button color="tertiary" iconLeading={<XClose data-icon />} />
      </div>
      <div>
        <h1>Dropdown</h1>
        <DropdownButton
          placeholder="상태"
          label={EmploymentStateLabels}
          onChange={(value) => {
            setStatusFilter(value);
          }}
        />
      </div>
      <hr />
      <DatePicker
        placeholder="입사일을 선택해주세요"
        value={tempDate}
        onChange={handleTempChange}
        onApply={handleApply}
        onCancel={handleCancel}
      />
      <DateRangePicker
        placeholder="입사일을 선택해주세요"
        value={tempRange}
        onChange={handleRangeChange}
        onApply={handleRangeApply}
        onCancel={handleRangeCancel}
      />
    </div>
  );
};

export default TestComponents;
