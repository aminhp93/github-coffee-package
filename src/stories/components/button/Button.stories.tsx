import ButtonTemplate from "./ButtonTemplate";
import CommonUsageButtonTemplate from "./CommonUsageButtonTemplate";
import * as argTypes from "./Button.types";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/Button",
  argTypes,
};

export const Button = ButtonTemplate.bind({});
export const CommonUsageButton = CommonUsageButtonTemplate.bind({});
