export interface EmployeeHistory {
  id: number;
  type: string; // "UPDATED" | "CREATED" | "DELETED" 등
  employeeNumber: string;
  memo: string;
  ipAddress: string;
  at: string;
}

export interface EmployeeHistoryListResponse {
  content: EmployeeHistory[];
  nextCursor: string | null;
  nextIdAfter: number | null;
  size: number;
  totalElements: number;
  hasNext: boolean;
}

// 직원 정보 수정 이력 목록
export const employeeHistoryListMock: EmployeeHistoryListResponse = {
  content: [
    {
      id: 1,
      type: "UPDATED",
      employeeNumber: "EMP-2023-001",
      memo: "직함 변경에 따른 수정",
      ipAddress: "192.168.0.1",
      at: "2023-01-01T12:00:00",
    },
    {
      id: 2,
      type: "CREATED",
      employeeNumber: "EMP-2023-001",
      memo: "직함 변경에 따른 추가",
      ipAddress: "192.168.0.1",
      at: "2023-01-01T12:00:00",
    },
    {
      id: 3,
      type: "DELETED",
      employeeNumber: "EMP-2023-001",
      memo: "직함 변경에 따른 삭제",
      ipAddress: "192.168.0.1",
      at: "2023-01-01T12:00:00",
    },
  ],
  nextCursor: "eyJpZCI6MjB9",
  nextIdAfter: 20,
  size: 10,
  totalElements: 100,
  hasNext: true,
};
