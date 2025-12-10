import { createEmployee } from "@/api/employee/employeeApi";
import type { EmployeeCreateRequest, EmployeeDto } from "@/model/employee";
import { useEffect, useState } from "react";
import { Button } from "../common/buttons/Button";
import { useEmployeeListStore } from "@/store/employeeStore";

// TODO: 배포 후 삭제
export default function ApiTest() {
  const [employees, setEmployees] = useState<EmployeeDto[]>([]);
  const [form, setForm] = useState<EmployeeCreateRequest>({
    name: "김영호",
    email: "yhk8462@example.com",
    departmentId: 3,
    position: "선임 개발자",
    hireDate: "2025-01-01",
    memo: "신규 입사자 등록",
  });

  const { items, isLoading, errorMessage, hasNext, filters, setFilters, loadFirstPage, loadNextPage } =
    useEmployeeListStore();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // departmentId는 보통 select 값으로 들어오니까 number 변환 예시
      const payload: EmployeeCreateRequest = {
        ...form,
        departmentId: Number(form.departmentId),
      };

      const created = await createEmployee(payload, undefined);

      console.log("직원 생성 완료:", created);
    } catch (error) {
      console.error("직원 생성 실패:", error);
    }
  };

  useEffect(() => {
    loadFirstPage();
  }, [loadFirstPage]);

  return (
    <div>
      <h1>form data:</h1>
      <div>
        <pre>{JSON.stringify(form, null, 2)}</pre>
      </div>
      <Button onClick={handleSubmit}>Create employee Form test</Button>
      <ul>
        {employees.map((employee, idx) => (
          <li key={idx}>{employee.name}</li>
        ))}
      </ul>
    </div>
  );
}
