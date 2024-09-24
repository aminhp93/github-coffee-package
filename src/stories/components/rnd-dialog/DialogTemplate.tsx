import { Box } from "@mui/material";
import React from "react";
import { useTranslation } from "../../../utils/translation";

const DialogTemplate = () => {
  const { t } = useTranslation();
  return <Box sx={{ width: "300px" }}>{t("App")}</Box>;
};

export default DialogTemplate;
