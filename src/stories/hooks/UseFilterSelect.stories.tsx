import { StoryObj } from "@storybook/react";
import UseFilterSelectTemplate from "./UseFilterSelectTemplate";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Hooks",
  component: UseFilterSelectTemplate,
};

type Story = StoryObj<typeof UseFilterSelectTemplate>;

export const UseFilterSelect: Story = {
  args: {},
  name: "useFilterSelect",
};
