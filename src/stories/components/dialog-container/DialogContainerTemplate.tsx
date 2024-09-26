import { Box, Button } from "@mui/material";
import React from "react";
import { useDialogsStore } from "@/stores";

const DialogContainerTemplate = () => {
  const addDialog = useDialogsStore((state) => state.addDialog);

  const handleAddDialog = () => {
    const randomId = Math.random().toString(36).substring(7);
    addDialog({
      idRef: randomId,
      component: <Box>{randomId}</Box>,
      propsComponent: undefined,
    });
  };
  return (
    <Box sx={{ width: "300px" }}>
      <Button onClick={handleAddDialog}>{`Open dialog`}</Button>
    </Box>
  );
};

export default DialogContainerTemplate;
