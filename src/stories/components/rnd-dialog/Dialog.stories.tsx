import type { Meta } from "@storybook/react";

import DialogTemplate from "./DialogTemplate";
// import * as argTypes from "./Dialog.types";
import { RndDialog as RndDialogComp } from "@/components/rnd-dialog";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components",
  component: RndDialogComp,
  // argTypes,
} as Meta<typeof RndDialogComp>;

export const RndDialog = DialogTemplate.bind({});
