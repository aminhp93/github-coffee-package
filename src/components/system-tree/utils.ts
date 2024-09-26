// Import libaries
import { NodeModel } from "@minoru/react-dnd-treeview";
import { NodeType, SystemNode } from "@/services";

// Import local files
import { TreeOptionType, TreeOption, NodeId } from "./types";
import { OPTIONS } from "./constants";

const getTreeOptions = (
  nodeType: NodeType,
  actionType: "add" | "more",
  returnedOptions?: TreeOption<TreeOptionType>[]
) => {
  if (actionType === "more") {
    return nodeType === "controller"
      ? OPTIONS().controller.more
      : OPTIONS().folder.more;
  } else if (actionType === "add") {
    if (nodeType === "controller") {
      return OPTIONS().controller.add;
    } else {
      if (returnedOptions) {
        return returnedOptions;
      }
    }
  }
  return [];
};

const replaceObjectWithNoChildren = (objects: NodeModel[]) => {
  //Initialize an empty array to store objects with no children
  const result: number[] = [];
  // Iterate over each object in the array
  objects.forEach((obj, index) => {
    // Check if there is no other object with this object's id as its parent
    const hasNoChildren = !objects.some(
      (otherObj) => otherObj.parent === obj.id
    );
    // If no other object has this object as its parent, add it to the result array
    if (hasNoChildren) {
      result.push(index);
    }
  });
  objects.forEach((obj, index) => {
    if (result.includes(index)) {
      obj.droppable = false;
    }
  });
  return result;
};

export const convertDataToTreeView = ({
  data,
  returnedOptions,
  onClickOptionTreeSystem,
}: {
  data: SystemNode[];
  returnedOptions?: TreeOption<TreeOptionType>[];
  onClickOptionTreeSystem?: (idNode: string, actionType: string) => void;
}): NodeModel[] => {
  const formattedData: NodeModel[] = [];

  const onClickAddFolder = (id: string, type: string) => {
    onClickOptionTreeSystem?.(id, type);
  };

  data.forEach((node) => {
    const formattedNode: NodeModel = {
      id: node.id,
      parent: node.parentId ?? 0,
      droppable: true,
      text: node.name,
    };

    if (node.type !== "network") {
      const optionsMoreActions = getTreeOptions(node.type, "more");
      const optionsAddActions = getTreeOptions(
        node.type,
        "add",
        returnedOptions
      );

      formattedNode.data = {
        type: node.type,
        addButton: {
          show: true,
          options: optionsAddActions.map((i) => {
            return {
              ...i,
              nodeId: node.id,
              onClick: () => {
                onClickAddFolder(node.id, i.type);
              },
            };
          }),
        },
        moreActionsButton: {
          show: true,
          options: optionsMoreActions.map((i) => {
            return {
              ...i,
              nodeId: node.id,
              onClick: () => {
                onClickAddFolder(node.id, i.type);
              },
            };
          }),
        },
      };
    } else {
      formattedNode.data = {
        type: node.type,
      };
    }

    // process-view is not shown in system tree
    if (
      node.type !== "process-view" &&
      node.type !== "tag" &&
      node.type !== "template" &&
      node.type !== "popup"
    ) {
      formattedData.push(formattedNode);
    }
  });

  replaceObjectWithNoChildren(formattedData);
  return formattedData;
};

export const getChildrenIdHelper = (
  node: NodeModel,
  treeData: NodeModel[],
  idList: NodeId[] = []
) => {
  idList.push(node.id);
  treeData.forEach((treeNode) => {
    if (treeNode.parent === node.id) {
      getChildrenIdHelper(treeNode, treeData, idList);
    }
  });
  return idList;
};

// Retrieve parent node's all children ids
export const getChildrenIds = (
  parent: NodeModel,
  treeData: NodeModel[],
  excludeParent = false
) => {
  const results = getChildrenIdHelper(parent, treeData);
  if (excludeParent) {
    const index = results.indexOf(parent.id);
    results.splice(index, 1);
  }
  return results;
};

// Retrieve child node's all parent ids
export const getParentIds = (
  child: NodeModel,
  treeData: NodeModel[],
  idList: NodeId[] = []
) => {
  if (child.parent == null) return;
  const parentNode = treeData.find((node) => node.id === child.parent);
  if (parentNode) {
    idList.push(parentNode.id);
    getParentIds(parentNode, treeData, idList);
  }
  return idList;
};

export const getDirectChildrenIds = (
  parentId: NodeId,
  treeData: NodeModel[]
) => {
  const results: NodeId[] = [];
  treeData.forEach((treeNode) => {
    if (treeNode.parent === parentId) {
      results.push(treeNode.id);
    }
  });
  return results;
};

export const getCurrentPathByNodeId = (
  nodeId: string | null,
  data: NodeModel[],
  currentPath: string[] = []
): string[] => {
  const currentNode = data.find((node) => nodeId === node.id.toString());
  if (currentNode) {
    currentPath.push(currentNode.text);
    if (currentNode.parent === 0) return currentPath;

    const parentNode = data.find(
      (node) => currentNode.parent.toString() === node.id.toString()
    );
    if (parentNode) {
      return getCurrentPathByNodeId(
        parentNode.id.toString(),
        data,
        currentPath
      );
    }
  }
  return [];
};

// Get all IDs that are parents of the node; this is used to open a specific node in the tree.
export const getParentIdsByNodeId = (
  nodeId: string,
  data: NodeModel[],
  currentPath: string[] = []
): string[] => {
  const currentNode = data.find((node) => nodeId === node.id.toString());
  if (currentNode) {
    currentPath.push(currentNode.id.toString());
    if (currentNode.parent === 0) return currentPath;

    const parentNode = data.find(
      (node) => currentNode.parent.toString() === node.id.toString()
    );
    if (parentNode) {
      return getParentIdsByNodeId(parentNode.id.toString(), data, currentPath);
    }
  }
  return [];
};

export const areAllChildrenChecked = (
  parentId: NodeId,
  willBeChecked: NodeId[],
  treeData: NodeModel[],
  selectedNodes: NodeId[]
) => {
  const parentNode = treeData.find((treeNode) => treeNode.id === parentId);
  if (!parentNode) return false;
  const childrenIds = getChildrenIds(parentNode, treeData, true);
  const checkedList = new Set([...selectedNodes, ...willBeChecked]);
  return childrenIds.every((id) => checkedList.has(id));
};

export const isParentIndeterminate = (
  parentNode: NodeModel,
  treeData: NodeModel[],
  selectedNodes: NodeId[]
) => {
  const childrenIds = getChildrenIds(parentNode, treeData, true);
  const childrenSet = new Set(childrenIds);
  let hasCheckedChildren = false;
  selectedNodes.forEach((id) => {
    if (childrenSet.has(id)) {
      hasCheckedChildren = true;
      childrenSet.delete(id);
    }
  });
  const hasUncheckedChildren = childrenSet.size > 0;

  return hasCheckedChildren && hasUncheckedChildren;
};
