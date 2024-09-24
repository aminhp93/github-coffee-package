type CustomArgType = {
  name: string;
  description: string;
  table: {
    type: { summary: string };
    defaultValue?: { summary: string };
  };
  argTypes?: Record<string, object>;
};

export const initialState: CustomArgType = {
  name: "initialState",
  description: "initialState",
  table: {
    type: { summary: "object" },
  },
};

export const hideFooter: CustomArgType = {
  name: "hideFooter",
  description: "hideFooter",
  table: {
    type: { summary: "boolean" },
  },
};

export const pageSizeOptions: CustomArgType = {
  name: "pageSizeOptions",
  description: "pageSizeOptions",
  table: {
    type: { summary: "number[]" },
  },
};

export const pagination: CustomArgType = {
  name: "pagination",
  description: "pagination",
  table: {
    type: { summary: "boolean" },
  },
};

export const rowHeight: CustomArgType = {
  name: "rowHeight",
  description: "rowHeight",
  table: {
    type: { summary: "number" },
  },
};

export const slots: CustomArgType = {
  name: "slots",
  description: "slots",
  table: {
    type: { summary: "object" },
  },
};
