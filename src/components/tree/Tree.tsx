// Import libraries
import {
  DndProvider,
  MultiBackend,
  Tree as TreeDnd,
  getBackendOptions,
  TreeProps,
  TreeMethods,
} from "@minoru/react-dnd-treeview";
import React from "react";

import { DEFAULT_TREE_PROPS } from "./config";

const TreeComponent = (
  props: TreeProps,
  ref: React.ForwardedRef<TreeMethods> | undefined
) => {
  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <TreeDnd ref={ref} {...DEFAULT_TREE_PROPS} {...props} />
    </DndProvider>
  );
};

const Tree = React.forwardRef(TreeComponent);

export { Tree };
