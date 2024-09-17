import { Theme } from "@mui/material/styles";

const Input = (theme: Theme) => {
  return {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "1rem",
          fontWeight: 400,
          lineHeight: 1.5,
        },
      },
    },
    MuiInputText: {},
    MuiInputBase: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.border,
          },
        },
      },
    },
  };
};

export default Input;
