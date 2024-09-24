import React from "react";
import {
  FAKE_DATA,
  getDefaultOption,
} from "../../../components/plot/Plot.constants";
import { getOptionsFromData } from "../../../components/plot/Plot.utils";
import { Plot } from "../../../components/plot/Plot";
import { Box } from "@mui/material";
import { HeaderLayoutProvider } from "../../../components/header-layout/HeaderLayout";

const DEFAULT_OPTION = {
  ...getDefaultOption(),
  ...getOptionsFromData([FAKE_DATA[0], FAKE_DATA[1]]),
};

const DefaultChartWithTableTemplate = () => {
  return (
    <HeaderLayoutProvider>
      <Box sx={{ width: "100%", height: "calc(100vh - 40px)" }}>
        <Plot options={DEFAULT_OPTION} showToolbar />
      </Box>
    </HeaderLayoutProvider>
  );
};

export default DefaultChartWithTableTemplate;
