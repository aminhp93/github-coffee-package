// Import libraries
import {
  NodeModel,
  TreeProps,
  DropOptions,
  NodeRender,
} from "@minoru/react-dnd-treeview";
import React from "react";

// Import local files
import { NodeType } from "@/services";

export type TreeOptionType =
  | "addFolder"
  | "addView"
  | "addTemplate"
  | "addPopup"
  | "addTag"
  | "addDevice"
  | "rename"
  | "backup"
  | "tunnelSetting"
  | "networkSettings"
  | "settings"
  | "remove";

export type ActionNode = {
  nodeId: string | null;
  actionType: string;
};

export type NodeId = string | number;

export type CustomData = {
  fileType: string;
  fileSize: string;
  type: NodeType;
  addButton?: {
    show: boolean;
    options: React.ReactNode;
  };
  moreActionsButton?: {
    show: boolean;
    options: React.ReactNode;
  };
  descriptionText?: {
    show: boolean;
    text: React.ReactNode;
  };
};

export interface SystemTreeProps<T = unknown>
  extends Omit<TreeProps, "rootId" | "render" | "onDrop"> {
  enableCheckbox?: boolean;
  disabled?: boolean;
  hideHeader?: boolean;
  disableDragAndDrop?: boolean;
  hideActionButton?: boolean;
  rootId?: number;
  selectedNodeId?: string;
  onChangeTreeData?: (newTree: NodeModel[]) => void;
  onClickNode?: (node: NodeModel) => void;
  onDrop?: (tree: NodeModel<T>[], options: DropOptions<T>) => void;
  onDropNode?: (newTree: NodeModel[], options?: DropOptions) => void;
  onSelectNodes?: (selectedNodes: NodeId[]) => void;
  render?: NodeRender<T>;
  label?: string;
  clickedNodeId?: string;
  children?: React.ReactNode;
}

export type OptionMenu = {
  type: string;
  options: {
    nodeId: string;
    onClick: () => void;
    type: TreeOptionType;
    text: string;
  }[];
};

export type CustomNodeProps = {
  node: NodeModel<CustomData>;
  depth: number;
  isOpen: boolean;
  isSelected: boolean;
  isIndeterminate?: boolean;
  onToggle: (id: NodeModel["id"]) => void;
  onSelect: (node: NodeModel) => void;
  onClickNode: (node: NodeModel<CustomData>) => void;
  hideCheckbox?: boolean;
  setAnchorEl?: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
  setOptionMenu: React.Dispatch<React.SetStateAction<OptionMenu | undefined>>;
  setClickedActionsButton: React.Dispatch<
    React.SetStateAction<NodeId | undefined>
  >;
  fixActionsButton: boolean;
  hideActionButton?: boolean;
};

export type TreeOption<T> = {
  type: T;
  text: string;
};
