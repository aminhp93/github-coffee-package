// ** MUI Theme Provider
import { deepmerge } from "@mui/utils";
import { ThemeOptions } from "@mui/material";

// ** User Theme Options
import UserThemeOptions from "../theme/UserThemeOptions";

// ** Type Import
import { Settings } from "../context/settingsContext";

// ** Theme Override Imports
import palette from "./palette";
import spacing from "./spacing";
import shadows from "./shadows";
import shape from "./shape";
import breakpoints from "./breakpoints";

const themeOptions = (settings: Settings): ThemeOptions => {
  // ** Vars
  const { skin, mode, direction, themeColor } = settings;

  // ** Create New object before removing user component overrides and typography objects from userThemeOptions
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userThemeConfig: any = { ...UserThemeOptions() };

  const userFontFamily = userThemeConfig.typography?.fontFamily;

  // ** Remove component overrides and typography objects from userThemeOptions
  delete userThemeConfig.components;
  delete userThemeConfig.typography;

  const mergedThemeConfig = deepmerge(
    {
      direction,
      palette: palette(mode === "semi-dark" ? "light" : mode, skin, themeColor),
      typography: {
        fontFamily:
          userFontFamily ||
          [
            "Inter",
            "sans-serif",
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(","),
      },
      shadows: shadows(),
      ...spacing,
      breakpoints: breakpoints(),
      shape: shape(),
      mixins: {
        toolbar: {
          minHeight: 56,
        },
      },
    },
    userThemeConfig
  );
  return deepmerge(mergedThemeConfig, {
    palette: {
      primary: {
        ...mergedThemeConfig.palette[themeColor],
      },
    },
  });
};

export default themeOptions;
