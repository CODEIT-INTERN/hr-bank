import { useState } from "react";
import { Input } from "../common/input/Input";
import { SearchLg } from "@untitledui/icons";
import { TextArea } from "../common/input/TextArea";
import { BaseModal } from "../common/modals/BaseModal";
import { Button } from "../common/buttons/button";

// TODO: 배포 이후 삭제
// 인풋 테스트 페이지
export default function TestPage() {
  const [isOpen, setIsOpen] = useState(false);

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
        title="부서 추가하기"
        footer={
          <>
            <Button color="secondary" className="w-full">
              취소
            </Button>
            <Button color="primary" className="w-full">
              등록하기
            </Button>
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
