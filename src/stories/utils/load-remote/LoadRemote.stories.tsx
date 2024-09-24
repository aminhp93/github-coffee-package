import { StoryObj } from "@storybook/react";
import LoadRemoteTemplate from "./LoadRemoteTemplate";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Utils",
  component: LoadRemoteTemplate,
};

type Story = StoryObj<typeof LoadRemoteTemplate>;

export const LoadRemoteModule: Story = {
  args: {},
  name: "loadRemoteModule",
};
