import { StoryObj } from "@storybook/react";
import TranslationTemplate from "./TranslationTemplate";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Utils",
  component: TranslationTemplate,
};

type Story = StoryObj<typeof TranslationTemplate>;

export const I18n: Story = {
  args: {},
  name: "i18n",
};

export const UseTranslation: Story = {
  args: {},
  name: "useTranslation",
};
