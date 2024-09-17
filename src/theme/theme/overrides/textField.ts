import { Theme } from "@mui/material/styles";

const TextField = (theme: Theme) => {
  return {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: theme.palette.border,
            },
          },
        },
      },
    },
  };
};

export default TextField;
