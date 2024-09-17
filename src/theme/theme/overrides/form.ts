const Form = () => {
  return {
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: "0.75rem",
          fontWeight: 400,
          lineHeight: 1,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: "0.75rem",
          fontWeight: 400,
          lineHeight: 1.667,
        },
      },
    },
  };
};

export default Form;
