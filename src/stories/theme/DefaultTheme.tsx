// Reference:
// https://github.com/mui/material-ui/blob/master/docs/data/material/customization/default-theme/DefaultTheme.js

import React from "react";
import ThemeViewer from "./ThemeViewer";
import { useTheme } from "../../theme";

const DefaultTheme = () => {
  const theme = useTheme();
  return <ThemeViewer data={theme} expandPaths={[]} />;
};

export default DefaultTheme;
