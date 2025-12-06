import { deleteDepartment } from "@/api/department/departmentApi";
import { Button } from "@/components/common/buttons/Button";
import { Input } from "@/components/common/input/Input";
import { Table } from "@/components/common/table/Table";
import DepartmentModal from "@/components/department/department-modal";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import type { DepartmentDto } from "@/model/department";
import { useDepartmentListStore } from "@/store/departmentStore";
import { sortByDescriptor } from "@/utils/sort";
import { Edit01, Plus, SearchMd, Trash01 } from "@untitledui/icons";
import { useEffect, useMemo, useState } from "react";
import type { SortDescriptor } from "react-aria-components";

export default function Department() {
  // 부서 쿼리 스토어
  const { items, totalElements, isLoading, errorMessage, hasNext, filters, setFilters, loadFirstPage, loadNextPage } =
    useDepartmentListStore();

  const [keyword, setKeyword] = useState(filters.nameOrDescription ?? ""); // 검색 인풋
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "establishedDate",
    direction: "descending",
  }); // 정렬
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
  const [selected, setSelected] = useState<DepartmentDto | null>(null);

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

  const onAddClick = () => {
    setSelected(null);
    setIsModalOpen(true);
  };

  const onEditClick = (item: DepartmentDto) => {
    setSelected(item);
    setIsModalOpen(true);
  };

  const onDeleteClick = async (id: number) => {
    try {
      await deleteDepartment(id);
      loadFirstPage();
    } catch (error) {
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
                  <Button color="tertiary" iconLeading={Trash01} onClick={() => onDeleteClick(item.id)} />
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
    </div>
  );
}
