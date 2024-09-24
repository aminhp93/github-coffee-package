import { StoryObj } from "@storybook/react";
import UseFormatDateTemplate from "./UseFormatDateTemplate";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Hooks",
  component: UseFormatDateTemplate,
};

type Story = StoryObj<typeof UseFormatDateTemplate>;

export const UseFormatDate: Story = {
  args: {},
  name: "useFormatDate (Testing)",
};
