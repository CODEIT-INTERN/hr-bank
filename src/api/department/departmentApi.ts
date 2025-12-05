import type {
  DepartmentCreateRequest,
  DepartmentDto,
  DepartmentListQuery,
  DepartmentUpdateRequest,
} from "@/model/department";
import type { CursorPageResponse } from "@/model/pagination";
import apiClient from "../client";

/**
 * 직원 목록 조회
 */
export function getDepartments(query: DepartmentListQuery): Promise<CursorPageResponse<DepartmentDto>> {
  return apiClient.get<CursorPageResponse<DepartmentDto>>("/departments", query);
}

/**
 * 직원 상세 조회
 */
export function getDepartmentById(id: number): Promise<DepartmentDto> {
  return apiClient.get<DepartmentDto>(`/departments/${id}`);
}

/**
 * 직원 등록
 */
export function createDepartment(request: DepartmentCreateRequest, profileFile?: File): Promise<DepartmentDto> {
  const formData = new FormData();
  formData.append("Department", new Blob([JSON.stringify(request)], { type: "application/json" }));
  if (profileFile) {
    formData.append("profile", profileFile);
  }

  return apiClient.post<DepartmentDto>("/departments", formData);
}

/**
 * 직원 수정
 */
export function updateDepartment(
  id: number,
  request: DepartmentUpdateRequest,
  profileFile?: File | null
): Promise<DepartmentDto> {
  const formData = new FormData();
  formData.append("Department", new Blob([JSON.stringify(request)], { type: "application/json" }));

  if (profileFile !== undefined && profileFile !== null) {
    formData.append("profile", profileFile);
  }

  return apiClient.patch<DepartmentDto>(`/departments/${id}`, formData);
}

/**
 * 직원 삭제
 */
export function deleteDepartment(id: number): Promise<void> {
  return apiClient.delete<void>(`/departments/${id}`);
}
