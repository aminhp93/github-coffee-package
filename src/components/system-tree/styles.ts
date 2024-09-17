import { Box, Typography } from "@mui/material";
import { styled } from "../../theme";

export const StyledBoxContainer = styled(Box)(({ theme }) => ({
  overflow: "auto",
  display: "flex",
  flexFlow: "column",
  height: "100%",
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
}));

export const StyledBoxHeader = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flex: "0 1 auto",

  "& .MuiTypography-root": {
    textTransform: "capitalize",
  },
}));

export const StyledBoxContent = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flex: "1 1 auto",
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  fontSize: theme.typography.fontSize,
}));
