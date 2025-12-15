import { useEffect, useMemo, useState } from "react";
import { Table } from "../common/table/Table";
import type { SortDescriptor } from "react-aria-components";
import type { EmployeeDto } from "@/model/employee";
import { sortByDescriptor } from "@/utils/sort";
import { useEmployeeListStore } from "@/store/employeeStore";
import { Button } from "../common/buttons/Button";
import { Edit01, Trash01 } from "@untitledui/icons";
import { StatusBadge } from "../common/badges/StatusBadge";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { formatDateAsKorean } from "@/utils/date";
import ConfirmModal from "../common/modals/ConfirmModal";
import { deleteEmployee } from "@/api/employee/employeeApi";
import CreateUpdateEmployeeModal from "./CreateUpdateEmployeeModal";
import { AvatarLabelGroup } from "../common/avatar/AvatarLabelGroup";

const EmployeeTable = () => {
  const {
    items,
    isLoading,
    errorMessage,
    filters,
    hasNext,
    loadFirstPage,
    loadNextPage,
  } = useEmployeeListStore();

  // 기본 정렬값(입사일)
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "hireDate",
    direction: "descending",
  });
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [targetEmployeeName, setTargetEmployeeName] = useState<string>("");
  const [targetEmployeeId, setTargetEmployeeId] = useState<number | null>(null);
  // 수정 모달
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [updatingEmployee, setUpdatingEmployee] = useState<EmployeeDto | null>(
    null
  );

  useEffect(() => {
    loadFirstPage();
  }, [loadFirstPage, filters]);

  const sortedItems = useMemo(() => {
    return sortByDescriptor<EmployeeDto>(items, sortDescriptor);
  }, [items, sortDescriptor]);

  const { loadMoreRef } = useInfiniteScroll({
    hasNext,
    isLoading,
    onLoadMore: loadNextPage,
    rootMargin: "0px 0px 200px 0px",
  });

  // 수정 모달 핸들러
  const handleOpenUpdateModal = (employee: EmployeeDto) => {
    setUpdatingEmployee(employee);
    setUpdateModalOpen(true);
  };

  // 삭제 모달 핸들러
  const handleOpenConfirmModal = (employeeId: number, employeeName: string) => {
    setTargetEmployeeId(employeeId);
    setTargetEmployeeName(employeeName);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (targetEmployeeId == null) return;

    try {
      await deleteEmployee(targetEmployeeId);
      await loadFirstPage();
    } catch (error) {
      // TODO: 토스트 추가
      console.error("직원 삭제 실패", error);
    } finally {
      setDeleteModalOpen(false);
      setTargetEmployeeId(null);
    }
  };

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* 테이블 영역 - 가로 스크롤 적용 */}
      <div className="overflow-auto flex-1 border border-border-secondary rounded-2xl">
        {" "}
        <Table
          aria-label="직원 목록"
          sortDescriptor={sortDescriptor}
          onSortChange={setSortDescriptor}
        >
          <Table.Header>
            <Table.Head id="name" label="이름" isRowHeader allowsSorting />
            <Table.Head id="employeeNumber" label="사원번호" allowsSorting />
            <Table.Head id="departmentName" label="부서명" />
            <Table.Head id="position" label="직함" />
            <Table.Head id="hireDate" label="입사일" allowsSorting />
            <Table.Head id="status" label="재직상태" />
            <Table.Head id="actions" />
          </Table.Header>
          <Table.Body items={sortedItems}>
            {(item) => {
              return (
                <Table.Row id={item.id} key={item.id}>
                  {/* 이름 + 사번 */}
                  <Table.Cell>
                    <AvatarLabelGroup
                      size="md"
                      src={`/api/files/${item.profileImageId}/download`}
                      alt={`${item.name}의 프로필`}
                      title={item.name}
                      subtitle={item.email}
                    />
                  </Table.Cell>

                  {/* 사원번호 */}
                  <Table.Cell className="whitespace-nowrap">
                    {item.employeeNumber}
                  </Table.Cell>

                  {/* 부서명 */}
                  <Table.Cell className="whitespace-nowrap">
                    {item.departmentName}
                  </Table.Cell>

                  {/* 직함 */}
                  <Table.Cell className="whitespace-nowrap">
                    {item.position}
                  </Table.Cell>

                  {/* 입사일 */}
                  <Table.Cell className="whitespace-nowrap">
                    {formatDateAsKorean(item.hireDate)}
                  </Table.Cell>

                  {/* 상태 */}
                  <Table.Cell>
                    <StatusBadge kind="employment" value={item.status} />
                  </Table.Cell>

                  {/* 액션 버튼 */}
                  <Table.Cell className="px-4">
                    <div className="flex justify-end gap-0.5">
                      <Button
                        color="tertiary"
                        iconLeading={Trash01}
                        onClick={() =>
                          handleOpenConfirmModal(item.id, item.name)
                        }
                      />
                      <Button
                        color="tertiary"
                        iconLeading={Edit01}
                        onClick={() => handleOpenUpdateModal(item)}
                      />
                    </div>
                  </Table.Cell>
                </Table.Row>
              );
            }}
          </Table.Body>
        </Table>
        <div ref={loadMoreRef} className="h-4" />
      </div>
      {/* 수정 모달 */}
      <CreateUpdateEmployeeModal
        employee={updatingEmployee}
        isOpen={isUpdateModalOpen}
        onOpenChange={setUpdateModalOpen}
      />
      {/* 삭제 모달 */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
      >
        <p>
          ‘{targetEmployeeName}’ 직원을 삭제할까요?
          <br />
          삭제 후에는 되돌릴 수 없어요
        </p>
      </ConfirmModal>
      {!isLoading && sortedItems.length === 0 && (
        <div className="flex justify-center items-center h-48 text-gray-500">
          현재 표시할 직원이 없습니다
        </div>
      )}
      <div className="flex items-center justify-center text-xs text-gray-500">
        {/* TODO: 에러처리, 로딩상태 */}
        {/* <div>{errorMessage && <span className="text-red-500">{errorMessage}</span>}</div> */}
        {/* {isLoading && <span>불러오는 중...</span>} */}
      </div>
    </div>
  );
};

export default EmployeeTable;
