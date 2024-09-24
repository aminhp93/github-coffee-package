import React from "react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { styled } from "../../../theme";
import { useTranslation } from "../../../utils/translation";
import { TreeOption, TreeOptionType } from "../types";
import { ICON_MAPPING } from "../constants";

type Props = {
  treeOption: TreeOption<TreeOptionType>;
  nodeId: string;
  onClick: (id: string, typeOption: string) => void;
};

const OptionItem = ({ nodeId, treeOption, onClick }: Props) => {
  const { t } = useTranslation();
  return (
    <ListItem disablePadding>
      <StyledListItemButton onClick={() => onClick(nodeId, treeOption.type)}>
        <StyledListItemIcon>{ICON_MAPPING[treeOption.type]}</StyledListItemIcon>
        <StyledListItemText primary={t(treeOption.text)} />
      </StyledListItemButton>
    </ListItem>
  );
};

const StyledListItemText = styled(ListItemText)(() => ({
  textTransform: "capitalize",
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  height: theme.spacing(9),
  padding: theme.spacing(1.5, 4),
}));

const StyledListItemIcon = styled(ListItemIcon)(({ theme }) => ({
  minWidth: "unset",
  marginRight: theme.spacing(3),
}));

export default OptionItem;
