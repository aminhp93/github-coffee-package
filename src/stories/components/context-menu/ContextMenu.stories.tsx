import { StoryObj } from "@storybook/react";
import ContextMenuTemplate from "./ContextMenuTemplate";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components",
  component: ContextMenuTemplate,
};

type Story = StoryObj<typeof ContextMenuTemplate>;

export const ContextMenu: Story = {
  args: {},
};
