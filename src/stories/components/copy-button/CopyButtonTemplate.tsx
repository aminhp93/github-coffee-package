// CopyButton.stories.tsx
import { StoryFn } from "@storybook/react";
import React from "react";
import { CopyButton, PropsCopyButton } from "@/components/copy-button";
import { Box } from "@mui/material";

const Template: StoryFn<PropsCopyButton> = (args) => <CopyButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  copyContent: "Sample text to copy",
  edge: "start",
};

const ColorPickerTemplate = (props: PropsCopyButton) => {
  // Component logic here

  return (
    <Box sx={{ width: "300px" }}>
      {`Sample text to copy`}
      {CopyButton(props)}
    </Box>
  );
};
export default ColorPickerTemplate;
