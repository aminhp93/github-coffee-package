// Import libraries
import {
  DragLayerMonitorProps,
  DropOptions,
  NodeModel,
  TreeMethods,
} from "@minoru/react-dnd-treeview";
import React, { useEffect, useState, forwardRef } from "react";
import { List, Popover, Box, BoxProps, IconButton } from "@mui/material";
import { UnfoldMore } from "@mui/icons-material";

// Import local files: relative path
import { Tree } from "../../components/tree";
import CustomDragPreview from "./components/CustomDragPreview";
import CustomNode from "./components/CustomNode";
import OptionItem from "./components/OptionItem";
import { CustomData, NodeId, SystemTreeProps, OptionMenu } from "./types";
import {
  getChildrenIds,
  getDirectChildrenIds,
  getParentIds,
  areAllChildrenChecked,
  isParentIndeterminate,
  getParentIdsByNodeId,
} from "./utils";
import { StyledBoxContainer, StyledBoxContent, StyledBoxHeader, StyledTypography } from "./styles";
import { styled } from "../../theme";

const SystemTreeComponent = (
  {
    enableCheckbox = false,
    disabled = false,
    hideHeader = false,
    disableDragAndDrop,
    hideActionButton,
    selectedNodeId,
    tree,
    onChangeTreeData,
    onDropNode,
    onSelectNodes,
    label,
    ...rest
  }: SystemTreeProps,
  ref: React.ForwardedRef<TreeMethods> | undefined
) => {
  const treeRef = React.useRef<TreeMethods | null>(null);
  const systemTreeRef = ref ?? treeRef;

  const [openAllTree, setOpenAllTree] = useState<boolean>(false);
  const [anchorNodeEl, setAnchorNodeEl] = useState<HTMLElement | null>(null);
  const [treeData, setTreeData] = useState<NodeModel[]>(tree);
  const [selectedNodes, setSelectedNodes] = useState<NodeId[]>([]);
  const [clickedNodeId, setClickedNodeId] = useState<NodeId | undefined>();
  const [clickedActionsButton, setClickedActionsButton] = useState<NodeId | undefined>();
  const [optionMenu, setOptionMenu] = useState<OptionMenu>();

  const open = Boolean(anchorNodeEl);
  const id = open ? "menu-popover" : undefined;

  const handleClose = () => {
    setAnchorNodeEl?.(null);
  };

  const handleClickNode = (node: NodeModel) => {
    rest.onClickNode?.(node);
    setClickedNodeId(node.id);
  };

  useEffect(() => {
    if (!selectedNodeId || selectedNodeId === clickedNodeId) return;
    setClickedNodeId(selectedNodeId);
  }, [clickedNodeId, selectedNodeId]);

  useEffect(() => {
    setTreeData(tree);
  }, [tree]);

  useEffect(() => {
    onChangeTreeData?.(treeData);
  }, [treeData, onChangeTreeData]);

  useEffect(() => {
    onSelectNodes?.(selectedNodes);
  }, [selectedNodes, onSelectNodes]);

  const handleDrop = (newTree: NodeModel[], options: DropOptions) => {
    setTreeData(newTree);
    // check if drag source's old parent is checked (in case drag source was the only child that wasn't checked)
    const { dragSource } = options;
    const selectedNodesSet = new Set(selectedNodes);
    if (dragSource && !selectedNodesSet.has(dragSource.id)) {
      const oldParentChildrenIds = getDirectChildrenIds(dragSource.parent, newTree);
      const oldParentIsChecked = oldParentChildrenIds.every((childId) =>
        selectedNodesSet.has(childId)
      );

      if (oldParentIsChecked) {
        const oldParentNode = newTree.find((treeNode) => treeNode.id === dragSource.parent);
        oldParentNode && handleSelect(oldParentNode);
      }
    }
    onDropNode?.(newTree, options);
  };

  const handleSelect = (node: NodeModel) => {
    const childrenIds = getChildrenIds(node, treeData);
    const parentIds = getParentIds(node, treeData) ?? [];
    if (selectedNodes.includes(node.id)) {
      // de-check all children and parent nodes
      const parentAndChildrenIds = new Set([...childrenIds, ...parentIds]);
      setSelectedNodes((prevSelected) =>
        prevSelected.filter((id) => !parentAndChildrenIds.has(id))
      );
    } else {
      // check all children nodes and every parent node that has all its children checked
      const willBeChecked = [...childrenIds];
      parentIds.forEach((parentId) => {
        if (areAllChildrenChecked(parentId, willBeChecked, treeData, selectedNodes)) {
          willBeChecked.push(parentId);
        }
      });
      setSelectedNodes((prevSelected) => [...prevSelected, ...willBeChecked]);
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setSelectedNodes([]);
    }
  };

  const toggleOpenAllTree = () => {
    const treeRef = systemTreeRef as React.MutableRefObject<TreeMethods | null>;

    if (!treeRef?.current) return;
    let openTree = false;
    if (!openAllTree) {
      treeRef.current.openAll();
      openTree = true;
    } else {
      treeRef.current.closeAll();
    }

    setOpenAllTree(openTree);
  };

  useEffect(() => {
    if (!clickedNodeId) return;
    const listParentId = getParentIdsByNodeId(clickedNodeId.toString(), tree);
    const treeRef = systemTreeRef as React.MutableRefObject<TreeMethods | null>;

    treeRef?.current?.open(listParentId);
  }, [systemTreeRef, clickedNodeId, tree]);

  return (
    <StyledBoxContainer>
      {!hideHeader && (
        <StyledBoxHeader>
          <StyledTypography>{label}</StyledTypography>
          <IconButton onClick={toggleOpenAllTree}>
            <UnfoldMore />
          </IconButton>
        </StyledBoxHeader>
      )}
      <StyledBoxContent>
        <StyledBoxRootContainer disabled={disabled}>
          <Box sx={{ pointerEvents: disabled ? "none" : "auto" }}>
            <Tree
              ref={systemTreeRef}
              canDrag={() => !disableDragAndDrop}
              canDrop={() => {
                if (!disableDragAndDrop) {
                  return false;
                }
              }}
              tree={treeData}
              // @ts-expect-error TODO: fix this
              render={(node: NodeModel<CustomData>, { depth, isOpen, onToggle }) => {
                const isSelected = !!selectedNodes.find((nodeId) => nodeId === node.id);
                const isIndeterminate = isParentIndeterminate(node, treeData, selectedNodes);
                const isClickedNode = clickedNodeId === node.id;
                const showActionsButton = Boolean(clickedActionsButton === node.id && anchorNodeEl);
                return (
                  <CustomNode
                    node={node}
                    depth={depth}
                    isOpen={isOpen}
                    hideCheckbox={!enableCheckbox}
                    isIndeterminate={isIndeterminate}
                    isSelected={isSelected || isClickedNode}
                    onToggle={onToggle}
                    onSelect={handleSelect}
                    onClickNode={handleClickNode}
                    setAnchorEl={setAnchorNodeEl}
                    setOptionMenu={setOptionMenu}
                    setClickedActionsButton={setClickedActionsButton}
                    fixActionsButton={showActionsButton}
                    hideActionButton={hideActionButton}
                  />
                );
              }}
              // @ts-expect-error TODO: fix this
              dragPreviewRender={(monitorProps: DragLayerMonitorProps<CustomData>) => (
                <CustomDragPreview monitorProps={monitorProps} />
              )}
              onDrop={handleDrop}
              rootProps={{
                onClick: handleClear,
              }}
              {...rest}
            />
            <Popover
              id={id}
              open={open}
              anchorEl={anchorNodeEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              sx={{ ml: optionMenu?.type === "add" ? 14 : 4 }}
            >
              {optionMenu?.options && (
                <List>
                  {optionMenu.options.map((option) => (
                    <OptionItem
                      key={option.type}
                      treeOption={option}
                      nodeId={option.nodeId}
                      onClick={() => {
                        option.onClick();
                        setAnchorNodeEl(null);
                      }}
                    />
                  ))}
                </List>
              )}
            </Popover>
          </Box>
        </StyledBoxRootContainer>
      </StyledBoxContent>
    </StyledBoxContainer>
  );
};

const SystemTree = forwardRef(SystemTreeComponent);

export { SystemTree };

interface CustomBoxProps extends BoxProps {
  disabled?: boolean;
}

export const StyledBoxRootContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "disabled",
})<CustomBoxProps>(({ theme, disabled }) => ({
  opacity: disabled ? 0.5 : 1,
  cursor: disabled ? "not-allowed" : "auto",
  background: theme.palette.background.paper,
  color: theme.palette.common.black,
  height: "100%",
  width: "100%",
  ".MuiSvgIcon-root": {
    verticalAlign: "middle",
    color: theme.palette.action.active,
  },
  ".MuiCheckbox-root": {
    padding: theme.spacing(1),
  },
}));
