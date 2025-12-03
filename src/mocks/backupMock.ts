export interface Backup {
  id: number;
  worker: string;
  startedAt: string;
  endedAt: string;
  status: string; // "완료" | "진행중" | "실패" 등
  fileId: number;
}

export interface BackupListResponse {
  content: Backup[];
  nextCursor: string | null;
  nextIdAfter: number | null;
  size: number;
  totalElements: number;
  hasNext: boolean;
}

// 데이터 백업 목록
export const backupListMock: BackupListResponse = {
  content: [
    {
      id: 1,
      worker: "192.168.0.1",
      startedAt: "2023-01-01T12:00:00Z",
      endedAt: "2023-01-01T12:05:00Z",
      status: "완료",
      fileId: 1,
    },
    {
      id: 2,
      worker: "192.168.0.1",
      startedAt: "2023-01-01T12:00:00Z",
      endedAt: "2023-01-01T12:05:00Z",
      status: "진행중",
      fileId: 1,
    },
    {
      id: 3,
      worker: "192.168.0.1",
      startedAt: "2023-01-01T12:00:00Z",
      endedAt: "2023-01-01T12:05:00Z",
      status: "실패",
      fileId: 1,
    },
  ],
  nextCursor: "eyJpZCI6MjB9",
  nextIdAfter: 20,
  size: 10,
  totalElements: 100,
  hasNext: true,
};
