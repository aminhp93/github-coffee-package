import { useCallback } from "react";

/**
 * Hook for exporting file
 */
export function useFileExport() {
  const handleExportFile = useCallback((fileName: string, content: unknown) => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(content)
    )}`;

    const link = document.createElement("a");
    link.href = jsonString;
    link.download = fileName;

    link.click();
  }, []);

  return {
    handleExportFile,
  };
}
