import apiClient from "../client";

export const getFiles = (id: number): Promise<File> => {
  return apiClient.get<File>(`files/${id}/download`);
};
