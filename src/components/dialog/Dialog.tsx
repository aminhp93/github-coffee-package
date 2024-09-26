// Import libraries
import { Close, Save } from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonGroup,
  DialogProps as MuiDialogProps,
  IconButton,
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";

// Import local files
import { FULLSCREEN, FULLWIDTH, MAX_WIDTH } from "./Dialog.constants";
import { useTranslation } from "@/utils/translation";
import { styled } from "@/theme";
import DialogFooter, { DialogFooterProps } from "./DialogFooter";
import { log } from "@/utils/logger";

type DefaultActions = {
  show?: boolean;
  onSave?: () => void;
  onCancel?: () => void;
};

type ActionButtons = React.ReactNode;

export enum DialogFooterType {
  SAVE = "SAVE",
  DELETE = "DELETE",
}

export interface DialogProps extends MuiDialogProps {
  /**
   * defaultActions prop that are going to be removed in the future
   * @deprecated This will be removed soon in favor of FooterProps
   */
  defaultActions?: DefaultActions;
  /**
   * actionButtons prop that are going to be removed in the future
   * @deprecated This will be removed soon in favor of FooterProps
   */
  actionButtons?: ActionButtons;
  FooterProps?: DialogFooterProps;
}

const Dialog = ({
  title,
  children,
  open,
  onClose,
  defaultActions,
  actionButtons,
  fullScreen = FULLSCREEN,
  maxWidth = MAX_WIDTH,
  fullWidth = FULLWIDTH,
  FooterProps,
  ...props
}: DialogProps) => {
  const { t } = useTranslation();

  if (defaultActions || actionButtons) {
    log(
      "defaultActions and actionButtons are deprecated and will be removed in the future. Use FooterProps instead."
    );
  }

  return (
    <StyledDialog
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      {...props}
    >
      <StyledDialogTitle>
        <Box className="title">{title ?? t("title")}</Box>
        <ButtonGroup>
          <IconButton onClick={() => onClose?.({}, "escapeKeyDown")}>
            <Close />
          </IconButton>
        </ButtonGroup>
      </StyledDialogTitle>

      <StyledDialogContent>
        <StyledBoxContentDialog>{children}</StyledBoxContentDialog>
      </StyledDialogContent>

      <DialogFooter {...FooterProps} />

      {/* /**
       * That is @deprecated components that will be removed in the future in favor of DialogFooter
       */}
      {(defaultActions?.show || actionButtons) && (
        <DialogActions>
          <StyledBoxActionDialog>
            {defaultActions?.show ? (
              <>
                <Button color="secondary" onClick={defaultActions.onCancel}>
                  {t("cancel")}
                </Button>
                <Button startIcon={<Save />} onClick={defaultActions.onSave}>
                  {t("save")}
                </Button>
              </>
            ) : (
              <>{actionButtons}</>
            )}
          </StyledBoxActionDialog>
        </DialogActions>
      )}
    </StyledDialog>
  );
};

export { Dialog };

const StyledDialog = styled(MuiDialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: theme.shape.borderRadius,
  },
  "& .MuiDialogContent-root": {
    padding: 0,
  },
}));

const StyledDialogContent = styled(DialogContent)(() => ({
  display: "flex",
  flexDirection: "column",
}));

const StyledBoxContentDialog = styled(Box)(() => ({
  overflow: "auto",
  height: "100%",
  flex: 1,
  display: "flex",
  flexDirection: "column",
}));

const StyledBoxActionDialog = styled(Box)(() => ({
  padding: "0",
  marginTop: "auto",
  display: "flex",
  justifyContent: "flex-end",
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  position: "relative",
  padding: "12px 16px",
  display: "flex",
  alignItems: "center",

  "& .title": {
    fontSize: "16px",
    flex: 1,
    fontWeight: 600,
  },
  "& .MuiIconButton-root": {
    padding: theme.spacing(1),
  },
}));
