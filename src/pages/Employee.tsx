import EmployeeFilterSection from "@/components/employee/EmployeeFilterSection";
import EmployeeTable from "@/components/employee/EmployeeTable";

const Employee = () => {
  return (
    <div className="flex flex-col gap-4 pb-[116px]">
      <EmployeeFilterSection />
      <EmployeeTable />
    </div>
  );
};

export default Employee;
