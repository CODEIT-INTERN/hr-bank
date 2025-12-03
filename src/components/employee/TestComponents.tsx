import { XClose, Plus } from "@untitledui/icons";
import { useState } from "react";
import { Button } from "../common/buttons/button";

// TODO : 페이지 구현 후 삭제
const TestComponents = () => {
  const [isLoading, setIsLoading] = useState(false);

  const getLoading = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-3">
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
    </div>
  );
};

export default TestComponents;
