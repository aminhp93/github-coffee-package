import { StoryObj } from "@storybook/react";
import UseFileExportTemplate from "./UseFileExportTemplate";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Hooks",
  component: UseFileExportTemplate,
};

type Story = StoryObj<typeof UseFileExportTemplate>;

export const UseFileExport: Story = {
  args: {},
  name: "useFileExport",
};
