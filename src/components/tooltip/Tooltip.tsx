import * as React from "react";
import { Tooltip as MuiTooltip, TooltipProps } from "@mui/material";

const Tooltip = ({ children, title, ...props }: TooltipProps) => {
  return (
    <MuiTooltip title={title} arrow {...props}>
      {children}
    </MuiTooltip>
  );
};

export { Tooltip };
