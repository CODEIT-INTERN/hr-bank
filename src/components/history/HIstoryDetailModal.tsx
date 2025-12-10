import React from "react";
import { BaseModal } from "../common/modals/BaseModal";
import type { HistoryDto, HistoryListQuery } from "@/model/history";
import { AvatarLabelGroup } from "../common/avatar/AvatarLabelGroup";
import { StatusBadge } from "../common/badges/StatusBadge";
import { HeaderContext } from "react-aria-components";
import { formatDateAsKorean } from "@/utils/date";
import type { HistoryDetailDto } from "@/api/history/historyApi";

interface HIstoryDetailModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  history: HistoryDetailDto | null;
}

const HIstoryDetailModal = ({
  isOpen,
  onOpenChange,
  history,
}: HIstoryDetailModalProps) => {
  if (!history) return null;
  const handleClose = (boolean: boolean) => {
    onOpenChange(boolean);
  };

  const renderValue = (fieldName: string, value: any, isNewValue: boolean) => {
    // 값이 없거나 '-' 일 경우
    if (value === null || value === undefined || value === "-") {
      return <span>-</span>;
    }

    // fieldName이 '상태'나 '유형'일 경우 StatusBadge 사용
    if (fieldName === "상태") {
      // isNewValue 여부에 따라 스타일을 다르게 줄 수 있습니다.
      // 여기서는 Badge를 사용하되, 새 값(변경 후)인 경우 굵게 표시합니다.
      return <StatusBadge kind="employment" value={value} />;
    }

    // 일반 텍스트의 경우
    return <span>{value}</span>;
  };
  //   TODO: 임시 값으로 대체 백엔드 데이터 받아와야함
  const name = "김우디";
  const profileImageId = "some_id";

  // TODO: 변경 상세 내용을 위한 데이터 구조 (HistoryDetailDto.diffs)가 필요합니다.
  // 현재 history에는 diffs가 없으므로 임시로 빈 배열을 사용합니다.
  const dummyDiffs = [
    // { fieldName: "입사일", before: "-", after: "2025년 9월 25일" },
    // { fieldName: "이름", before: "-", after: "우디" },
    // { fieldName: "직함", before: "-", after: "콘텐츠 프로듀서" },
    // { fieldName: "부서명", before: "-", after: "콘텐츠팀" },
    // { fieldName: "이메일", before: "-", after: "콘oody@codeit.com" },
    // { fieldName: "사번", before: "-", after: "2024001" },
    // { fieldName: "상태", before: "-", after: "ACTIVE" },
  ];

  return (
    <div>
      <BaseModal
        title="수정 이력 상세"
        isOpen={isOpen}
        onOpenChange={() => handleClose(false)}
        className="w-[600px] max-w-none"
      >
        <AvatarLabelGroup
          size="md"
          src={`/api/files/${history.memo}/download`}
          alt={`${history.memo}의 프로필`}
          //   title={history.memo}
          //   src={`/api/files/${history.profileImageId}/download`}
          //   alt={`${history.name}의 프로필`}
          //   subtitle={history.employeeNumber}
          title="김우디"
          subtitle="EMP-2025-26853992505099"
        />
        <hr className="border-border-secondary" />
        {/* 2. 유형, 일시, IP 주소 그룹 */}
        <div className="flex flex-col gap-3 mb-4 text-sm">
          {/* 유형 */}
          <div className="flex gap-1">
            <label className="text-quaternary w-14">유형</label>
            <div className="flex items-center gap-1">
              <StatusBadge kind="history" value="CREATED" />
              {/* <StatusBadge kind="history" value={history.type} /> */}
              {history.memo && history.memo.trim() !== "" && (
                <>
                  <span className="text-gray-400 whitespace-nowrap">•</span>
                  <span className="text-primary-900 whitespace-nowrap">
                    {/* {history.memo} */} 신규 직원 등록
                  </span>
                </>
              )}
            </div>
          </div>
          {/* 일시 */}
          <div className="flex gap-1">
            <label className="text-quaternary w-14">일시</label>
            <p className="text-gray-900 whitespace-nowrap">
              {/* {formatDateAsKorean(history.atFrom)} */}
              2024년 2월 19일 13:50:14
            </p>
          </div>
          {/* IP 주소 */}
          <div className="flex gap-1">
            <label className="text-quaternary w-14">IP 주소</label>
            <p className="text-gray-900 whitespace-nowrap">
              {/* {history.ipAddress} */}
              118.216.169.165
            </p>
          </div>
          <hr className="border-border-secondary" />
        </div>
        {/* 변경 상세 내용 컨테이너 (테이블) */}
        <div className="flex flex-col w-full rounded-xl pt-3 gap-2 border border-border-secondary">
          <h2 className="font-semibold text-md px-5">변경 상세 내용</h2>
          {dummyDiffs.length > 0 ? (
            // 데이터 있으면
            <div className="flex flex-col gap-5 p-5">
              {/* 테이블 헤더 */}
              <div className="flex text-sm text-left text-quaternary items-center justify-end gap-5">
                <div className="w-1/5" />
                <div className="w-2/5">변경 전</div>
                <div className="w-2/5">변경 후</div>
              </div>
              {/* 테이블 바디 */}
              {dummyDiffs.map((diff, index) => (
                <div
                  key={index}
                  className="flex text-sm text-left items-center gap-5"
                >
                  <div className="text-quaternary w-1/5">{diff.fieldName}</div>
                  <div className="w-2/5">
                    {renderValue(diff.fieldName, diff.before, false)}
                  </div>
                  <div className="w-2/5">
                    {renderValue(diff.fieldName, diff.after, true)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // 데이터 없을 경우
            <div className="py-9 text-center">
              변경 이력 상세 내용이 없습니다
            </div>
          )}{" "}
        </div>
      </BaseModal>
    </div>
  );
};

export default HIstoryDetailModal;
