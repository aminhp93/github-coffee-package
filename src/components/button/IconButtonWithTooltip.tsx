import React, { ReactNode } from "react";
import { Button as MuiButton, ButtonProps, Tooltip, TooltipProps } from "@mui/material";

const IconButtonWithTooltip = ({
  tooltipProps,
  buttonProps,
  children,
}: {
  tooltipProps?: Omit<TooltipProps, "children">;
  buttonProps?: ButtonProps;
  children: ReactNode;
}) => {
  const size = buttonProps?.size ?? "medium";
  let minWidth = "2.5rem";
  if (size === "small") {
    minWidth = "2rem";
  } else if (size === "large") {
    minWidth = "3rem";
  }

  const { sx, ...restButtonProps } = buttonProps ?? {};

  return (
    <Tooltip title="icon button" placement="right" {...tooltipProps}>
      <MuiButton
        variant="text"
        color="secondary"
        sx={{
          padding: "0",
          minWidth,
          "& .MuiButton-icon": {
            margin: "0",
          },
          ...sx,
        }}
        {...restButtonProps}
      >
        {children}
      </MuiButton>
    </Tooltip>
  );
};

export { IconButtonWithTooltip };
