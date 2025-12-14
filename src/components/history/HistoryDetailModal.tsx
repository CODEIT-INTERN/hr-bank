import { BaseModal } from "../common/modals/BaseModal";
import { AvatarLabelGroup } from "../common/avatar/AvatarLabelGroup";
import { StatusBadge } from "../common/badges/StatusBadge";
import type { HistoryDetailDto } from "@/api/history/historyApi";
import type { HistoryDto } from "@/model/history";
import { useEffect } from "react";
import { formatIsoToYmdHms } from "@/utils/date";

const TARGET_MAP = {
  hireDate: "입사일",
  name: "이름",
  position: "직함",
  department: "부서",
  email: "이메일",
  employeeNumber: "사번",
  status: "상태",
};

interface HIstoryDetailModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  history: Array<HistoryDetailDto> | [];
  historyList: HistoryDto | null;
}

const HistoryDetailModal = ({
  isOpen,
  onOpenChange,
  history,
  historyList,
}: HIstoryDetailModalProps) => {
  const handleClose = (boolean: boolean) => {
    onOpenChange(boolean);
  };

  useEffect(() => {
    console.log("History: ", historyList);
  }, [historyList]);

  if (!history) return null;

  const renderValue = (fieldName: string, value: any, isNewValue: boolean) => {
    // 값이 없거나 '-' 일 경우
    if (value === null || value === undefined || value === "-") {
      return <span>-</span>;
    }

    // fieldName이 '상태'나 '유형'일 경우 StatusBadge 사용
    if (fieldName === "status") {
      // isNewValue 여부에 따라 스타일을 다르게 줄 수 있습니다.
      // 여기서는 Badge를 사용하되, 새 값(변경 후)인 경우 굵게 표시합니다.
      return <StatusBadge kind="employment" value={value} />;
    }

    // 일반 텍스트의 경우
    return <span>{value}</span>;
  };
  //   TODO: 임시 값으로 대체 백엔드 데이터 받아와야함
  const name = "김우디";
  const profileImageId = "";
  const empNum = historyList?.employeeNumber;

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
          src={`/api/files/${profileImageId}/download`}
          alt={`프로필`}
          //   title={history.memo}
          //   src={`/api/files/${history.profileImageId}/download`}
          //   alt={`${history.name}의 프로필`}
          //   subtitle={history.employeeNumber}
          title={name}
          subtitle={empNum}
        />
        <hr className="border-border-secondary" />
        {/* 2. 유형, 일시, IP 주소 그룹 */}
        <div className="flex flex-col gap-3 mb-4 text-sm">
          {/* 유형 */}
          <div className="flex gap-1">
            <label className="text-quaternary w-14">유형</label>
            <div className="flex items-center gap-1">
              <StatusBadge kind="history" value={historyList?.type || ""} />

              {historyList?.memo && historyList?.memo.trim() !== "" && (
                <>
                  <span className="text-gray-400 whitespace-nowrap">•</span>
                  <span className="text-primary-900 whitespace-nowrap">
                    {historyList?.memo}
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
              {formatIsoToYmdHms(historyList?.at || "")}
            </p>
          </div>
          {/* IP 주소 */}
          <div className="flex gap-1">
            <label className="text-quaternary w-14">IP 주소</label>
            <p className="text-gray-900 whitespace-nowrap">
              {historyList?.ipAddress}
            </p>
          </div>
          <hr className="border-border-secondary" />
        </div>
        {/* 변경 상세 내용 컨테이너 (테이블) */}
        <div className="flex flex-col w-full rounded-xl pt-3 gap-2 border border-border-secondary">
          <h2 className="font-semibold text-md px-5">변경 상세 내용</h2>
          {history.length > 0 ? (
            // 데이터 있으면
            <div className="flex flex-col gap-5 p-5">
              {/* 테이블 헤더 */}
              <div className="flex text-sm text-left text-quaternary items-center justify-end gap-5">
                <div className="w-1/5" />
                <div className="w-2/5">변경 전</div>
                <div className="w-2/5">변경 후</div>
              </div>
              {/* 테이블 바디 */}
              {history.map((diff, index) => (
                <div
                  key={index}
                  className="flex text-sm text-left items-center gap-5"
                >
                  <div className="text-quaternary w-1/5">
                    {TARGET_MAP[diff.propertyName]}
                  </div>
                  <div className="w-2/5">
                    {renderValue(diff.propertyName, diff.before, false)}
                  </div>
                  <div className="w-2/5">
                    {renderValue(diff.propertyName, diff.after, true)}
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

export default HistoryDetailModal;
