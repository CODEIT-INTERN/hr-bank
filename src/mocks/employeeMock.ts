export interface Employee {
  id: number;
  name: string;
  email: string;
  employeeNumber: string;
  departmentId: number;
  departmentName: string;
  position: string;
  hireDate: string;
  status: string; // "재직중" | "휴직중" | "퇴사" 등
  profileImageId: number;
}

// 직원 목록
export interface EmployeeListResponse {
  content: Employee[];
  nextCursor: string | null;
  nextIdAfter: number | null;
  size: number;
  totalElements: number;
  hasNext: boolean;
}

export const employeeListMock: EmployeeListResponse = {
  content: [
    {
      id: 1,
      name: "홍길동",
      email: "hong@example.com",
      employeeNumber: "EMP-2023-001",
      departmentId: 1,
      departmentName: "개발팀",
      position: "선임 개발자",
      hireDate: "2023-01-01",
      status: "재직중",
      profileImageId: 1,
    },
    {
      id: 2,
      name: "홍길동",
      email: "hong@example.com",
      employeeNumber: "EMP-2023-002",
      departmentId: 1,
      departmentName: "개발팀",
      position: "선임 개발자",
      hireDate: "2023-01-01",
      status: "휴직중",
      profileImageId: 1,
    },
    {
      id: 3,
      name: "홍길동",
      email: "hong@example.com",
      employeeNumber: "EMP-2023-003",
      departmentId: 1,
      departmentName: "개발팀",
      position: "선임 개발자",
      hireDate: "2023-01-01",
      status: "퇴사",
      profileImageId: 1,
    },
  ],
  nextCursor: "eyJpZCI6MjB9",
  nextIdAfter: 20,
  size: 10,
  totalElements: 100,
  hasNext: true,
};
