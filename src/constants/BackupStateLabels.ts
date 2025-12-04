import { BackupState, type BackupStateType } from "@/types/enums";

export const BackupStateLabels: Record<BackupStateType, string> = {
  [BackupState.IN_PROGRESS]: "완료",
  [BackupState.COMPLETED]: "진행중",
  [BackupState.FAILED]: "실패",
};
