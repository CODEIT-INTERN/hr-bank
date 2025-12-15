import { useState } from "react";
import type { EmployeeDto } from "@/model/employee";

const buildProfileUrl = (
  fileId: number | null | undefined,
): string | undefined => {
  if (!fileId) return undefined;
  return `/api/files/${fileId}/download`;
};

interface ProfileAvatarProps {
  employee: EmployeeDto;
}

const EmployeeProfile = ({ employee }: ProfileAvatarProps) => {
  // 이미지 로드 성공 여부를 관리
  const [imgLoadError, setImgLoadError] = useState(false);
  const hasProfileImage = !!employee.profileImageId;
  // 프로필 이미지가 없거나 이미지 로드에 실패하면 기본 프로필 이미지 출력
  const showDefaultAvatar = !hasProfileImage || imgLoadError;
  return (
    <>
      {hasProfileImage && !imgLoadError && (
        <img
          src={buildProfileUrl(employee.profileImageId)}
          alt={`${employee.name} 프로필`}
          className="h-full w-full rounded-full object-cover"
          onError={() => setImgLoadError(true)}
        />
      )}
      {showDefaultAvatar && employee.name.charAt(0)}
    </>
  );
};

export default EmployeeProfile;
