import React from "react";
import { FAKE_DATA, getDefaultOption } from "@/components/plot/Plot.constants";
import { getOptionsFromData } from "@/components/plot/Plot.utils";
import { Plot } from "@/components/plot/Plot";
import { Box } from "@mui/material";

const DEFAULT_OPTION = {
  ...getDefaultOption(),
  ...getOptionsFromData([FAKE_DATA[0]]),
};

const DefaultChartWithTableTemplate = () => {
  return (
    <Box sx={{ width: "100%", height: "calc(100vh - 40px)" }}>
      <Plot
        options={DEFAULT_OPTION}
        showToolbar
        toolbarProps={{
          components: {
            timeRange: <div>{`Time Range`}</div>,
            export: <div>{`Export`}</div>,
          },
        }}
      />
    </Box>
  );
};

export default DefaultChartWithTableTemplate;
