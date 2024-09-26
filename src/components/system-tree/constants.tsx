// Import libraries
import {
  DeleteOutline,
  DriveFileRenameOutline,
  FolderCopy,
  History,
  LinearScale,
  Router,
  Settings,
  ViewComfy,
} from "@mui/icons-material";
import React from "react";

// Import local files
import { TreeOptionType, TreeOption } from "./types";
import { NodeType } from "@/services";

export const PRIVATE_FOLDER = "private";

const ADD_CONTROLLER_OPTIONS: TreeOption<TreeOptionType>[] = [
  { type: "addFolder", text: "addFolder" },
];

const MORE_CONTROLLER_OPTIONS: TreeOption<TreeOptionType>[] = [
  { type: "rename", text: "rename" },
  { type: "addFolder", text: "addFolder" },
  { type: "backup", text: "backupRestore" },
  { type: "tunnelSetting", text: "tunnelSettings" },
  { type: "networkSettings", text: "networkSettings" },
];

const MORE_FOLDER_OPTIONS: TreeOption<TreeOptionType>[] = [
  { type: "rename", text: "rename" },
  { type: "settings", text: "settings" },
  { type: "remove", text: "remove" },
];

export const OPTIONS = () => ({
  controller: {
    add: ADD_CONTROLLER_OPTIONS,
    more: MORE_CONTROLLER_OPTIONS,
  },
  folder: {
    more: MORE_FOLDER_OPTIONS,
  },
});

export const NODE_OPTIONS: {
  type: NodeType;
  text: string;
}[] = [
  { type: "controller", text: "controller" },
  { type: "unknown", text: "unknown" },
  { type: "network", text: "network" },
  { type: "folder", text: "folder" },
  { type: "process-view", text: "processView" },
  { type: "device", text: "device" },
  { type: "program", text: "program" },
  { type: "popup", text: "popup" },
  { type: "template", text: "template" },
  { type: "tag", text: "tag" },
];

export const ICON_MAPPING: Partial<{
  [key in TreeOptionType]: JSX.Element;
}> = {
  addFolder: <FolderCopy />,
  addView: <ViewComfy />,
  addTemplate: <ViewComfy />,
  addPopup: <ViewComfy />,
  addTag: <ViewComfy />,
  rename: <DriveFileRenameOutline />,
  backup: <History />,
  tunnelSetting: <LinearScale />,
  networkSettings: <Router />,
  settings: <Settings />,
  remove: <DeleteOutline />,
};
