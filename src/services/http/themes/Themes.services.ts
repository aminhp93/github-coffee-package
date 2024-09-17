import httpService from "../instance";
import { ItemTheme } from "./Themes.schema";

const ThemesUrl = {
  listThemes: (controllerId: string) =>
    `/themes/${controllerId}`,
};

export const ThemesService = {
  listViews: (controllerId: string): Promise<ItemTheme[]> => {
    return httpService({
      method: "GET",
      url: ThemesUrl.listThemes(controllerId),
    });
  },
};
