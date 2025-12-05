import { useEffect, useMemo, useRef, useState } from "react";
import { Edit01, Trash01 } from "@untitledui/icons";
import type { SortDescriptor } from "react-aria-components";
import { Badge, BadgeWithDot } from "@/components/common/badges/Badges";
import { Button } from "@/components/common/buttons/UiButton";
import type { EmployeeCreateRequest, EmployeeDto } from "@/model/employee";
import type { CursorPageResponse } from "@/model/pagination";
import { createEmployee, getEmployees } from "@/api/employee/employeeApi";
import { useEmployeeListStore } from "@/store/employeeStore";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { Table } from "../common/table/table";

export const TableTestPage = () => {
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });

  const { items, isLoading, errorMessage, hasNext, filters, setFilters, loadFirstPage, loadNextPage } =
    useEmployeeListStore();

  const { loadMoreRef } = useInfiniteScroll({
    hasNext,
    isLoading,
    onLoadMore: loadNextPage,
    rootMargin: "0px 0px 200px 0px",
  });

  // API 호출
  useEffect(() => {
    loadFirstPage();
  }, [loadFirstPage]);

  const sortedItems = useMemo(() => {
    if (items.length === 0) return [];

    const copied = [...items];
    const { column, direction } = sortDescriptor;

    if (!column) return copied;

    return copied.sort((a, b) => {
      const first = a[column as keyof EmployeeDto];
      const second = b[column as keyof EmployeeDto];

      if (first == null || second == null) return 0;

      // 수자열 정렬
      if (typeof first === "number" && typeof second === "number") {
        return direction === "descending" ? second - first : first - second;
      }

      // 나머지는 문자열로 비교
      const f = String(first);
      const s = String(second);
      let cmp = f.localeCompare(s);

      if (direction === "descending") {
        cmp *= -1;
      }

      return cmp;
    });
  }, [items, sortDescriptor]);

  // 직원 상태 -> 배지 색/텍스트 매핑
  const getStatusInfo = (status: EmployeeDto["status"]) => {
    switch (status) {
      case "ACTIVE":
        return { label: "재직중", color: "success" as const };
      case "ON_LEAVE":
        return { label: "휴직중", color: "warning" as const };
      case "RESIGNED":
        return { label: "퇴사", color: "gray" as const };
      default:
        return { label: status, color: "gray" as const };
    }
  };

  return (
    <>
      <Table aria-label="직원 목록" sortDescriptor={sortDescriptor} onSortChange={setSortDescriptor}>
        <Table.Header>
          <Table.Head id="name" label="이름" isRowHeader allowsSorting />
          <Table.Head id="status" label="상태" allowsSorting />
          <Table.Head id="position" label="직함" allowsSorting />
          <Table.Head id="email" label="이메일" allowsSorting />
          <Table.Head id="departmentName" label="부서" allowsSorting />
          <Table.Head id="actions" />
        </Table.Header>

        <Table.Body items={sortedItems}>
          {(item) => {
            const statusInfo = getStatusInfo(item.status);

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
                      <p className="text-sm font-medium text-primary">{item.name}</p>
                      <p className="text-xs text-tertiary">{item.employeeNumber}</p>
                    </div>
                  </div>
                </Table.Cell>

                {/* 상태 */}
                <Table.Cell>
                  <BadgeWithDot size="sm" color={statusInfo.color} type="modern">
                    {statusInfo.label}
                  </BadgeWithDot>
                </Table.Cell>

                {/* 직함 */}
                <Table.Cell className="whitespace-nowrap">{item.position}</Table.Cell>

                {/* 이메일 */}
                <Table.Cell className="whitespace-nowrap">{item.email}</Table.Cell>

                {/* 부서명 */}
                <Table.Cell>
                  {item.departmentName && (
                    <Badge color="indigo" size="sm">
                      {item.departmentName}
                    </Badge>
                  )}
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

      <div ref={loadMoreRef} className="h-4"></div>

      <div className="flex items-center justify-center text-xs text-gray-500">
        {/* <div>{errorMessage && <span className="text-red-500">{errorMessage}</span>}</div> */}
        {isLoading && <span>불러오는 중...</span>}
        {!hasNext && <span>조회 끝</span>}
      </div>
    </>
  );
};
