import { StoryObj } from "@storybook/react";
import UseNetworkTemplate from "./UseNetworkTemplate";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Hooks",
  component: UseNetworkTemplate,
};

type Story = StoryObj<typeof UseNetworkTemplate>;

export const UseNetwork: Story = {
  args: {},
  name: "useNetwork",
};
