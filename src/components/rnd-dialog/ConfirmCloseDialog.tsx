// Import libraries
import { Button, Stack } from "@mui/material";
import React, { SetStateAction } from "react";

// Import local files
import { Dialog } from "../dialog/Dialog";
import { ConfirmCloseProps } from "./RndDialog";
import { useTranslation } from "@/utils/translation";
import { styled } from "@/theme";

type ConfirmCloseDialogProps = {
  open: boolean;
  onCloseDialog: () => void;
  confirmCloseProps: ConfirmCloseProps;
  setOpenConfirmClose: (value: SetStateAction<boolean>) => void;
};

const ConfirmCloseDialog = ({
  open,
  onCloseDialog,
  confirmCloseProps,
  setOpenConfirmClose,
}: ConfirmCloseDialogProps) => {
  const { t } = useTranslation();

  const handleCancel = () => {
    if (confirmCloseProps.onCancel) {
      confirmCloseProps.onCancel();
      setOpenConfirmClose(false);
    } else {
      setOpenConfirmClose(false);
    }
  };

  const handleConfirm = () => {
    if (confirmCloseProps.onConfirm) {
      confirmCloseProps.onConfirm();
      setOpenConfirmClose(false);
    } else {
      onCloseDialog();
    }
  };

  const actionButtons = (
    <StyledStack spacing={2} direction="row">
      <Button color="secondary" onClick={handleCancel}>
        {t("cancel")}
      </Button>
      <Button onClick={handleConfirm}>{`Confirm`}</Button>
    </StyledStack>
  );

  return (
    <Dialog
      maxWidth="xs"
      open={open}
      onClose={() => setOpenConfirmClose(false)}
      title={confirmCloseProps.title ?? t("confirm")}
      actionButtons={actionButtons}
      FooterProps={{ show: false }}
      sx={{ zIndex: (theme) => theme.zIndex.modal + 500 }}
    >
      <StyledBoxContentContainer>
        {confirmCloseProps.content ?? t("_close.closeDialog")}
      </StyledBoxContentContainer>
    </Dialog>
  );
};

export default ConfirmCloseDialog;

const StyledStack = styled(Stack)(({ theme }) => ({
  "& .cancel-button": {
    color: theme.palette.grey[600],
  },
}));

const StyledBoxContentContainer = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(2, 4),
}));
