import type { Meta } from "@storybook/react";
import { SystemTree } from "@/components/system-tree";
import * as argTypes from "./SystemTree.types";
import DefaultSystemTreeTemplate from "./DefaultSystemTreeTemplate";
import DefaultSystemTreeWithPathTemplate from "./DefaultSystemTreeWithPathTemplate";

export default {
  title: "Components/SystemTree",
  component: SystemTree,
  argTypes,
} as Meta<typeof SystemTree>;

export const DefaultSystemTree = DefaultSystemTreeTemplate.bind({});
export const DefaultSystemTreeWithPath = DefaultSystemTreeWithPathTemplate.bind(
  {}
);
