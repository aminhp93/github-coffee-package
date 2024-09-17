// Import mui & libaries
import { Box, BoxProps, Button, ButtonGroup, IconButton, styled, useTheme } from "@mui/material";
import React, { ReactNode, useRef, useState } from "react";
import { Rnd } from "react-rnd";

// Import icon
import CloseIcon from "@mui/icons-material/Close";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import MinimizeIcon from "@mui/icons-material/Minimize";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import SaveIcon from "@mui/icons-material/Save";
import { useDialogsStore } from "../../stores/dialogs/Dialogs.store";
import ConfirmCloseDialog from "./ConfirmCloseDialog";
import { useTranslation } from "../../utils/translation";
import DialogFooter, { DialogFooterProps } from "../dialog/DialogFooter";

export type FooterProps = {
  show: boolean;
  onSave: () => void;
  onCancel: () => void;
};

export type ConfirmCloseProps = {
  show: boolean;
  title?: string;
  content?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

type Props = {
  idRef: string;
  children: ReactNode;
  zIndex?: number;
  dialogTitle?: ReactNode;
  defaultDialog?: { width: number; height: number };
  style?: React.CSSProperties;
  minHeight?: number;
  minWidth?: number;
  confirmCloseProps?: ConfirmCloseProps;
  hideControlButton?: boolean;
  /**
   * footerProps prop that are going to be removed in the future
   * @deprecated This will be removed soon in favor of FooterProps
   */
  footerProps?: FooterProps;
  FooterProps?: DialogFooterProps;
};

const DEFAULT_VALUE = {
  x: 0,
  y: 0,
  width: 500,
  height: 190,
};

const MINIMIZE_SIZE = {
  width: 200,
  height: 48,
};

const RndDialog = ({
  idRef,
  children,
  dialogTitle = "Title",
  style,
  minHeight = 48,
  minWidth = 200,
  defaultDialog = DEFAULT_VALUE,
  footerProps,
  confirmCloseProps,
  hideControlButton,
  zIndex = 1,
  FooterProps,
}: Props) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const currentWidthWindow = window.innerWidth;
  const currentHeightWindow = window.innerHeight;
  const initXPositionDialog = (currentWidthWindow - defaultDialog.width) / 2;
  const initYPositionDialog = (currentHeightWindow - defaultDialog.height) / 2;

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [size, setSize] = useState({ width: defaultDialog.width, height: defaultDialog.height });
  const [position, setPosition] = useState({ x: initXPositionDialog, y: initYPositionDialog });
  const [currentStateDialog, setCurrentStateDialog] = useState({
    isMinimize: false,
    isMaximize: false,
  });
  const [openConfirmClose, setOpenConfirmClose] = useState(false);
  const preSize = useRef({ width: defaultDialog.width, height: defaultDialog.height });

  const closeDialog = useDialogsStore((state) => state.closeDialog);
  const bringToFront = useDialogsStore((state) => state.bringToFront);

  const defaultStyle: React.CSSProperties = {
    background: theme.palette.background.paper,
    borderRadius: 4,
    display: "flex",
    flexDirection: "column",
    border: `1px solid ${theme.palette.grey[300]}`,
    zIndex,
  };

  const onCloseDialog = () => {
    closeDialog(idRef);
  };

  const onMinimize = () => {
    setCurrentStateDialog({ isMaximize: false, isMinimize: true });
    preSize.current = { ...size };
    setSize(MINIMIZE_SIZE);
  };

  const onExpand = () => {
    setCurrentStateDialog({ isMaximize: false, isMinimize: false });
    if (
      preSize.current.width === MINIMIZE_SIZE.width &&
      preSize.current.height === MINIMIZE_SIZE.height
    ) {
      setSize({ width: defaultDialog.width, height: defaultDialog.height });
    } else {
      setSize(preSize.current);
    }
  };

  const onOpenFullScreen = () => {
    setCurrentStateDialog({ isMinimize: false, isMaximize: true });
    setPosition({ x: 0, y: 0 });
    setSize({ width: currentWidthWindow, height: currentHeightWindow });
  };

  const onCloseFullScreen = () => {
    setCurrentStateDialog({ isMinimize: false, isMaximize: false });
    setPosition({ x: initXPositionDialog, y: initYPositionDialog });
    setSize({ width: defaultDialog.width, height: defaultDialog.height });
  };

  const handleCloseDialog = () => {
    if (confirmCloseProps?.show) {
      setOpenConfirmClose(true);
    } else {
      onCloseDialog();
    }
  };

  return (
    <Box className="dialog-container" onMouseDown={() => bringToFront(idRef)}>
      <Rnd
        dragHandleClassName="dialog-drag-handler"
        default={{
          ...defaultDialog,
          x: initXPositionDialog,
          y: initYPositionDialog,
        }}
        size={size}
        position={position}
        style={{ ...defaultStyle, ...style }}
        bounds="window"
        minHeight={minHeight}
        minWidth={minWidth}
        onDragStop={(_, d) => {
          setPosition({ x: d.x, y: d.y });
        }}
        onResize={(_, __, ref) => {
          setSize({ width: ref.offsetWidth, height: ref.offsetHeight });
        }}
      >
        <StyledBoxHeaderDialog>
          <StyledDialogHandler
            onMouseDown={() => {
              setIsDragging(true);
            }}
            onMouseUp={() => {
              setIsDragging(false);
            }}
            isDragging={isDragging}
            className="dialog-drag-handler"
          />
          <Box className="title">{dialogTitle}</Box>
          <ButtonGroup>
            {!hideControlButton && (
              <>
                <IconButton onClick={currentStateDialog.isMinimize ? onExpand : onMinimize}>
                  {currentStateDialog.isMinimize ? <OpenInFullIcon /> : <MinimizeIcon />}
                </IconButton>
                <IconButton
                  onClick={currentStateDialog.isMaximize ? onCloseFullScreen : onOpenFullScreen}
                >
                  {currentStateDialog.isMaximize ? <CloseFullscreenIcon /> : <CropSquareIcon />}
                </IconButton>
              </>
            )}

            <IconButton onClick={handleCloseDialog}>
              <CloseIcon />
            </IconButton>
          </ButtonGroup>
        </StyledBoxHeaderDialog>
        <StyledBoxContentDialog>{children}</StyledBoxContentDialog>

        <DialogFooter {...FooterProps} />

        {/* /**
         * That is @deprecated components that will be removed in the future in favor of DialogFooter
         */}
        {footerProps?.show && (
          <StyledBoxActionDialog>
            <Button color="secondary" onClick={footerProps.onCancel}>
              {t("cancel")}
            </Button>
            <Button startIcon={<SaveIcon />} onClick={footerProps.onSave}>
              {t("save")}
            </Button>
          </StyledBoxActionDialog>
        )}
      </Rnd>
      {confirmCloseProps?.show && (
        <ConfirmCloseDialog
          open={openConfirmClose}
          onCloseDialog={onCloseDialog}
          confirmCloseProps={confirmCloseProps}
          setOpenConfirmClose={setOpenConfirmClose}
        />
      )}
    </Box>
  );
};

export { RndDialog };

interface BoxHeaderDialog extends BoxProps {
  isDragging?: boolean;
}

const StyledBoxContentDialog = styled(Box)(() => ({
  overflow: "auto",
  height: "100%",
  flex: 1,
}));

const StyledBoxHeaderDialog = styled(Box)(({ theme }) => ({
  position: "relative",
  padding: theme.spacing(2),
  display: "flex",
  alignItems: "center",

  "& .title": {
    flex: 1,
    fontWeight: 600,
  },
  "& .MuiIconButton-root": {
    padding: theme.spacing(1),
  },
}));

const StyledDialogHandler = styled(Box, {
  shouldForwardProp: (prop) => prop !== "isDragging",
})<BoxHeaderDialog>(({ isDragging }) => ({
  cursor: isDragging ? "grabbing" : "grab",
  position: "absolute",
  width: "100%",
  height: "100%",
  left: 0,
  top: 0,
}));

const StyledBoxActionDialog = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(2)} 0`,
  marginTop: "auto",
  display: "flex",
  justifyContent: "flex-end",
  "& .cancel-button": {
    color: theme.palette.grey[600],
  },
}));
