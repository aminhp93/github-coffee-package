// Import libraries
import { IconButton, Popover, Typography, Box } from "@mui/material";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Search } from "@mui/icons-material";

// import local files
import { StyledBoxPath } from "./styles";
import {
  SystemTree,
  getCurrentPathByNodeId,
  getParentIdsByNodeId,
  NodeModel,
  TreeMethods,
} from "../index";

type Props = {
  initTreeValue: NodeModel[];
  onClickNode?: (node: NodeModel) => void;
  selectedNodeId?: string;
  startIcon?: React.ReactNode;
  maxHeight?: number | string;
  initialOpen?: boolean;
  title?: React.ReactNode;
};

const SystemTreePath = ({
  startIcon,
  initTreeValue,
  selectedNodeId,
  maxHeight,
  initialOpen,
  onClickNode,
  title,
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [widthPopover, setWidthPopover] = useState<number>(0);
  const [currentPath, setCurrentPath] = useState<string>("");

  const ref = useRef<HTMLElement | null>(null);
  const treeRef = useRef<TreeMethods | null>(null);

  const open = Boolean(anchorEl);
  const id = open ? "tree-path-popover" : undefined;

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickNode = (data: NodeModel) => {
    onClickNode?.(data);
    if (data?.id === undefined) return;
    const nodePath = getCurrentPathByNodeId(data.id.toString(), initTreeValue);
    setCurrentPath(nodePath.reverse().join(" / "));
  };

  useEffect(() => {
    if (!selectedNodeId) {
      setCurrentPath("");
      return;
    }
    if (!initTreeValue) return;
    const nodePath = getCurrentPathByNodeId(selectedNodeId, initTreeValue);
    setCurrentPath(nodePath.reverse().join(" / "));
  }, [selectedNodeId, initTreeValue]);

  useLayoutEffect(() => {
    if (!selectedNodeId) return;
    const listParentId = getParentIdsByNodeId(selectedNodeId, initTreeValue);

    // TODO: Handle async rendering and remove setTimeout; this bug occurs when the logic runs first after UI rendering, and then treeRef can't be opened.
    setTimeout(() => {
      treeRef.current?.open(listParentId);
    }, 0);
  }, [initTreeValue, selectedNodeId, anchorEl]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    if (!ref.current) return;
    const resizeObserver = new ResizeObserver(() => {
      if (!ref.current) return;
      setWidthPopover(ref.current?.clientWidth);
    });
    resizeObserver.observe(ref.current);
    return () => resizeObserver.disconnect(); // clean up
  }, []);

  return (
    <>
      <StyledBoxPath ref={ref} onClick={handleClick}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {startIcon && <IconButton>{startIcon}</IconButton>}
          {currentPath && (
            <Typography className="path">{currentPath}</Typography>
          )}
          {title}
        </Box>
        <Search />
      </StyledBoxPath>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        PaperProps={{
          style: {
            width: `${widthPopover}px`,
            maxHeight: maxHeight,
            overflowY: "auto",
          },
        }}
      >
        <SystemTree
          ref={treeRef}
          tree={initTreeValue}
          initialOpen={initialOpen}
          onClickNode={handleClickNode}
          selectedNodeId={selectedNodeId}
          disableDragAndDrop
          hideActionButton
        />
      </Popover>
    </>
  );
};

export { SystemTreePath };
