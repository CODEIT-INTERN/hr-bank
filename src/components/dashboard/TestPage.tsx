import { useState } from "react";
import { Input } from "../common/input/input";
import { SearchLg } from "@untitledui/icons";
import { TextArea } from "../common/input/text-area";
import { BaseModal } from "../common/modals/BaseModal";
import { Button } from "../common/buttons/button";

// TODO: 배포 이후 삭제
// 인풋 테스트 페이지
export default function TestPage() {
  const [isOpen, setIsOpen] = useState(false);
  console.log("Modal isOpen:", isOpen); // 디버깅용
  const [error, setError] = useState(false);
  const [emailHint, setEmailHint] = useState("");
  const [textAreaHint, setTextAreaHint] = useState("");

  const onButtonToggle = () => {
    setError((prev) => !prev);
    if (error) {
      setEmailHint("");
      setTextAreaHint("");
      return;
    }
    setEmailHint("이미 존재하는 이메일이에요");
    setTextAreaHint("This is an error message");
  };

  return (
    <div className="p-4 space-y-4">
      <h1>Input test page</h1>
      <Input
        wrapperClassName="w-80"
        placeholder="Search"
        isRequired
        icon={SearchLg}
      />
      <button className="bg-red-500 text-white p-2" onClick={onButtonToggle}>
        Error Toggle
      </button>

      <Input
        wrapperClassName="w-80"
        label="Email"
        placeholder="olivia@gmail.com"
        isRequired
        isInvalid={error}
        hint={emailHint}
      />
      <TextArea
        isRequired
        placeholder="This is a placeholder."
        label="Description"
        hint="This is a hint text to help user."
        rows={5}
      />
      <TextArea
        isRequired
        isInvalid={error}
        placeholder="This is a placeholder."
        label="Description"
        hint={textAreaHint}
        rows={5}
      />
      <button
        className="bg-blue-500 text-white p-2"
        onClick={() => setIsOpen(true)}
      >
        Open Modal
      </button>

      <BaseModal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title="새 항목 만들기"
        footer={
          <>
            <Button>취소</Button>
            <Button>확인</Button>
          </>
        }
      >
        <Input
          label="부서명"
          placeholder="부서명을 입력해주세요"
          isRequired
          isInvalid={error}
          hint={emailHint}
        />
        <TextArea
          isRequired
          isInvalid={error}
          placeholder="This is a placeholder."
          label="Description"
          hint={textAreaHint}
          rows={5}
        />
      </BaseModal>
    </div>
  );
}
