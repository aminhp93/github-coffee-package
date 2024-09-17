// ** MUI Imports
import { DEFAULT_HEIGHT } from "../constants";

const Tabs = () => {
  return {
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: DEFAULT_HEIGHT,
        },
      },
    },
  };
};

export default Tabs;
