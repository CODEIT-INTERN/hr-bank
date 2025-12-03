import { HistoryState, type HistoryStateType } from "@/types/enums";

export const HistoryStateLabels: Record<HistoryStateType, string> = {
  [HistoryState.CREATED]: "직원 추가",
  [HistoryState.UPDATED]: "정보 수정",
  [HistoryState.DELETED]: "직원 삭제",
};
