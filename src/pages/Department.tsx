import { deleteDepartment } from "@/api/department/departmentApi";
import { Button } from "@/components/common/buttons/Button";
import { Input } from "@/components/common/input/Input";
import ConfirmModal from "@/components/common/modals/ConfirmModal";
import { Table } from "@/components/common/table/Table";
import DepartmentModal from "@/components/department/DepartmentModal";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import type { DepartmentDto } from "@/model/department";
import { useDepartmentListStore } from "@/store/departmentStore";
import { useToastStore } from "@/store/toastStore";
import { sortByDescriptor } from "@/utils/sort";
import { Edit01, Plus, SearchMd, Trash01 } from "@untitledui/icons";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import type { SortDescriptor } from "react-aria-components";

export default function Department() {
  // 부서 쿼리 스토어
  const { items, totalElements, isLoading, errorMessage, hasNext, filters, setFilters, loadFirstPage, loadNextPage } =
    useDepartmentListStore();
  const { successToast, errorToast } = useToastStore();

  const [keyword, setKeyword] = useState(filters.nameOrDescription ?? ""); // 검색 인풋
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "establishedDate",
    direction: "descending",
  }); // 정렬
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [isConfirmOpen, setIsConfirmOpen] = useState(false); // 모달 상태
  const [selected, setSelected] = useState<DepartmentDto | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<DepartmentDto | null>(null);

  // 무한 스크롤 유틸
  const { loadMoreRef } = useInfiniteScroll({
    hasNext,
    isLoading,
    onLoadMore: loadNextPage,
    rootMargin: "0px 0px 100px 0px",
  });

  // 부서 목록 API 호출
  useEffect(() => {
    loadFirstPage();
  }, [loadFirstPage]);

  // 디바운스
  const debouncedKeyword = useDebouncedValue(keyword);

  // store 필터 + 재조회
  useEffect(() => {
    setFilters({ nameOrDescription: debouncedKeyword });
    loadFirstPage();
  }, [debouncedKeyword, loadFirstPage, setFilters]);

  // 아이템 정렬
  const sortedItems = useMemo(() => {
    return sortByDescriptor<DepartmentDto>(items, sortDescriptor);
  }, [items, sortDescriptor]);

  // 부서 추가 모달 열기
  const onAddClick = () => {
    setSelected(null);
    setIsModalOpen(true);
  };

  // 부서 수정 모달 열기
  const onEditClick = (item: DepartmentDto) => {
    setSelected(item);
    setIsModalOpen(true);
  };

  // 부서 삭제 확인 모달 열기
  const onDeleteClick = (item: DepartmentDto) => {
    setDeleteTarget(item);
    setIsConfirmOpen(true);
  };

  // 부서 삭제
  const handleDelete = async () => {
    if (!deleteTarget) return;

    try {
      await deleteDepartment(deleteTarget?.id);
      loadFirstPage();
      setDeleteTarget(null);
      successToast("부서가 삭제되었습니다");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const message = error.response?.data?.message as string | undefined;
        const details = error.response?.data?.details as string;

        if (status === 400 && message === "IllegalStateException") {
          errorToast(details);
          return;
        }
      }
      console.log(error);
    }
  };

  return (
    <div className="w-full space-y-4 mt-7">
      {/* 총 부서 팀 수 */}
      <span className="block font-normal text-sm text-gray-600">총 {totalElements}팀</span>
      {/* 검색 및 부서 추가하기 버튼 */}
      <div className="flex items-center justify-between">
        <Input
          icon={SearchMd}
          iconClassName="text-black"
          placeholder="부서명 또는 설명을 입력해주세요"
          value={keyword}
          onChange={(value) => setKeyword(value)}
          className="max-w-80"
        />
        <Button iconLeading={Plus} className="text-white" onClick={onAddClick}>
          부서 추가하기
        </Button>
      </div>
      {/* 부서 목록 테이블 */}
      <Table aria-label="부서 목록" sortDescriptor={sortDescriptor} onSortChange={setSortDescriptor}>
        <Table.Header>
          <Table.Head id="name" label="부서명" isRowHeader allowsSorting className="min-w-45" />
          <Table.Head id="description" label="설명" allowsSorting className="min-w-50 w-full" />
          <Table.Head id="employeeCount" label="인원수" />
          <Table.Head id="establishedDate" label="부서생성일" allowsSorting className="min-w-45" />
          <Table.Head id="actions" />
        </Table.Header>

        <Table.Body items={sortedItems}>
          {(item) => (
            <Table.Row id={item.id} key={item.id}>
              <Table.Cell className="font-semibold text-primary">{item.name}</Table.Cell>
              <Table.Cell>{item.description}</Table.Cell>
              <Table.Cell>{item.employeeCount}</Table.Cell>
              <Table.Cell>{item.establishedDate}</Table.Cell>
              <Table.Cell>
                <div className="flex justify-end gap-0.5">
                  <Button color="tertiary" iconLeading={Trash01} onClick={() => onDeleteClick(item)} />
                  <Button color="tertiary" iconLeading={Edit01} onClick={() => onEditClick(item)} />
                </div>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>

      <div ref={loadMoreRef} className="h-4" />

      <div className="flex items-center justify-center text-center text-sm text-gray-600">
        <div>{errorMessage && <span className="text-red-500">{errorMessage}</span>}</div>
        <div>{isLoading && <span>불러오는 중...</span>}</div>
        <div className="flex justify-center">{!hasNext && <span>조회 끝</span>}</div>
      </div>

      {/* Modal */}
      <DepartmentModal
        key={selected?.id || "new"}
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        department={selected}
      />

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        description={`${`${deleteTarget?.name}`} 부서를 삭제할까요? \n 삭제 후에는 되돌릴 수 없어요`}
        onConfirm={handleDelete}
      />
    </div>
  );
}
