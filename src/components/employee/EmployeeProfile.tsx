import { useEffect, useState } from "react";
import type { EmployeeDto } from "@/model/employee";

const buildProfileUrl = (
  fileId: number | null | undefined
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
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-sm font-medium text-gray-700">
      {hasProfileImage && !imgLoadError && (
        <img
          src={buildProfileUrl(employee.profileImageId)}
          alt={`${employee.name} 프로필`}
          className="h-full w-full object-cover rounded-full"
          onError={() => setImgLoadError(true)}
        />
      )}
      {showDefaultAvatar && employee.name.charAt(0)}
    </div>
  );
};

export default EmployeeProfile;
