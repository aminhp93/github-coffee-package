import { useMemo } from "react";
import useSWR, { SWRConfiguration } from "swr";
import { useNetwork } from "../../../hooks/useNetwork";
import { ThemesService } from "./Themes.services";
import { ListItemThemeSchema } from "./Themes.schema";
import { errorLog } from "../../../utils/logger";

export const useListThemes = (config?: SWRConfiguration) => {
  const { controllerId } = useNetwork();
  const { data, ...others } = useSWR(
    `list-themes`,
    () => ThemesService.listViews(controllerId),
    config
  );

  const parsedData = useMemo(() => {
    if (others.isLoading) return undefined;
    try {
      return ListItemThemeSchema.parse(data);
    } catch (error) {
      errorLog("Error while parsing data", error);
      return undefined;
    }
  }, [data, others.isLoading]);

  return {
    data: parsedData,
    ...others,
  };
};
