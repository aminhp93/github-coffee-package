type CustomArgType = {
  name: string;
  description: string;
  table: {
    type: { summary: string };
    defaultValue?: { summary: string };
  };
  argTypes?: Record<string, object>;
};

export const showTable: CustomArgType = {
  name: "showTable",
  description: "showTable",
  table: {
    type: { summary: "boolean" },
  },
};

export const showToolbar: CustomArgType = {
  name: "showToolbar",
  description: "showToolbar",
  table: {
    type: { summary: "boolean" },
  },
};
