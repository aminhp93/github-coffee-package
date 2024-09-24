import { StoryObj } from "@storybook/react";
import AppTemplate from "./AppTemplate";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Configs",
  component: AppTemplate,
};

type Story = StoryObj<typeof AppTemplate>;

export const AppStory: Story = {
  args: {},
  name: "AppConfig",
};
