import { Box } from "@mui/material";
import React from "react";
import {
  FAKE_DATA,
  getDefaultOption,
} from "../../../components/plot/Plot.constants";
import { getOptionsFromData } from "../../../components/plot/Plot.utils";
import { Plot } from "../../../components/plot/Plot";

const DEFAULT_OPTION = {
  ...getDefaultOption(),
  ...getOptionsFromData([FAKE_DATA[3], FAKE_DATA[4]]),
};

const MutipleSeriesNumberType = () => {
  return (
    <Box sx={{ width: "100%", height: "calc(100vh - 40px)" }}>
      <Plot options={DEFAULT_OPTION} />
    </Box>
  );
};

export default MutipleSeriesNumberType;
