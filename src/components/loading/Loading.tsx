import React from "react";

import { CircularProgress, CircularProgressProps } from "@mui/material";

const Loading = ({ ...props }: CircularProgressProps) => {
  return <CircularProgress {...props} />;
};

export { Loading };
