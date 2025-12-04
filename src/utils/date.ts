import { getLocalTimeZone } from "@internationalized/date";
import type { DateValue } from "react-aria-components";

// TODO: 백엔드 요청 데이터 형식이랑 같은 지 확인해봐야 함
// DateValue → YYYY-MM-DD 문자열 변환
export const formatDateValue = (dateValue: DateValue | null) => {
  if (!dateValue) return "";

  const jsDate = dateValue.toDate(getLocalTimeZone());

  const year = jsDate.getFullYear();
  const month = String(jsDate.getMonth() + 1).padStart(2, "0");
  const day = String(jsDate.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// RangeDateValue → YYYY-MM-DD 문자열 변환

export const formatDateRange = (
  range: {
    start: DateValue;
    end: DateValue;
  } | null
) => {
  if (!range) return { start: "", end: "" };

  return {
    start: formatDateValue(range.start),
    end: formatDateValue(range.end),
  };
};
