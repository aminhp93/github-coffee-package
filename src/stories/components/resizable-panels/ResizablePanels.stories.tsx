import { StoryObj } from "@storybook/react";
import ResizablePanelsTemplate from "./ResizablePanelsTemplate";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components",
  component: ResizablePanelsTemplate,
};

type Story = StoryObj<typeof ResizablePanelsTemplate>;

export const ResizablePanels: Story = {
  args: {},
};
