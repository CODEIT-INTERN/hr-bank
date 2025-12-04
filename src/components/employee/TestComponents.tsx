import { XClose, Plus } from "@untitledui/icons";
import { useEffect, useState } from "react";
import { DropdownButton } from "../common/dropdown/DropdownButton";
import { Button } from "../common/buttons/Button";
import { EmploymentStateLabels } from "@/constants/EmploymentStateLabels";
import { StatusBadge } from "../common/badges/StatusBadge";
import { employeeHistoryListMock } from "@/mocks/historyMock";
import type {
  BackupStateType,
  EmploymentStateType,
  HistoryType,
} from "@/types/enums";
import { backupListMock } from "@/mocks/backupMock";
import { employeeListMock } from "@/mocks/employeeMock";
import { departmentListMock } from "@/mocks/departmentMock";

// TODO : 페이지 구현 후 삭제
const TestComponents = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [departments, setDepartments] = useState<Record<string, string>>({});
  const getLoading = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const getDepartments = () => {
    try {
      // 실제 API 호출 대신 mock 사용
      const res = departmentListMock;

      const records: Record<string, string> = {};
      res.content.forEach((dept) => {
        // key 를 id로 쓸지 name으로 쓸지 선택 가능
        // id 기준
        records[String(dept.id)] = dept.name;

        // name 을 key/값 둘 다 쓰고 싶으면 아래로
        // records[dept.name] = dept.name;
      });

      setDepartments(records);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDepartments();
  }, []);

  return (
    <div className="flex flex-col gap-3 py-5 px-5">
      <div className="flex gap-3">
        <h1>Primary</h1>
        <Button color="primary">버튼</Button>
        <Button color="primary" isDisabled>
          버튼
        </Button>
        <Button
          color="primary"
          isLoading={isLoading}
          showTextWhileLoading
          onClick={getLoading}
        >
          {isLoading ? "등록 중..." : "등록하기"}
        </Button>
        <Button color="primary" iconLeading={<Plus data-icon color="white" />}>
          직원 등록하기
        </Button>
      </div>
      <div className="flex gap-3">
        <h1>Secondary</h1>
        <Button color="secondary">버튼</Button>
        <Button color="secondary" isDisabled>
          버튼
        </Button>
      </div>
      <div className="flex gap-3">
        <h1>Primary-destructive</h1>
        <Button color="primary-destructive">버튼</Button>
        <Button color="primary-destructive" isDisabled>
          버튼
        </Button>
        <Button
          color="primary-destructive"
          isLoading={isLoading}
          showTextWhileLoading
          onClick={getLoading}
        >
          {isLoading ? "등록 중..." : "등록하기"}
        </Button>
      </div>
      <div className="flex gap-3">
        <h1>Icon</h1>
        <Button color="tertiary" iconLeading={<XClose data-icon />} />
      </div>
      <div className="flex gap-3">
        <h1>Dropdown</h1>
        <DropdownButton
          placeholder="상태"
          label={EmploymentStateLabels}
          onChange={(value) => {
            setStatusFilter(value);
          }}
        />
        <DropdownButton
          placeholder="부서"
          label={departments || {}}
          onChange={(value) => {
            setStatusFilter(value);
          }}
        />
      </div>
      <div className="flex gap-3">
        <h1>배지</h1>
        {employeeHistoryListMock.content.map((history) => (
          <StatusBadge key={history.id} kind="history" value={history.type} />
        ))}
        {backupListMock.content.map((backup) => (
          <StatusBadge key={backup.id} kind="backup" value={backup.status} />
        ))}
        {employeeListMock.content.map((employee) => (
          <StatusBadge
            key={employee.id}
            kind="employment"
            value={employee.status}
          />
        ))}
      </div>
    </div>
  );
};

export default TestComponents;
