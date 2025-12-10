import { useMemo, useState } from "react";

import { Table } from "@/components/common/table/Table";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import { useBackupListStore } from "@/store/backupStore";
import { formatIsoToYmdHms } from "@/utils/date";
import { sortByDescriptor } from "@/utils/sort";
import { StatusBadge } from "@/components/common/badges/StatusBadge";
import { downloadFileById } from "@/api/files/fileApi";
import { useToastStore } from "@/store/toastStore";
import { Download01 } from "@untitledui/icons";
import { Button } from "@/components/common/buttons/Button";
import type { SortDescriptor } from "react-aria-components";
import type { BackupDto } from "@/model/backup";

export function BackupTable() {
  const { items, isLoading, errorMessage, hasNext, loadNextPage } = useBackupListStore();
  const { errorToast } = useToastStore();

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

  // 파일 다운로드
  const onDownload = async (fileId: number) => {
    try {
      await downloadFileById(fileId); // ✅ 여기서 실제 다운로드 진행
    } catch (error) {
      console.error(error);
      errorToast("파일 다운로드 중 오류가 발생했습니다");
    }
  };

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* 테이블 영역 - 가로 스크롤 적용 */}
      <div className="overflow-auto flex-1 border border-border-secondary rounded-2xl">
        <Table aria-label="백업 목록" sortDescriptor={sortDescriptor} onSortChange={setSortDescriptor}>
          <Table.Header>
            <Table.Head id="fileId" label="ID" isRowHeader allowsSorting />
            <Table.Head id="worker" label="작업자" allowsSorting />
            <Table.Head id="startedAt" label="시작시간" allowsSorting className="min-w-40" />
            <Table.Head id="endedAt" label="종료시간" allowsSorting className="min-w-40" />
            <Table.Head id="status" label="작업상태" />
            <Table.Head id="actions" label="다운로드" />
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
                <Table.Cell>
                  {item.fileId && item.status === "COMPLETED" && (
                    <Button color="tertiary" iconLeading={Download01} onClick={() => onDownload(item.fileId)} />
                  )}
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>

        <div ref={loadMoreRef} className="h-4" />
      </div>

      {/* 메시지 영역 - 스크롤 영역 밖 */}
      <div className="flex items-center justify-center text-center text-sm text-gray-600 py-2">
        <div>{errorMessage && <span>{errorMessage}</span>}</div>
        <div>{isLoading && <span>불러오는 중...</span>}</div>
      </div>

      {!isLoading && sortedItems.length === 0 && (
        <div className="flex items-center justify-center text-sm text-gray-600 py-2">
          <span>데이터 백업 정보가 없어요</span>
        </div>
      )}
    </div>
  );
}
