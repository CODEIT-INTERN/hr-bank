import { Button } from "@/components/common/buttons/Button";
import { Input } from "@/components/common/input/Input";
import { Table } from "@/components/common/table/Table";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import type { DepartmentDto } from "@/model/department";
import { useDepartmentListStore } from "@/store/departmentStore";
import { sortByDescriptor } from "@/utils/sort";
import { Edit01, SearchMd, Trash01 } from "@untitledui/icons";
import { useEffect, useMemo, useState } from "react";
import type { SortDescriptor } from "react-aria-components";

export default function Department() {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });

  const { items, totalElements, isLoading, errorMessage, hasNext, filters, setFilters, loadFirstPage, loadNextPage } =
    useDepartmentListStore();

  const { loadMoreRef } = useInfiniteScroll({
    hasNext,
    isLoading,
    onLoadMore: loadNextPage,
    rootMargin: "0px 0px 200px 0px",
  });

  // 부서 목록 API 호출
  useEffect(() => {
    loadFirstPage();
  }, [loadFirstPage]);

  const sortedItems = useMemo(() => {
    return sortByDescriptor<DepartmentDto>(items, sortDescriptor);
  }, [items, sortDescriptor]);

  return (
    <div className="w-full flex flex-col items-start space-y-4 mt-7">
      <span className="font-normal text-sm text-gray-600">총 {totalElements}팀</span>
      <div className="flex items-start">
        <Input
          icon={SearchMd}
          iconClassName="text-black"
          placeholder="부서명 또는 설명을 입력해주세요"
          className="min-w-80"
        />
      </div>
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
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.description}</Table.Cell>
              <Table.Cell>{item.employeeCount}</Table.Cell>
              <Table.Cell>{item.establishedDate}</Table.Cell>
              <Table.Cell>
                <div className="flex justify-end gap-0.5">
                  <Button color="tertiary" iconLeading={Trash01} />
                  <Button color="tertiary" iconLeading={Edit01} />
                </div>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  );
}
