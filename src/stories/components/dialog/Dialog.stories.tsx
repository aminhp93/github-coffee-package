import React from "react";
import {
  Dialog as DialogComp,
  DialogFooterType,
} from "../../../components/dialog";
import PlaygroundDialogTemplate from "./PlaygroundDialogTemplate";
import * as argTypes from "./Dialog.types";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
import type { Meta } from "@storybook/react";
import { Button, IconButton } from "@mui/material";
import BluetoothIcon from "@mui/icons-material/Bluetooth";
import { log } from "../../../utils/logger";

export default {
  title: "Components/Dialog",
  component: DialogComp,
  argTypes,
} as Meta;

export const SaveDialog = PlaygroundDialogTemplate.bind({});
export const DeleteDialog = PlaygroundDialogTemplate.bind({});
export const CustomFooterDialog = PlaygroundDialogTemplate.bind({});

SaveDialog.args = {
  open: true,
  title: "Dialog Title",
  maxWidth: "sm",
  fullWidth: true,
  children: <div>{`Save Content`}</div>,
  defaultActions: {
    show: false,
    onCancel: () => log("Cancel"),
    onSave: () => log("Save"),
  },
  onClose: () => log("Close"),
};

DeleteDialog.args = {
  open: true,
  title: "Delete Title",
  maxWidth: "sm",
  fullWidth: true,
  children: <div>{`Delete Content`}</div>,
  FooterProps: {
    type: DialogFooterType.DELETE,
  },
  onClose: () => log("Close"),
};

CustomFooterDialog.args = {
  open: true,
  title: "Custom Footer Title",
  maxWidth: "sm",
  fullWidth: true,
  children: <div>{`Custom Footer Content`}</div>,
  FooterProps: {
    type: DialogFooterType.SAVE,
    hideAction: true,
    customFooter: {
      component: {
        iconButton: (
          <IconButton>
            <BluetoothIcon />
          </IconButton>
        ),
        confirm: <Button variant="outlined">{`Confirm`}</Button>,
      },
    },
  },
  onClose: () => log("Close"),
};
