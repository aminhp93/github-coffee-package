import { StoryObj } from "@storybook/react";
import UseSearchTemplate from "./LoggerTemplate";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Utils",
  component: UseSearchTemplate,
};

type Story = StoryObj<typeof UseSearchTemplate>;

export const Log: Story = {
  args: {},
  name: "log",
};

export const ErrorLog: Story = {
  args: {},
  name: "errorLog",
};
