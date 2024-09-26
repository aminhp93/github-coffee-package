import React from "react";
import { Box } from "@mui/material";
import { styled } from "@/theme";
import { useTranslation } from "@/utils/translation";

const EmptyDataRow = () => {
  const { t } = useTranslation();

  return (
    <StyledBoxEmptyViewContainer>
      {t("emptyDataRow")}
    </StyledBoxEmptyViewContainer>
  );
};

export { EmptyDataRow };

export const StyledBoxEmptyViewContainer = styled(Box)(() => ({
  height: "100%",
  width: "100%",
  textAlign: "center",
  alignContent: "center",
}));
