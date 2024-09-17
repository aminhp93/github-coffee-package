import { Theme } from "@mui/material/styles";

const Button = (theme: Theme) => {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          "&:empty": {
            background: "yellow !important",
            minWidth: "2.5rem", // Example fixed width for icon buttons
            padding: "0", // Example to remove padding for icon buttons
          },
        },
        sizeSmall: {
          fontSize: "0.8125rem",
          fontWeight: 500,
          lineHeight: 1.5,
          height: "2rem", // 32px
        },
        sizeMedium: {
          fontSize: "0.875rem",
          fontWeight: 500,
          lineHeight: 1.75,
          height: "2.5rem", // 40px
        },
        sizeLarge: {
          fontSize: "0.9375rem",
          fontWeight: 500,
          lineHeight: 1.6,
          height: "3rem", // 48px
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        // Target the root class of MuiTab that is a child of MuiButtonBase
        root: {
          // Assuming you want to apply these styles to the MuiTab component
          "&.MuiTab-root": {
            // Custom styles here
            // height: DEFAULT_HEIGHT,
            // minHeight: DEFAULT_HEIGHT,
          },
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          "&.MuiToggleButton-root": {
            borderColor: theme.palette.border,
          },
        },
      },
    },
  };
};

export default Button;
