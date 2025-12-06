import { useState } from "react";
import EmployeeTable from "./EmployeeTable";
import EmployeeFilterSection from "./EmployeeFilterSection";
import { BaseModal } from "../common/modals/BaseModal";

const EmployeeWrapper = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4 pb-[116px]">
      <EmployeeFilterSection
        onClickCreateButton={() => setIsCreateModalOpen(true)}
      />
      <EmployeeTable />
      <BaseModal isOpen={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        하하하
      </BaseModal>
    </div>
  );
};

export default EmployeeWrapper;
