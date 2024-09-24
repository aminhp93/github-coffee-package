export const open = {
  name: "open",
  description: "If true, the component is shown.",
  table: {
    type: { summary: "bool" },
  },
};

export const action = {
  name: "action",
  description:
    "To show button group default (cancel button and save button).<br>You also can using yourself buttons action by writing them in children of dialog",
  table: {
    type: { summary: "object" },
  },
  argTypes: { show: { control: "boolean" } },
};
