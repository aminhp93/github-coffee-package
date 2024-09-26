// Import libraries
import { Box } from "@mui/material";
import { DragLayerMonitorProps } from "@minoru/react-dnd-treeview";
import React from "react";

// Import local files
import { CustomData } from "../types";
import TypeIcon from "./TypeIcon";
import { styled } from "@/theme";

type Props = {
  monitorProps: DragLayerMonitorProps<CustomData>;
};

const CustomDragPreview = (props: Props) => {
  const item = props.monitorProps.item;

  return (
    <StyledBoxRoot>
      <StyledBoxIcon>
        <TypeIcon isOpen={true} />
      </StyledBoxIcon>
      <StyledBoxText>{item.text}</StyledBoxText>
    </StyledBoxRoot>
  );
};

export default CustomDragPreview;

const StyledBoxRoot = styled(Box)(({ theme }) => ({
  alignItems: "center",
  backgroundColor: theme.palette.action.selected,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[4],
  display: "inlineGrid",
  fontSize: theme.typography.fontSize,
  gap: theme.spacing(2),
  gridTemplateColumns: "auto auto",
  padding: theme.spacing(1, 2),
  pointerEvents: "none",
}));

const StyledBoxIcon = styled(Box)(() => ({
  alignItems: "center",
  display: "flex",
}));

const StyledBoxText = styled(Box)(() => ({
  alignItems: "center",
  display: "flex",
}));
