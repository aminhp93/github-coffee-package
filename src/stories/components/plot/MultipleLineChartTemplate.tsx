import React from "react";
import {
  FAKE_DATA,
  getDefaultOption,
} from "../../../components/plot/Plot.constants";
import { getOptionsFromData } from "../../../components/plot/Plot.utils";
import { Plot } from "../../../components/plot/Plot";
import { Box } from "@mui/material";

const DEFAULT_OPTION = {
  ...getDefaultOption(),
  ...getOptionsFromData([
    FAKE_DATA[0],
    FAKE_DATA[1],
    FAKE_DATA[2],
    FAKE_DATA[3],
  ]),
};

const MultipleLineChartTemplate = () => {
  return (
    <Box sx={{ width: "100%", height: "calc(100vh - 40px)" }}>
      <Plot options={DEFAULT_OPTION} />
    </Box>
  );
};

export default MultipleLineChartTemplate;
