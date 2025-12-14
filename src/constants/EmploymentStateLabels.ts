import { EmploymentState, type EmploymentStateType } from "@/types/enums";

export const EmploymentStateLabels: Record<EmploymentStateType, string> = {
  [EmploymentState.ALL]: "전체",
  [EmploymentState.ACTIVE]: "재직중",
  [EmploymentState.ON_LEAVE]: "휴직중",
  [EmploymentState.RESIGNED]: "퇴사",
};

export const EmploymentEnableStateLabels: Record<EmploymentStateType, string> =
  {
    [EmploymentState.ACTIVE]: "재직중",
    [EmploymentState.ON_LEAVE]: "휴직중",
    [EmploymentState.RESIGNED]: "퇴사",
  };
