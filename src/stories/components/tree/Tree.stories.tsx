import type { Meta } from "@storybook/react";
import { Tree } from "../../../components/tree/Tree";
import * as argTypes from "./Tree.types";
import DefaultTreeTemplate from "./DefaultTreeTemplate";

export default {
  title: "Components/Tree",
  component: Tree,
  argTypes,
} as Meta<typeof Tree>;

export const DefaultTree = DefaultTreeTemplate.bind({});
