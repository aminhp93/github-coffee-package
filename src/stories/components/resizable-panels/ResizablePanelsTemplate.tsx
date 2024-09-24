import { Box } from "@mui/material";
import React from "react";
import { ResizablePanels } from "../../../components/resizable-panels";
import { useTranslation } from "../../../utils/translation";

const AppTemplate = () => {
  const { t } = useTranslation();
  return (
    <Box sx={{ width: "100%", height: "calc(100vh - 40px)" }}>
      <ResizablePanels
        direction="vertical"
        defaultSizes={[25, 75]}
        panels={[
          <div key={1}>{t("Panel1")}</div>,
          <div key={1}>{t("Panel2")}</div>,
        ]}
      />
    </Box>
  );
};

export default AppTemplate;
