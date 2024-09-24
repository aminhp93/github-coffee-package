import type { Meta } from "@storybook/react";

// import * as argTypes from "./Dialog.types";
import { DialogContainer } from "../../../components";
import DialogContainerTemplate from "./DialogContainerTemplate";
import DialogContainerUpdateTemplate from "./DialogContainerUpdateTemplate";
import DialogConfirmCloseTemplate from "./DialogConfirmCloseTemplate";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/DialogContainer",
  component: DialogContainer,
} as Meta<typeof DialogContainer>;

export const DialogMultiple = DialogContainerTemplate.bind({});
export const DialogUpdate = DialogContainerUpdateTemplate.bind({});
export const DialogConfirmClose = DialogConfirmCloseTemplate.bind({});
