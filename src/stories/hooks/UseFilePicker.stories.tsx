import { StoryObj } from "@storybook/react";
import UseFilePickerTemplate from "./UseFilePickerTemplate";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Hooks",
  component: UseFilePickerTemplate,
};

type Story = StoryObj<typeof UseFilePickerTemplate>;

export const UseFilePicker: Story = {
  args: {},
  name: "useFilePicker",
};
