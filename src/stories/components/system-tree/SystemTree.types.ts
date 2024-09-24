type CustomArgType = {
  name: string;
  description: string;
  table: {
    type: { summary: string };
    defaultValue?: { summary: string };
  };
  argTypes?: Record<string, object>;
  action?: string;
};

export const initTreeData: CustomArgType = {
  name: "initTreeData",
  description: "Initial data to render tree",
  table: {
    type: { summary: "array" },
  },
};

export const enableCheckbox: CustomArgType = {
  name: "enableCheckbox",
  description: "Specifies whether to enable the checkbox selection.",
  table: {
    type: { summary: "boolean" },
    defaultValue: { summary: "true" },
  },
};

export const onChangeTreeData: CustomArgType = {
  name: "onChangeTreeData",
  description:
    "Callback function to be called after the treeData state is changed.<br>The function is passed the new tree data (NodeModel[]).",
  table: {
    type: { summary: "func" },
  },
  action: "onChangeTreeData",
};

export const onSelectNodes: CustomArgType = {
  name: "onSelectNodes",
  description:
    "Callback function to be called after the selected nodes state is changed.<br>The function is passed the new selected node ids ((string | number)[]).",
  table: {
    type: { summary: "func" },
  },
  action: "onSelectNodes",
};

export const onDropNode: CustomArgType = {
  name: "onDropNode",
  description:
    "Callback function to be called after a node is dropped.<br>The function is passed the new tree data after dropping and .",
  table: {
    type: { summary: "func" },
  },
  action: "onDropNode",
};
