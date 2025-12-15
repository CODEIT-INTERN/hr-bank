import { useEffect, useMemo, useState } from "react";
import type { SortDescriptor } from "react-aria-components";
import { SearchMd } from "@untitledui/icons";
import {
  getChangeLogDetails,
  type HistoryDetailDto,
} from "@/api/history/historyApi";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import type { HistoryDto } from "@/model/history";
import { useHistoryListStore } from "@/store/historyStore";
import { formatIsoToYmdHms } from "@/utils/date";
import { isActiveSortColumn, sortByDescriptor } from "@/utils/sort";
import { StatusBadge } from "../common/badges/StatusBadge";
import { Button } from "../common/buttons/Button";
import { Table } from "../common/table/Table";
import HistoryDetailModal from "./HistoryDetailModal";

const HistoryTable = () => {
  const { items, isLoading, hasNext, filters, loadFirstPage, loadNextPage } =
    useHistoryListStore();
  const [selectedHistory, setSelectedHistory] =
    useState<Array<HistoryDetailDto> | null>(null);
  const [selectedHistoryList, setSelectedHistoryList] =
    useState<HistoryDto | null>(null);
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

  const handleOpenDetailModal = async (history: HistoryDto) => {
    try {
      const detailData = await getChangeLogDetails({ id: history.id });

      setSelectedHistory(detailData);
      setSelectedHistoryList(history);
      setDetailModalOpen(true);
    } catch (error) {
      console.error("상세 이력을 불러오는 데 실패했습니다", error);
    }
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* 테이블 영역 - 가로 스크롤 적용 */}
      <div className="border-border-secondary flex-1 overflow-auto rounded-2xl border">
        {" "}
        <Table
          aria-label="직원 수정 이력 목록"
          sortDescriptor={sortDescriptor}
          onSortChange={setSortDescriptor}
        >
          <Table.Header>
            <Table.Head id="type" label="유형" className="w-1/12" isRowHeader />
            <Table.Head
              id="employeeNumber"
              label="사원번호"
              className="w-3/12"
            />
            <Table.Head id="memo" label="변경상세내용" className="w-3/12" />
            <Table.Head
              id="ipAddress"
              label="IP주소"
              className="w-2/12"
              allowsSorting
              isActive={isActiveSortColumn("ipAddress", sortDescriptor)}
            />
            <Table.Head
              id="at"
              label="수정일"
              className="w-2/12"
              allowsSorting
              isActive={isActiveSortColumn("at", sortDescriptor)}
            />
            <Table.Head id="actions" className="w-1/12" />
          </Table.Header>
          <Table.Body items={sortedItems}>
            {(item: HistoryDto) => {
              return (
                <Table.Row id={item.id} key={item.id}>
                  {/* 유형 */}
                  <Table.Cell className="w-1/12">
                    <StatusBadge kind="history" value={item.type} />
                  </Table.Cell>

                  {/* 사원번호 */}
                  <Table.Cell className="w-3/12 whitespace-nowrap">
                    {item.employeeNumber}
                  </Table.Cell>

                  {/* 변경상세내용 */}
                  <Table.Cell className="w-3/12 whitespace-nowrap">
                    {item.memo}
                  </Table.Cell>

                  {/* IP주소 */}
                  <Table.Cell className="w-2/12 whitespace-nowrap">
                    {item.ipAddress}
                  </Table.Cell>

                  {/* 수정일 */}
                  <Table.Cell className="w-2/12 whitespace-nowrap">
                    {formatIsoToYmdHms(item.at)}
                  </Table.Cell>

                  {/* 액션 버튼 */}
                  <Table.Cell className="flex w-1/12 justify-center px-4">
                    <Button
                      color="tertiary"
                      iconLeading={SearchMd}
                      onClick={() => handleOpenDetailModal(item)}
                    />
                  </Table.Cell>
                </Table.Row>
              );
            }}
          </Table.Body>
        </Table>
        <div ref={loadMoreRef} className="h-4" />
      </div>
      <HistoryDetailModal
        history={selectedHistory}
        historyList={selectedHistoryList}
        isOpen={isDetailModalOpen}
        onOpenChange={setDetailModalOpen}
      />
      {!isLoading && sortedItems.length === 0 && (
        <div className="flex h-48 items-center justify-center text-gray-500">
          현재 표시할 이력이 없습니다
        </div>
      )}
      <div className="flex items-center justify-center text-xs text-gray-500">
        {/* TODO: 데이터 없을 때, 에러처리, 로딩상태 */}
        {/* <div>{errorMessage && <span className="text-red-500">{errorMessage}</span>}</div> */}
        {/* {isLoading && <span>불러오는 중...</span>} */}
      </div>
    </div>
  );
};

export default HistoryTable;
