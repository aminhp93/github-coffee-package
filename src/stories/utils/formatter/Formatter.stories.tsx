import { StoryObj } from "@storybook/react";
import FormatterTemplate from "./FormatterTemplate";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Utils",
  component: FormatterTemplate,
};

type Story = StoryObj<typeof FormatterTemplate>;

export const Dayjs: Story = {
  args: {},
  name: "dayjs",
};
