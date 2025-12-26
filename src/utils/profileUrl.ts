export const buildProfileUrl = (
  fileId: number | null | undefined,
): string | undefined => {
  if (!fileId) return undefined;

  const productionUrl = import.meta.env.VITE_APP_API_URL;

  if (productionUrl) {
    const baseUrl = productionUrl.endsWith("/")
      ? productionUrl.slice(0, -1)
      : productionUrl;
    return `${baseUrl}/api/files/${fileId}/download`;
  }

  return `/api/files/${fileId}/download`;
};
