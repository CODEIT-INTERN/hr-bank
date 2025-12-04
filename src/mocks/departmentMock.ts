export interface DepartmentItem {
  id: number;
  name: string;
  description: string;
  establishedDate: string;
  employeeCount: number;
}

export interface DepartmentListResponse {
  content: DepartmentItem[];
  nextCursor: string | null;
  nextIdAfter: number | null;
  size: number;
  totalElements: number;
  hasNext: boolean;
}

export const departmentListMock: DepartmentListResponse = {
  content: [
    {
      id: 3,
      name: "모바일 개발팀",
      description: "애자일 방법론을 실천하는 모바일 개발팀입니다.",
      establishedDate: "2022-10-02",
      employeeCount: 17,
    },
    {
      id: 4,
      name: "데브옵스팀",
      description: "지속적인 성장을 추구하는 데브옵스팀입니다.",
      establishedDate: "2022-10-02",
      employeeCount: 3,
    },
    {
      id: 5,
      name: "데이터 사이언스팀",
      description: "애자일 방법론을 실천하는 데이터 사이언스팀입니다.",
      establishedDate: "2022-10-02",
      employeeCount: 4,
    },
    {
      id: 8,
      name: "마케팅팀",
      description: "혁신적인 솔루션을 개발하는 마케팅팀입니다.",
      establishedDate: "2022-10-02",
      employeeCount: 3,
    },
    {
      id: 10,
      name: "인사/재무팀11",
      description: "혁신적인 솔루션을 개발하는 인사/재무팀입니다.",
      establishedDate: "2022-10-02",
      employeeCount: 5,
    },
    {
      id: 33,
      name: "개발팀",
      description: "소프트웨어 개발을 담당하는 부서입니다.",
      establishedDate: "2023-01-06",
      employeeCount: 1,
    },
    {
      id: 1,
      name: "백엔드 개발팀",
      description: "사용자 경험을 최우선으로 하는 백엔드 개발팀입니다.",
      establishedDate: "2024-10-02",
      employeeCount: 2,
    },
    {
      id: 2,
      name: "프론트엔드 개발팀",
      description: "사용자 경험을 최우선으로 하는 프론트엔드 개발팀입니다.",
      establishedDate: "2024-10-02",
      employeeCount: 2,
    },
    {
      id: 6,
      name: "UX/UI 디자인팀",
      description: "혁신적인 솔루션을 개발하는 UX/UI 디자인팀입니다.",
      establishedDate: "2024-10-02",
      employeeCount: 2,
    },
    {
      id: 7,
      name: "제품기획팀",
      description: "애자일 방법론을 실천하는 제품기획팀입니다.",
      establishedDate: "2024-10-02",
      employeeCount: 4,
    },
  ],
  nextCursor: "2024-10-02",
  nextIdAfter: 7,
  size: 10,
  totalElements: 34,
  hasNext: true,
};
