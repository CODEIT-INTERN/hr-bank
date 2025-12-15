import { useMemo, useState } from "react";
import type { SortDescriptor } from "react-aria-components";
import { Download01 } from "@untitledui/icons";
import { downloadFileById } from "@/api/file/fileApi";
import { StatusBadge } from "@/components/common/badges/StatusBadge";
import { Button } from "@/components/common/buttons/Button";
import { Table } from "@/components/common/table/Table";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";
import type { BackupDto } from "@/model/backup";
import { useBackupListStore } from "@/store/backupStore";
import { useToastStore } from "@/store/toastStore";
import { formatIsoToYmdHms } from "@/utils/date";
import { downloadBlob } from "@/utils/download";
import { sortByDescriptor } from "@/utils/sort";

export function BackupTable() {
  const { items, isLoading, errorMessage, hasNext, loadNextPage } =
    useBackupListStore();
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
      const { blob, filename } = await downloadFileById(fileId);
      downloadBlob(blob, filename);
    } catch (error) {
      console.error(error);
      errorToast("파일 다운로드 중 오류가 발생했습니다");
    }
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* 테이블 영역 - 가로 스크롤 적용 */}
      <div className="border-border-secondary scrollbar-thin flex-1 overflow-auto rounded-2xl border">
        <Table
          aria-label="백업 목록"
          sortDescriptor={sortDescriptor}
          onSortChange={setSortDescriptor}
        >
          <Table.Header>
            <Table.Head id="fileId" label="ID" isRowHeader allowsSorting />
            <Table.Head id="worker" label="작업자" allowsSorting />
            <Table.Head
              id="startedAt"
              label="시작시간"
              allowsSorting
              className="min-w-40"
            />
            <Table.Head
              id="endedAt"
              label="종료시간"
              allowsSorting
              className="min-w-40"
            />
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
                    <Button
                      color="tertiary"
                      iconLeading={Download01}
                      onClick={() => onDownload(item.fileId)}
                    />
                  )}
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>

        {hasNext && <div ref={loadMoreRef} className="h-4" />}

        {/* 메시지 영역 - 스크롤 영역 밖 */}
        <div className="flex items-center justify-center text-center text-sm text-gray-600">
          <div>{errorMessage && <span>{errorMessage}</span>}</div>
          {isLoading && <span>불러오는 중...</span>}
        </div>

        {!isLoading && sortedItems.length === 0 && (
          <div className="flex h-[calc(100%-80px)] flex-1 flex-col items-center justify-center text-center">
            <span className="text-disabled">데이터 백업 정보가 없어요</span>
          </div>
        )}
      </div>
    </div>
  );
}
