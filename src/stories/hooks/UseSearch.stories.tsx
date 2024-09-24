import { StoryObj } from "@storybook/react";
import UseSearchTemplate from "./UseSearchTemplate";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Hooks",
  component: UseSearchTemplate,
};

type Story = StoryObj<typeof UseSearchTemplate>;

export const UseSearch: Story = {
  args: {},
  name: "useSearch",
};
