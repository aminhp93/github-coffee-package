import * as React from "react";
import { Button } from "@mui/material";
import { Tooltip } from "@/components/tooltip";
import { useTranslation } from "@/utils/translation";

const TooltipTemplate = () => {
  const { t } = useTranslation();
  return (
    <Tooltip title="Hovered">
      <Button>{t("HoverMe")}</Button>
    </Tooltip>
  );
};

export default TooltipTemplate;
