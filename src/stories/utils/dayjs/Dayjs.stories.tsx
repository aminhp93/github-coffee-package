import { StoryObj } from "@storybook/react";
import DayjsTemplate from "./DayjsTemplate";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Utils",
  component: DayjsTemplate,
};

type Story = StoryObj<typeof DayjsTemplate>;

export const DAYJS_FORMATTER: Story = {
  args: {},
  name: "DAYJS_FORMATTER [Deprecated]",
  tags: ["deprecated"],
};
