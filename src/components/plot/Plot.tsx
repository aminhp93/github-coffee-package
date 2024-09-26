import HighchartsReact from "highcharts-react-official";
import hcMore from "highcharts/highcharts-more";
import Highcharts from "highcharts/highstock";

import { Box, BoxProps } from "@mui/material";
import ExportData from "highcharts/modules/export-data";
import Exporting from "highcharts/modules/exporting";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { TimeConfig } from "../date-time-picker/types";
import { HeaderLayoutProvider } from "../header-layout/HeaderLayout";
import { ResizablePanels } from "../resizable-panels";
import { PlotDataType } from "./Plot.types";
import { getDataHover, getValidatedOptions } from "./Plot.utils";
import ChartFooter from "./footer";
import ChartHeader from "./header";
import { styled } from "@/theme";

const TOOLBAR_HEIGHT = 56;

if (typeof Highcharts === "object") {
  hcMore(Highcharts);
  Exporting(Highcharts);
  ExportData(Highcharts);
}

export type HoverPoints = {
  [key: string]: {
    avg?: number;
    max?: number;
    min?: number;
  };
};

export type ToolbarProps = {
  onTimeChange?: (from?: TimeConfig, to?: TimeConfig) => void;
  hideTimeRange?: boolean;
  components?: { [key: string]: React.JSX.Element };
  componentsProps?: { [key: string]: React.JSX.Element };
};

export type PlotProps = {
  showTable?: boolean;
  showToolbar?: boolean;
  options: Highcharts.Options;
  toolbarProps?: ToolbarProps;
};

export type PlotType = keyof typeof PlotDataType;

const Plot = ({
  options,
  showTable = false,
  showToolbar = false,
  toolbarProps,
  ...props
}: PlotProps) => {
  const [hoverPoints, setHoverPoints] = useState<HoverPoints>();
  const [optionsPlot, setOptionsPlot] = useState<Highcharts.Options>(options);
  const [dataType, setDataType] = useState<PlotType>(PlotDataType.CHART);
  const chartRef = useRef<HighchartsReact.RefObject>(null);
  useEffect(() => {
    setOptionsPlot(options);
  }, [options]);

  useEffect(() => {
    if (showTable) {
      setOptionsPlot((prev) => {
        if (!prev) return prev;
        const newOptions = {
          plotOptions: {
            series: {
              point: {
                events: {
                  mouseOver: function () {
                    if (options.series) {
                      setHoverPoints(getDataHover(options.series, this.x));
                    }

                    // // Highlight the hovered series
                    // const hoveredYAxisIndex = this.series.yAxis.options.id;
                    // this.series.chart.yAxis.forEach((yAxis) => {
                    //   if (yAxis.options.id !== hoveredYAxisIndex) {
                    //     yAxis.update({
                    //       labels: {
                    //         style: {
                    //           color: SEMI_TRANSPARENT,
                    //         },
                    //       },
                    //     });
                    //   }
                    // });
                  },
                  // mouseOut: function () {
                  //   this.series.chart.yAxis.forEach((yAxis, i) => {
                  //     yAxis.update({
                  //       labels: {
                  //         style: {
                  //           color: DEFAULT_CHART_COLOR[i],
                  //         },
                  //       },
                  //     });
                  //   });
                  // },
                },
              },
            },
          } as Highcharts.PlotOptions,
        };
        return getValidatedOptions(newOptions, prev);
      });
    }
  }, [showTable, options.series]);

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current.chart;
      const listYAxis = chart.yAxis;

      // Iterate over each yAxis
      if (listYAxis.every((yAxis) => yAxis.options.id?.includes("_enum"))) {
        const yAxisTickAmounts = listYAxis
          .map((yAxis) => yAxis.options.tickAmount)
          .filter(
            (tickAmount): tickAmount is number => tickAmount !== undefined
          );
        const maxTickAmount = Math.max(...yAxisTickAmounts);

        const yAxis = listYAxis.find(
          (yAxis) => yAxis.options.tickAmount === maxTickAmount
        );
        if (yAxis) {
          yAxis.update({
            gridLineWidth: 1,
          });
        }
      }
    }
  }, [chartRef]);

  const onChangePlotType = (type: PlotType) => {
    setDataType(type);
  };

  const renderChart = useCallback(() => {
    return (
      <StyledBoxContainer
        key="chart-toolbar"
        sx={{ width: "100%", height: "100%" }}
      >
        {showToolbar && (
          <ChartHeader
            dataType={dataType}
            onChangePlotType={onChangePlotType}
            chartRef={chartRef}
            {...toolbarProps}
          />
        )}
        <StyledBoxChartContainer showToolbar={showToolbar} dataType={dataType}>
          {/* {dataType === PlotDataType.TABLE && <DataTable data={optionsPlot.series} />} */}
          {/* {dataType === PlotDataType.CHART && ( */}
          <HighchartsReact
            ref={chartRef}
            containerProps={{ style: { height: "100%" } }}
            highcharts={Highcharts}
            options={optionsPlot}
            allowChartUpdate={true}
            constructorType="stockChart"
            {...props}
          />
          {/* )} */}
        </StyledBoxChartContainer>
      </StyledBoxContainer>
    );
  }, [showToolbar, dataType, toolbarProps, optionsPlot, props]);

  if (!showTable || dataType === PlotDataType.TABLE) {
    return renderChart();
  }

  return (
    <ResizablePanels
      direction="vertical"
      defaultSizes={[75, 25]}
      size={[{ minSize: 50 }, { minSize: 10 }]}
      panels={[
        renderChart(),
        <Box key="chart-table" sx={{ width: "100%", height: "100%" }}>
          {optionsPlot.series && showTable && (
            <HeaderLayoutProvider>
              <ChartFooter
                series={optionsPlot.series}
                hoverPoints={hoverPoints}
                setOptions={setOptionsPlot}
              />
            </HeaderLayoutProvider>
          )}
        </Box>,
      ]}
    />
  );
};

const StyledBoxContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  backgroundColor: theme.palette.background.paper,
}));

type BoxChartContainerProps = BoxProps & {
  showToolbar?: boolean;
  dataType: PlotType;
};

const StyledBoxChartContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "showToolbar",
})<BoxChartContainerProps>(({ showToolbar, dataType }) => ({
  position: "relative",
  height: showToolbar ? `calc(100% - ${TOOLBAR_HEIGHT}px)` : "100%",
  "& .yAxis-enum-label:hover": {
    cursor: "pointer",

    "& .yAxis-enum-tooltip": {
      visibility: "visible !important",
      opacity: "1 !important",
    },
  },

  "& .yAxis-enum-tooltip": {
    backgroundColor: "#555",
    color: "#fff",
    textAlign: "center",
    padding: "5px",
    borderRadius: "3px",
    zIndex: 1,
    bottom: "100%",
    left: "50%",
    transform: "translate(-50%, -20%)",
    opacity: 0,
    transition: "opacity 0.3s",
    "&::after": {
      content: "''",
      position: "absolute",
      top: "100%",
      left: "50%",
      marginLeft: "-5px",
      borderWidth: "3px",
      borderStyle: "solid",
      borderColor: "#555 transparent transparent transparent",
    },
  },

  flex: "1 1 auto",
  "& .highcharts-container ": {
    display: dataType === PlotDataType.TABLE ? "none" : "block",
  },
  "& .highcharts-data-table": {
    width: "100%",
    display: dataType === PlotDataType.TABLE ? "block" : "none !important",
    position: dataType === PlotDataType.TABLE ? "absolute" : "positive",
    top: "0",
    maxHeight: "100%",
    overflow: "auto",
    "& .highcharts-table-caption": {
      display: "none",
    },
    "& table": {
      borderCollapse: "collapse",
      borderSpacing: 0,
      background: "white",
      minWidth: "100%",
      marginTop: "10px",
      fontFamily: "sans-serif",
      fontSize: "0.9em",
    },
    "& td, & th, & caption": {
      border: "1px solid silver",
      padding: "0.5em",
    },
    "& tr:nth-child(even), & thead tr": {
      background: "#f8f8f8",
    },
    // "& thead": {
    //   border: "1px solid silver",
    //   position: "sticky",
    //   top: 0,
    //   zIndex: 1,
    // },
    "& tr": {
      cursor: "pointer",
    },
    "& tr:hover": {
      background: "#eff",
    },
    "& caption": {
      borderBottom: "none",
      fontSize: "1.1em",
      fontWeight: "bold",
    },
    "& th": {
      minWidth: "200px",
    },
    "& .highcharts-sort-ascending::after": {
      content: "' ↓'",
    },
    "& .highcharts-sort-descending::after": {
      content: "' ↑'",
    },
  },
}));

export { Plot };
