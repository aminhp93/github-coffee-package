import { Save, Delete } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import React from "react";
import { styled } from "../../theme";
import { useTranslation } from "react-i18next";
import { DialogFooterType } from "./Dialog";

type CustomFooterProps = {
  titleCancel?: string;
  titleAction?: string;
  component?: {
    [key: string]: React.ReactNode;
  };
  componentProps?: {
    [key: string]: {
      [key: string]: React.ReactNode;
    };
  };
};

export type DialogFooterProps = {
  type?: "SAVE" | "DELETE";
  show?: boolean;
  hideCancel?: boolean;
  hideAction?: boolean;
  onCancel?: () => void;
  onAction?: () => void;
  customFooter?: CustomFooterProps;
};

const DialogFooter = ({
  type = DialogFooterType.SAVE,
  show = true,
  hideCancel,
  hideAction,
  onCancel,
  onAction,
  customFooter,
}: DialogFooterProps) => {
  const { t } = useTranslation();

  const actionButton = () => {
    if (hideAction) return null;
    switch (type) {
      case DialogFooterType.DELETE:
        return (
          <Button
            variant="contained"
            startIcon={<Delete />}
            color="error"
            onClick={onAction}
          >
            {customFooter?.titleAction ?? "delete"}
          </Button>
        );
      case DialogFooterType.SAVE:
      default:
        return (
          <Button variant="contained" startIcon={<Save />} onClick={onAction}>
            {customFooter?.titleAction ?? t("save")}
          </Button>
        );
    }
  };

  if (!show) {
    return <></>;
  }

  const extendedComponent = Object.keys(customFooter?.component || {}).map(
    (key) => {
      const component = customFooter?.component?.[key] as React.JSX.Element;
      if (customFooter?.componentProps?.[key]) {
        return React.cloneElement(component, {
          ...customFooter?.componentProps?.[key],
          key,
        });
      } else {
        return React.cloneElement(component, { key });
      }
    }
  );

  return (
    <StyledBoxActionDialog>
      {!hideCancel && (
        <Button color="secondary" onClick={onCancel}>
          {customFooter?.titleCancel ?? t("cancel")}
        </Button>
      )}
      {actionButton()}
      {extendedComponent}
    </StyledBoxActionDialog>
  );
};

export default DialogFooter;

const StyledBoxActionDialog = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 4),
  marginTop: "auto",
  display: "flex",
  justifyContent: "flex-end",
  gap: theme.spacing(1.5),
}));
