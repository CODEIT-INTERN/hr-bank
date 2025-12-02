export const EmploymentState = {
  ALL: "ALL",
  ACTIVE: "ACTIVE",
  ON_LEAVE: "ON_LEAVE",
  RESIGNED: "RESIGNED",
} as const;

export type EmploymentStateType =
  (typeof EmploymentState)[keyof typeof EmploymentState];
