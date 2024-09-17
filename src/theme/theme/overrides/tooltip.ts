// ** MUI Imports
import { Theme } from "@mui/material/styles";

const Tooltip = (theme: Theme) => {
  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          textTransform: "capitalize",
          color: theme.palette.common.white,
          padding: theme.spacing(2) + " " + theme.spacing(3),
          fontSize: theme.typography.button.fontSize,
        },
      },
    },
  };
};

export default Tooltip;
