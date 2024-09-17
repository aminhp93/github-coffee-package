import React from "react";
import { Box, FormGroup } from "@mui/material";

type Props = {
  children: JSX.Element;
};

export const MenuItemContent = ({ children }: Props) => {
  return (
    <FormGroup sx={{ width: "100%" }}>
      <Box
        sx={{
          width: "100%",
          minHeight: "40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {children}
      </Box>
    </FormGroup>
  );
};
