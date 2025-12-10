import { useEffect, useMemo, useState } from "react";
import { Table } from "../common/table/Table";
import type { SortDescriptor } from "react-aria-components";
import { sortByDescriptor } from "@/utils/sort";
import { Button } from "../common/buttons/Button";
import { SearchMd } from "@untitledui/icons";
import { StatusBadge } from "../common/badges/StatusBadge";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { formatIsoToYmdHms } from "@/utils/date";
import type { HistoryDto } from "@/model/history";
import { useHistoryListStore } from "@/store/historyStore";
import HIstoryDetailModal from "./HIstoryDetailModal";
import {
  getChangeLogDetails,
  type HistoryDetailDto,
} from "@/api/history/historyApi";

const HistoryTable = () => {
  const {
    items,
    isLoading,
    errorMessage,
    hasNext,
    nextCursor,
    filters,
    totalElements,
    loadFirstPage,
    loadNextPage,
  } = useHistoryListStore();
  const [selectedHistory, setSelectedHistory] =
    useState<HistoryDetailDto | null>(null);
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "at",
    direction: "descending",
  });

  useEffect(() => {
    loadFirstPage();
  }, [loadFirstPage, filters]);

  const sortedItems = useMemo(() => {
    return sortByDescriptor<HistoryDto>(items, sortDescriptor);
  }, [items, sortDescriptor]);

  const { loadMoreRef } = useInfiniteScroll({
    hasNext,
    isLoading,
    onLoadMore: loadNextPage,
    rootMargin: "0px 0px 200px 0px",
  });

  const handleOpenDetailModal = async (historyId: number) => {
    try {
      const detailData = await getChangeLogDetails({ id: historyId });

      setSelectedHistory(detailData);
      setDetailModalOpen(true);
    } catch (error) {
      console.error("상세 이력을 불러오는 데 실패했습니다", error);
    }
  };

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* 테이블 영역 - 가로 스크롤 적용 */}
      <div className="overflow-auto flex-1 border border-border-secondary rounded-2xl">
        {" "}
        <Table
          aria-label="직원 수정 이력 목록"
          sortDescriptor={sortDescriptor}
          onSortChange={setSortDescriptor}
        >
          <Table.Header>
            <Table.Head id="type" label="유형" className="w-32" isRowHeader />
            <Table.Head id="name" label="이름" className="w-24" />
            <Table.Head id="employeeNumber" label="사원번호" className="w-64" />
            {/* <Table.Head id="employeeNumber" label="사원번호" /> */}
            <Table.Head id="memo" label="변경상세내용" />
            <Table.Head
              id="ipAddress"
              label="IP주소"
              className="w-48"
              allowsSorting
            />
            <Table.Head id="at" label="수정일" className="w-56" allowsSorting />
            <Table.Head id="actions" className="w-20" />
          </Table.Header>
          <Table.Body items={sortedItems}>
            {(item: HistoryDto) => {
              return (
                <Table.Row id={item.id} key={item.id}>
                  {/* 유형 */}
                  <Table.Cell>
                    <StatusBadge kind="history" value={item.type} />
                  </Table.Cell>

                  {/* 이름 */}
                  <Table.Cell className="whitespace-nowrap">이름</Table.Cell>

                  {/* 사원번호 */}
                  <Table.Cell className="whitespace-nowrap">
                    {item.employeeNumber}
                  </Table.Cell>

                  {/* 변경상세내용 */}
                  <Table.Cell className="whitespace-nowrap w-full">
                    {item.memo}
                  </Table.Cell>

                  {/* IP주소 */}
                  <Table.Cell className="whitespace-nowrap">
                    {item.ipAddress}
                  </Table.Cell>

                  {/* 수정일 */}
                  <Table.Cell className="whitespace-nowrap">
                    {formatIsoToYmdHms(item.at)}
                  </Table.Cell>

                  {/* 액션 버튼 */}
                  <Table.Cell className="px-4 flex justify-center">
                    <Button
                      color="tertiary"
                      iconLeading={SearchMd}
                      onClick={() => handleOpenDetailModal(item.id)}
                    />
                  </Table.Cell>
                </Table.Row>
              );
            }}
          </Table.Body>
        </Table>
        <div ref={loadMoreRef} />
        <HIstoryDetailModal
          history={selectedHistory}
          isOpen={isDetailModalOpen}
          onOpenChange={setDetailModalOpen}
        />
        {!isLoading && sortedItems.length === 0 && (
          <div className="flex justify-center items-center h-48 text-gray-500">
            현재 표시할 이력이 없습니다
          </div>
        )}
        <div className="flex items-center justify-center text-xs text-gray-500">
          {/* TODO: 데이터 없을 때, 에러처리, 로딩상태 */}
          {/* <div>{errorMessage && <span className="text-red-500">{errorMessage}</span>}</div> */}
          {/* {isLoading && <span>불러오는 중...</span>} */}
        </div>
      </div>
    </div>
  );
};

export default HistoryTable;
