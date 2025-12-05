import React from "react";
import EmployeeTable from "./EmployeeTable";
import EmployeeFilter from "./EmployeeFilter";

const EmployeeWrapper = () => {
  return (
    <div>
      <EmployeeFilter />
      <EmployeeTable />
    </div>
  );
};

export default EmployeeWrapper;
