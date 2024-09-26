// Import libaries
import {
  AspectRatio,
  MoreVert,
  Refresh,
  Timeline,
  TableChart,
} from "@mui/icons-material";
import {
  Box,
  IconButton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import React from "react";
import HighchartsReact from "highcharts-react-official";

// Import local files
import { CustomDateTimePicker } from "@/components/date-time-picker";
import { PlotType, ToolbarProps } from "@/components/plot";
import ExportButton, { ExportType } from "./ExportButton";
import { PlotDataType } from "../Plot.types";
import { styled } from "@/theme";

type Props = {
  chartRef: React.RefObject<HighchartsReact.RefObject>;
  dataType: PlotType;
  onChangePlotType: (type: PlotType) => void;
} & ToolbarProps;

const ChartHeader = ({
  chartRef,
  // onTimeChange,
  hideTimeRange,
  components,
  componentsProps,
  dataType,
  onChangePlotType,
}: Props) => {
  // const onChartTimeChange = (data: { from?: TimeConfig; to?: TimeConfig }) => {
  //   onTimeChange && onTimeChange(data.from, data.to);
  // };

  const handleFullScreen = () => {
    chartRef.current?.chart?.fullscreen?.toggle();
  };

  const handelExport = (type: ExportType) => {
    if (type === "csv") {
      chartRef.current?.chart.downloadCSV();
    }
    if (type === "png") {
      chartRef.current?.chart.exportChart({}, {});
    }
  };

  const extendedComponent = Object.keys(components || {}).map((key) => {
    const component = components?.[key] as React.JSX.Element;
    if (componentsProps?.[key]) {
      return React.cloneElement(component, { ...componentsProps?.[key], key });
    } else {
      return React.cloneElement(component, { key });
    }
  });

  const resetZoom = () => {
    chartRef.current?.chart?.zoomOut();
  };

  const handlePlotType = (_: React.MouseEvent<HTMLElement>, type: PlotType) => {
    if (type === null) return;
    onChangePlotType(type);
  };

  return (
    <StyledStackContainer
      spacing={1}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      {!hideTimeRange && (
        <StyledTimePickerContainer>
          {/* <DoubleDateTimePicker onChange={onChartTimeChange} /> */}
          <CustomDateTimePicker />
        </StyledTimePickerContainer>
      )}

      <Stack spacing={1.5} direction="row" alignItems="center">
        <>{extendedComponent}</>

        <StyledToggleButtonGroup
          value={dataType}
          exclusive
          onChange={handlePlotType}
          size="small"
        >
          <ToggleButton value={PlotDataType.CHART}>
            <Timeline />
          </ToggleButton>
          <ToggleButton value={PlotDataType.TABLE}>
            <TableChart />
          </ToggleButton>
        </StyledToggleButtonGroup>

        <IconButton size="small" onClick={handleFullScreen}>
          <AspectRatio />
        </IconButton>
        <IconButton size="small" onClick={resetZoom}>
          <Refresh />
        </IconButton>

        <ExportButton onExport={handelExport} />

        <IconButton size="small">
          <MoreVert />
        </IconButton>
      </Stack>
    </StyledStackContainer>
  );
};

export default ChartHeader;

const StyledStackContainer = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(0, 4),
  margin: theme.spacing(4, 0),
  "& .MuiBox-root .MuiStack-root": {
    padding: "0px",
  },
}));

const StyledTimePickerContainer = styled(Box)(() => ({
  marginRight: "auto",
}));

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& button.Mui-selected": {
    backgroundColor: theme.palette.extendedColors.primary.lightBackground,
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.extendedColors.primary.border}`,
    ":hover": {
      backgroundColor: theme.palette.extendedColors.primary.lightBackground,
    },
  },
  "& button:hover": {
    backgroundColor: theme.palette.extendedColors.primary.lightBackground,
  },
}));
