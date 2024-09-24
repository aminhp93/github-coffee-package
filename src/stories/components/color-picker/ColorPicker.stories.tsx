import { StoryObj } from "@storybook/react";
import ColorPickerTemplate from "./ColorPickerTemplate";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components",
  component: ColorPickerTemplate,
};

type Story = StoryObj<typeof ColorPickerTemplate>;

export const ColorPicker: Story = {
  args: {},
};
