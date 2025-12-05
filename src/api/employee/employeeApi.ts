import type { EmployeeDto, EmployeeListQuery, EmployeeCreateRequest, EmployeeUpdateRequest } from "@/model/employee";
import type { CursorPageResponse } from "@/model/pagination";
import apiClient from "../client";

/**
 * 직원 목록 조회
 */
export function getEmployees(query: EmployeeListQuery): Promise<CursorPageResponse<EmployeeDto>> {
  return apiClient.get<CursorPageResponse<EmployeeDto>>("/employees", query);
}

/**
 * 직원 상세 조회
 */
export function getEmployeeById(id: number): Promise<EmployeeDto> {
  return apiClient.get<EmployeeDto>(`/employees/${id}`);
}

/**
 * 직원 등록
 */
export function createEmployee(request: EmployeeCreateRequest, profileFile?: File): Promise<EmployeeDto> {
  const formData = new FormData();
  formData.append("employee", new Blob([JSON.stringify(request)], { type: "application/json" }));
  if (profileFile) {
    formData.append("profile", profileFile);
  }

  return apiClient.post<EmployeeDto>("/employees", formData);
}

/**
 * 직원 수정
 */
export function updateEmployee(
  id: number,
  request: EmployeeUpdateRequest,
  profileFile?: File | null
): Promise<EmployeeDto> {
  const formData = new FormData();
  formData.append("employee", new Blob([JSON.stringify(request)], { type: "application/json" }));

  if (profileFile !== undefined && profileFile !== null) {
    formData.append("profile", profileFile);
  }

  return apiClient.patch<EmployeeDto>(`/employees/${id}`, formData);
}

/**
 * 직원 삭제
 */
export function deleteEmployee(id: number): Promise<void> {
  return apiClient.delete<void>(`/employees/${id}`);
}
