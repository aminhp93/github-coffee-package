import React, { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import CopyToClipboard from "react-copy-to-clipboard";
import { ContentCopy } from "@mui/icons-material";
import { useTranslation } from "../../utils/translation";

type Edge = false | "start" | "end";

export type PropsCopyButton = {
  copyContent: string;
  edge?: Edge;
};

const CopyButton = ({ copyContent, edge }: PropsCopyButton) => {
  const { t } = useTranslation();
  const [isTooltipOpen, setIsTooltipOpen] = useState<boolean>(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsTooltipOpen(true);
    const timeout = setTimeout(() => {
      setIsTooltipOpen(false);
    }, 1000);
    return () => clearTimeout(timeout);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Tooltip arrow open={isTooltipOpen} title={t("copied")}>
      <IconButton onClick={handleClick} onMouseDown={handleMouseDown} edge={edge}>
        <CopyToClipboard text={copyContent}>
          <ContentCopy />
        </CopyToClipboard>
      </IconButton>
    </Tooltip>
  );
};

export { CopyButton };
