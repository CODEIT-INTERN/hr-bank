export const EmploymentState = {
  ALL: "ALL",
  ACTIVE: "ACTIVE",
  ON_LEAVE: "ON_LEAVE",
  RESIGNED: "RESIGNED",
} as const;

export type EmploymentStateType =
  (typeof EmploymentState)[keyof typeof EmploymentState];

export const BackupState = {
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  FAILED: "FAILED",
} as const;

export type BackupStateType = (typeof BackupState)[keyof typeof BackupState];

export const HistoryType = {
  CREATED: "CREATED",
  UPDATED: "UPDATED",
  DELETED: "DELETED",
} as const;

export type HistoryType = (typeof HistoryType)[keyof typeof HistoryType];
