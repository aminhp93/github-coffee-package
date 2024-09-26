import React from "react";
import { getDefaultOption } from "@/components/plot/Plot.constants";
import { getOptionsFromData } from "@/components/plot/Plot.utils";
import { PlotDataDetail } from "@/components/plot/Plot.types";
import { Plot } from "@/components/plot/Plot";
import {
  ServerCpuUsage,
  ServerMemoryUsage,
  totalAlarmCount,
  AlarmManager_SYS_mqttEvents,
} from "@/components/plot/mockData";
import { Box } from "@mui/material";
import { log } from "@/utils/logger";

const DEFAULT_OPTION = {
  ...getDefaultOption(),
  ...getOptionsFromData([
    {
      ...ServerCpuUsage,
      data: ServerCpuUsage.data["1d"],
    } as PlotDataDetail,
  ]),
};

const DefaultChartTemplate = () => {
  log("ServerCpuUsage", {
    ServerCpuUsage,
    ServerMemoryUsage,
    totalAlarmCount,
    AlarmManager_SYS_mqttEvents,
  });
  return (
    <Box sx={{ width: "100%", height: "calc(100vh - 40px)" }}>
      <Plot options={DEFAULT_OPTION} />
    </Box>
  );
};

export default DefaultChartTemplate;
