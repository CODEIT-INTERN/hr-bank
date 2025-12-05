import { createEmployee } from "@/api/employee/employeeApi";
import { TableTestPage } from "@/components/dashboard/TableTestPage";
import TestPage from "@/components/dashboard/TestPage";
import ApiTest from "@/components/employee/ApiTest";
import type { EmployeeCreateRequest } from "@/model/employee";
import { useState } from "react";

export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard page</h1>
      <ApiTest />
      <TableTestPage />
      {/* <TestPage /> */}
    </div>
  );
}
