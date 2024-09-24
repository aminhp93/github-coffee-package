import React from "react";
import { PlotProps } from "../../../components/plot/Plot";
import { StoryFn } from "@storybook/react";
import { Box } from "@mui/material";

const PlaygroundChartTemplate: StoryFn<PlotProps> = () => {
  return (
    <Box sx={{ width: "100%", height: "calc(100vh - 40px)" }}>
      {`Now in this case it make application crash because have many re-render by mouse over event and
      update color of yAxis, It need check later`}
    </Box>
  );
};

export default PlaygroundChartTemplate;
