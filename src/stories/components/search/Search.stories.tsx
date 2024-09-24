import { StoryObj } from "@storybook/react";
import SearchTemplate from "./SearchTemplate";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components",
  component: SearchTemplate,
};

type Story = StoryObj<typeof SearchTemplate>;

export const Search: Story = {
  args: {},
};
