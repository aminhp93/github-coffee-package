import { StoryObj } from "@storybook/react";
import ItemTextContainerTemplate from "./ItemTextContainerTemplate";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components",
  component: ItemTextContainerTemplate,
};

type Story = StoryObj<typeof ItemTextContainerTemplate>;

export const ItemTextContainer: Story = {
  args: {},
};
