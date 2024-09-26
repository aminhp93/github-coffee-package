import { Meta } from "@storybook/react";
import DefaultHeaderLayoutTemplate from "./DefaultHeaderLayoutTemplate";
import DetailHeaderLayoutTemplate from "./DetailHeaderLayoutTemplate";
import { HeaderLayoutProps } from "@/components/header-layout";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/HeaderLayout",
} as Meta<HeaderLayoutProps>;

export const DefaultHeaderLayout = DefaultHeaderLayoutTemplate.bind({});
export const DetailHeaderLayout = DetailHeaderLayoutTemplate.bind({});
