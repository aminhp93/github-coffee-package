import { Box } from "@mui/material";
import React, { Children, ReactNode } from "react";

const StackedGroup = ({
  children,
  overlapWidth = 10,
}: {
  children: ReactNode;
  overlapWidth?: number;
}) => {
  return (
    <Box display={"flex"} alignItems={"center"}>
      {Children.map(children, (child, idx) => (
        <Box key={idx} position={"relative"} left={idx * -overlapWidth}>
          {child}
        </Box>
      ))}
    </Box>
  );
};

export { StackedGroup };
