import { Table } from "@/components/common/table/Table";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import type { BackupDto } from "@/model/backup";
import { useBackupListStore } from "@/store/backupStore";
import { formatIsoToYmdHms } from "@/utils/date";
import { sortByDescriptor } from "@/utils/sort";
import { useMemo, useState } from "react";
import type { SortDescriptor } from "react-aria-components";
import { StatusBadge } from "../common/badges/StatusBadge";

export function BackupTable() {
  const { items, isLoading, errorMessage, hasNext, loadNextPage } = useBackupListStore();

  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "startedAt",
    direction: "descending",
  });

  // 무한 스크롤 유틸
  const { loadMoreRef } = useInfiniteScroll({
    hasNext,
    isLoading,
    onLoadMore: loadNextPage,
    rootMargin: "0px 0px 200px 0px",
  });

  // 아이템 정렬
  const sortedItems = useMemo(() => {
    return sortByDescriptor<BackupDto>(items, sortDescriptor);
  }, [items, sortDescriptor]);

  return (
    <div className="h-[692px] overflow-y-auto border border-border-secondary rounded-2xl">
      <Table aria-label="백업 목록" sortDescriptor={sortDescriptor} onSortChange={setSortDescriptor}>
        <Table.Header>
          <Table.Head id="fileId" label="ID" isRowHeader allowsSorting />
          <Table.Head id="worker" label="작업자" allowsSorting />
          <Table.Head id="startedAt" label="시작시간" allowsSorting />
          <Table.Head id="endedAt" label="종료시간" allowsSorting />
          <Table.Head id="status" label="작업상태" />
        </Table.Header>

        <Table.Body items={sortedItems}>
          {(item) => (
            <Table.Row id={item.id} key={item.id}>
              <Table.Cell>{item.fileId}</Table.Cell>
              <Table.Cell>{item.worker}</Table.Cell>
              <Table.Cell>{formatIsoToYmdHms(item.startedAt)}</Table.Cell>
              <Table.Cell>{formatIsoToYmdHms(item.endedAt)}</Table.Cell>
              <Table.Cell>
                <StatusBadge kind="backup" value={item.status} />
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>

      <div ref={loadMoreRef} className="h-4" />

      <div className="flex items-center justify-center text-center text-sm text-gray-600">
        <div>{errorMessage && <span>{errorMessage}</span>}</div>
        <div>{isLoading && <span>불러오는 중...</span>}</div>
      </div>
    </div>
  );
}
