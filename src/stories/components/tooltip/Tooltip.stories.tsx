import TooltipTemplate from "./TooltipTemplate";
import * as argTypes from "./Tooltip.types";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/Tooltip",
  argTypes,
};

export const TooltipStory = TooltipTemplate.bind({});
