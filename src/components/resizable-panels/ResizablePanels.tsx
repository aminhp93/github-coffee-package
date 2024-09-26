import { styled } from "@/theme";
import React from "react";
import {
  ImperativePanelGroupHandle,
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from "react-resizable-panels";

type PanelSize = {
  minSize?: number;
  maxSize?: number;
};

type Props = {
  panels: React.ReactNode[];
  direction?: "horizontal" | "vertical";
  defaultSizes?: number[];
  size?: PanelSize[];
  panelGroupRef?: React.RefObject<ImperativePanelGroupHandle>;
};

const DEFAULT_SIZES_PANEL = 25;

const ResizablePanels = ({
  direction = "vertical",
  panels,
  defaultSizes,
  size,
  panelGroupRef,
}: Props) => {
  return (
    <PanelGroup ref={panelGroupRef} direction={direction}>
      {panels.map((panel, index) => (
        <>
          <Panel
            key={index}
            defaultSize={
              defaultSizes ? defaultSizes[index] : DEFAULT_SIZES_PANEL
            }
            maxSize={size?.[index]?.maxSize}
            minSize={size?.[index]?.minSize}
          >
            {panel}
          </Panel>
          {panels.length - 1 !== index && (
            <StyedPanelResizeHandle direction={direction} />
          )}
        </>
      ))}
    </PanelGroup>
  );
};

type StyedPanelResizeHandleProps = {
  direction: "horizontal" | "vertical";
};

const StyedPanelResizeHandle = styled(PanelResizeHandle, {
  shouldForwardProp: (prop) => prop !== "direction",
})<StyedPanelResizeHandleProps>(({ direction, theme }) => ({
  position: "relative",
  width: direction === "horizontal" ? theme.spacing(1) : "auto",
  height: direction === "vertical" ? theme.spacing(1) : "auto",
  backgroundColor: theme.palette.divider,
  ": hover, :active": {
    backgroundColor: theme.palette.extendedColors.primary.border,
  },
}));

export { ResizablePanels };
