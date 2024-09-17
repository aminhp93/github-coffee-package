import * as React from "react";

import { TextField } from "@mui/material";

type Props = {
  value: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
};

const CustomTextField = (props: Props) => {
  let value = props.value;
  if (props.data?.type === "relative") {
    value = props.data.value.label;
  } else if (props.data?.type === "exact") {
    value = props.data.value.format("YYYY-MM-DD HH:mm");
  }

  return <TextField label="Select Range" {...props} value={value} />;
};

export default CustomTextField;
