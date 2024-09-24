type CustomArgType = {
  name: string;
  description: string;
  table: {
    type: { summary: string };
  };
  argTypes?: Record<string, object>;
};

export const title: CustomArgType = {
  name: "title",
  description: "Title of Loading",
  table: {
    type: { summary: "string" },
  },
};
