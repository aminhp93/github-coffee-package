import { StoryObj } from "@storybook/react";
import CopyButtonTemplate from "./CopyButtonTemplate";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components",
  component: CopyButtonTemplate,
};

type Story = StoryObj<typeof CopyButtonTemplate>;

export const CopyButton: Story = {
  args: {},
};
