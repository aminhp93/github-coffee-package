import { Box, BoxProps, styled } from "@mui/material";

import React, { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  points: {
    x: number;
    y: number;
  };
  children: React.ReactNode;
};

const ContextMenu = ({ children, open, points, onClose }: Props) => {
  useEffect(() => {
    window.addEventListener("click", onClose);
    return () => {
      window.removeEventListener("click", onClose);
    };
  }, [onClose]);

  if (!open) return <></>;
  return <StyledBoxContainer points={points}>{children}</StyledBoxContainer>;
};

export { ContextMenu };

interface StyledBoxContainerProps extends BoxProps {
  points: {
    x: number;
    y: number;
  };
}
const StyledBoxContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "points",
})<StyledBoxContainerProps>(({ points }) => ({
  position: "fixed",
  top: `calc(${points.y}px)`,
  left: `calc(${points.x}px)`,
}));
