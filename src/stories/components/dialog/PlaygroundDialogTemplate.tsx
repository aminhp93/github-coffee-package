import React from "react";
import { StoryFn } from "@storybook/react";

import { Dialog, DialogProps } from "@/components/dialog";

const PlaygroundDialogTemplate: StoryFn<DialogProps> = (args) => {
  return <Dialog {...args} />;
};

export default PlaygroundDialogTemplate;
