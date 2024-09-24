import { Box, Stack } from "@mui/material";
import Highcharts, {
  OptionsStepValue,
  SeriesOptionsType,
} from "highcharts/highstock";
import { cloneDeep } from "lodash";
import React, { useCallback, useMemo } from "react";

import {
  filteredRowTable,
  getIdChartRange,
  getOptionsRowRemove,
  getOptionsRowSelectionModelChange,
  getValidatedOptions,
} from "../Plot.utils";
import { HoverPoints } from "../Plot";
import LineSettings from "./LineSettings";
import { PlotDataDetail } from "../Plot.types";
import { ITypeChart } from "../Plot.constants";
import { GridColDef, Table } from "../../table";
import { ColorPicker } from "../../color-picker";

type Props = {
  hoverPoints?: HoverPoints;
  series: SeriesOptionsType[];
  setOptions: React.Dispatch<React.SetStateAction<Highcharts.Options>>;
};

const ChartFooter = ({ hoverPoints, series, setOptions }: Props) => {
  const rows = useMemo(() => {
    return filteredRowTable(series, hoverPoints);
  }, [series, hoverPoints]);

  const onRowRemove = useCallback(
    (row: PlotDataDetail) => {
      setOptions((prev) => {
        const newOptions = getOptionsRowRemove(row, prev);
        return getValidatedOptions(newOptions, prev);
      });
    },
    [setOptions]
  );

  // TODO: now it is not change from step line to normal line. check later
  const onChangeStepLine = (state: boolean, idRow: string) => {
    setOptions((prev) => {
      const newOptions = {
        series: prev.series?.map((item) => {
          if (item.id === idRow) {
            if (state) {
              return {
                ...item,
                step: "center" as OptionsStepValue,
              };
            } else {
              const cloneItem = cloneDeep(item);
              if ("step" in cloneItem) {
                delete cloneItem.step;
              }
              return {
                ...cloneItem,
              };
            }
          }
          return item;
        }),
      };
      return getValidatedOptions(newOptions, prev);
    });
  };

  const onChangeChartType = useCallback(
    (state: ITypeChart, idRow: string) => {
      setOptions((prev) => {
        const newOptions = {
          series: prev.series?.map((item) => {
            const cloneItem = cloneDeep(item);
            if (cloneItem.id !== undefined) {
              const idRangeSplit = getIdChartRange(cloneItem.id);

              if (
                item.type === "arearange" &&
                (cloneItem.id === idRow || idRangeSplit === idRow)
              ) {
                cloneItem.visible = state === "line";
              }

              if (cloneItem.id === idRow) {
                return {
                  ...cloneItem,
                  type: state,
                } as Highcharts.SeriesOptionsType;
              }
            }
            return cloneItem;
          }),
        };
        return getValidatedOptions(newOptions, prev);
      });
    },
    [setOptions]
  );

  const changeColorChangeSeries = useCallback(
    (color: string, idRow: string) => {
      setOptions((prev) => {
        const newOptions = {
          series: prev.series?.map((item) => {
            let cloneItem = cloneDeep(item);
            if (cloneItem.id !== undefined) {
              const idRangeSplit = getIdChartRange(cloneItem.id);

              if (
                item.type === "arearange" &&
                (cloneItem.id === idRow || idRangeSplit === idRow)
              ) {
                cloneItem = {
                  ...cloneItem,
                  color,
                } as Highcharts.SeriesOptionsType;
              }

              if (cloneItem.id === idRow) {
                return { ...cloneItem, color } as Highcharts.SeriesOptionsType;
              }
            }
            return cloneItem;
          }),
        };
        return getValidatedOptions(newOptions, prev);
      });
    },
    [setOptions]
  );

  const COLUMNS: GridColDef[] = [
    {
      field: "name",
      headerName: "Tag Name",
      flex: 1,
      editable: false,
      renderCell: (param) => {
        const handleColorChange = (color: string) => {
          changeColorChangeSeries(color, param.row.id);
        };

        return (
          <Stack
            spacing={1}
            direction="row"
            justifyContent="start"
            alignItems="center"
          >
            <Box sx={{ width: "25px", height: "25px" }}>
              <ColorPicker
                value={param.row.color}
                variant="button"
                onChange={handleColorChange}
              />
            </Box>
            <Box>{param.value}</Box>
          </Stack>
        );
      },
    },

    {
      field: "description",
      headerName: "Description",
      flex: 1,
      editable: false,
    },

    {
      field: "avg",
      headerName: "Average",
      width: 100,
      editable: false,
      renderCell: (param) => {
        return param.row.point?.avg?.toFixed(2);
      },
    },

    {
      field: "min",
      headerName: "Min",
      width: 100,
      editable: false,
      renderCell: (param) => {
        return param.row.point?.min?.toFixed(2);
      },
    },

    {
      field: "max",
      headerName: "Max",
      width: 100,
      editable: false,
      renderCell: (param) => {
        return param.row.point?.max?.toFixed(2);
      },
    },

    {
      field: "unit",
      headerName: "Unit",
      width: 100,
      editable: false,
    },

    {
      field: "stateText",
      headerName: "State Text",
      width: 100,
      editable: false,
    },

    {
      field: "action",
      headerName: "",
      width: 100,
      editable: false,
      renderCell: (params) => {
        return (
          <Box>
            <LineSettings
              cbRemove={() => onRowRemove(params.row)}
              onChangeStepLine={(state) =>
                onChangeStepLine(state, params.row.id)
              }
              onChangeChartType={(chartType) =>
                onChangeChartType(chartType, params.row.id)
              }
            />
          </Box>
        );
      },
    },
  ];

  const handleRowSelection = (selectedRows: string[]) => {
    setOptions((prev) => {
      const newOptions = getOptionsRowSelectionModelChange(selectedRows, prev);
      return getValidatedOptions(newOptions, prev);
    });
  };

  return (
    <Table
      rowSelectionModel={rows.filter((i) => i.visible).map((i) => i.id ?? "")}
      onRowSelectionModelChange={(rowSelectionModel) => {
        handleRowSelection(rowSelectionModel as string[]);
      }}
      disableRowSelectionOnClick
      checkboxSelection
      columns={COLUMNS}
      rows={rows}
      hideFooter
      hideHeader
    />
  );
};

export default ChartFooter;
