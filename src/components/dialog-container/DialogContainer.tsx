import React, { cloneElement } from "react";
import { Box, useTheme } from "@mui/material";
import { useDialogsStore } from "@/stores/dialogs/Dialogs.store";
import { RndDialog } from "../rnd-dialog/RndDialog";

const DialogContainer = () => {
  const theme = useTheme();
  const listDialog = useDialogsStore((state) => state.dialogs);
  const orderDialog = useDialogsStore((state) => state.order);

  return (
    <Box>
      {listDialog.map((dialog) => {
        const Component = dialog.component;
        const Comp =
          typeof Component === "function" ? <Component /> : Component;

        return (
          <RndDialog
            key={dialog.idRef}
            zIndex={theme.zIndex.modal + orderDialog.indexOf(dialog.idRef)}
            defaultDialog={dialog.default}
            {...dialog}
          >
            {dialog.component && cloneElement(Comp, dialog.propsComponent)}
          </RndDialog>
        );
      })}
    </Box>
  );
};

export { DialogContainer };
