import { GridColDef } from "@mui/x-data-grid-premium";
import Highcharts from "highcharts/highstock";
import React, { useMemo } from "react";
import { useTranslation } from "@/utils/translation";
import { Table } from "@/components/table";
type Props = {
  data: Highcharts.Options["series"];
};

const DataTable = ({ data }: Props) => {
  const { t } = useTranslation();
  const columns: GridColDef[] = useMemo(() => {
    const columnsTable: GridColDef[] = [
      { field: "time", headerName: t("time"), width: 150 },
    ];

    data?.forEach((series) => {
      const type = series.type;
      if (type === "arearange") {
        columnsTable.push({
          field: `series_max_${series.id}`,
          headerName: `${series.name} (MAX)`,
          width: 150,
          hideable: true,
        });
        columnsTable.push({
          field: `series_min_${series.id}`,
          headerName: `${series.name} (MIN)`,
          width: 150,
          hideable: true,
        });
      } else {
        columnsTable.push({
          field: `series_${series.id}`,
          headerName: `${series.name} (AVG)`,
          width: 150,
        });
      }
    });

    return columnsTable;
  }, [data, t]);

  return (
    <Table
      rows={[]}
      columns={columns}
      initialState={{
        columns: {
          columnVisibilityModel: {
            id: false,
            brokerId: false,
            status: false,
          },
        },
      }}
    />
  );
};

export default DataTable;
