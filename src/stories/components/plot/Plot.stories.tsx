import * as argTypes from "./Plot.types";

import DefaultChartTemplate from "./DefaultChartTemplate";
import PlaygroundChartTemplate from "./PlaygroundChartTemplate";
import MultipleLineChartTemplate from "./MultipleLineChartTemplate";
import DefaultChartWithTableTemplate from "./DefaultChartWithTableTemplate";
import { Meta } from "@storybook/react";

import { PlotProps } from "../../../components/plot/Plot";
import MultipleSeriesNumberTypeTemplate from "./MultipleSeriesNumberTypeTemplate";
import MultipleSeriesEnumTypeTemplate from "./MultipleSeriesEnumTypeTemplate";
import DefaultChartWithToolbarTemplate from "./DefaultChartWithToolbarTemplate";
import CustomChartWithToolbarTemplate from "./CustomChartWithToolbarTemplate";
// import MultipleSeriesMixTypeTemplate from "./MultipleSeriesMixTypeTemplate";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/Plot",
  argTypes,
} as Meta<PlotProps>;

export const DefaultChart = DefaultChartTemplate.bind({});
export const PlaygroundChart = PlaygroundChartTemplate.bind({});
export const MultipleLineChart = MultipleLineChartTemplate.bind({});
export const DefaultChartWithTable = DefaultChartWithTableTemplate.bind({});
export const DefaultChartWithToolbar = DefaultChartWithToolbarTemplate.bind({});
export const MultipleSeriesNumberType = MultipleSeriesNumberTypeTemplate.bind({});
export const MultipleSeriesEnumType = MultipleSeriesEnumTypeTemplate.bind({});
export const CustomChartWithToolbar = CustomChartWithToolbarTemplate.bind({});
// export const MultipleSeriesMixType = MultipleSeriesMixTypeTemplate.bind({});

PlaygroundChart.args = {
  showTable: true,
  showToolbar: true,
};
