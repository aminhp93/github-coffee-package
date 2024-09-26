import { GridColDef } from "@/components/table";
import { TFunction } from "@/utils/translation/i18n";

export const fakeData = () => {
  const res = [];
  for (let i = 0; i < 5; i++) {
    res.push({
      id: i,
      name:
        "name  [webpack-dev-middleware] wait until bundle finished: /runtime_main.2bbc206750dc88a9b748.hot-update.json" +
        i,
      description:
        "description Auto-size the columns of the grid based on the cells' content and the space available." +
        i,
      dataType: "string",
      alarmSettings: {
        active: 1,
      },
    });
  }
  return res;
};

export const MEDIUM_COLUMNS = (t: TFunction) => [
  {
    field: "name",
    headerName: t("name"),
    width: 500,
  },
  {
    field: "description",
    headerName: t("description"),
    width: 400,
  },
  {
    field: "dataType",
    headerName: t("dataType"),
    width: 500,
  },
];

export const SMALL_COLUMNS = (t: TFunction): GridColDef[] => [
  {
    field: "name",
    headerName: t("name"),
    flex: 1,
    minWidth: 350,
  },
  {
    field: "description",
    headerName: t("description"),
    width: 400,
  },
  {
    field: "dataType",
    headerName: t("dataType"),
    width: 500,
  },
];
