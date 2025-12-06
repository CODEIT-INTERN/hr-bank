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
import { formatDateAsKorean, formatDateValue } from "@/utils/date";

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

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "hireDate",
    direction: "descending",
  });

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

  return (
    <>
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
                  <div className="flex items-center gap-3">
                    {/* 프로필 이미지가 없으니 이름 첫 글자 원형 아바타 */}
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-gray-700">
                      {item.name.charAt(0)}
                    </div>
                    <div className="whitespace-nowrap">
                      <p className="text-sm font-medium text-primary">
                        {item.name}
                      </p>
                      <p className="text-xs text-tertiary">{item.email}</p>
                    </div>
                  </div>
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
                    <Button color="tertiary" iconLeading={Trash01} />
                    <Button color="tertiary" iconLeading={Edit01} />
                  </div>
                </Table.Cell>
              </Table.Row>
            );
          }}
        </Table.Body>
      </Table>
      <div ref={loadMoreRef} />
      <div className="flex items-center justify-center text-xs text-gray-500">
        {/* TODO: 데이터 없을 때, 에러처리, 로딩상태 */}
        {/* <div>{errorMessage && <span className="text-red-500">{errorMessage}</span>}</div> */}
        {/* {isLoading && <span>불러오는 중...</span>} */}
      </div>
    </>
  );
};

export default EmployeeTable;
