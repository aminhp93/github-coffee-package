import { StoryObj } from "@storybook/react";
import ProcessViewTemplate from "./ProcessViewTemplate";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Utils",
  component: ProcessViewTemplate,
};

type Story = StoryObj<typeof ProcessViewTemplate>;

export const ExtractDefaultValuesFromConfig: Story = {
  args: {},
  name: "extractDefaultValuesFromConfig",
};

export const ConfigHelper: Story = {
  args: {},
  name: "ConfigHelper",
};

export const Picker: Story = {
  args: {},
};

export const GetThemeColor: Story = {
  args: {},
  name: "getThemeColor",
};

export const GetItemStyle: Story = {
  args: {},
  name: "getItemStyle",
};

export const IsThemeColor: Story = {
  args: {},
  name: "isThemeColor",
};

export const CreateAssetsStructure: Story = {
  args: {},
  name: "createAssetsStructure",
};

export const CacheItems: Story = {
  args: {},
  name: "cacheItems",
};
