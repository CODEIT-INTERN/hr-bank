import { useMemo, useState } from "react";
import type { SortDescriptor } from "react-aria-components";
import { Table } from "@/components/common/table/Table";
import { Button } from "@/components/common/buttons/Button";
import { useDepartmentListStore } from "@/store/departmentStore";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { sortByDescriptor } from "@/utils/sort";
import type { DepartmentDto } from "@/model/department";
import { Edit01, Trash01 } from "@untitledui/icons";

interface DepartmentTableProps {
  onEdit: (item: DepartmentDto) => void;
  onDelete: (item: DepartmentDto) => void;
}

export function DepartmentTable({ onEdit, onDelete }: DepartmentTableProps) {
  // 부서 쿼리 스토어
  const { items, isLoading, errorMessage, hasNext, loadNextPage } = useDepartmentListStore();

  // 테이블 정렬
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "establishedDate",
    direction: "descending",
  });

  // 무한 스크롤 유틸
  const { loadMoreRef } = useInfiniteScroll({
    hasNext,
    isLoading,
    onLoadMore: loadNextPage,
    rootMargin: "0px 0px 100px 0px",
  });

  // 아이템 정렬
  const sortedItems = useMemo(() => {
    return sortByDescriptor<DepartmentDto>(items, sortDescriptor);
  }, [items, sortDescriptor]);

  return (
    <>
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
                  <Button color="tertiary" iconLeading={Trash01} onClick={() => onDelete(item)} />
                  <Button color="tertiary" iconLeading={Edit01} onClick={() => onEdit(item)} />
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
        <div className="flex justify-center">{!isLoading && !hasNext && <span>조회 끝</span>}</div>
      </div>
    </>
  );
}
