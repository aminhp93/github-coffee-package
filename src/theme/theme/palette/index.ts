// ** Type Imports
import { PaletteMode } from "@mui/material";
import { Skin, ThemeColor } from "@/theme/layouts/types";

import themeColorDark from "./dark.palette";
import themeColorLight from "./light.palette";

import themeExtendedDark from "./dark.extendedColor";
import themeExtendedLight from "./light.extendedColors";

const DefaultPalette = (
  mode: PaletteMode,
  skin: Skin,
  themeColor: ThemeColor
) => {
  // ** Vars
  // const whiteColor = "255,255,255";
  // const blackColor = "0,0,0";
  // const lightColor = "58, 53, 65";
  // const darkColor = "231, 227, 252";

  const whiteColor = "#FFFFFF";
  const blackColor = "#000000";
  const lightColor = "#3A3541";
  const darkColor = "#E7E3FC";
  const mainColor = mode === "light" ? lightColor : darkColor;

  const primaryGradient = () => {
    if (themeColor === "primary") {
      return "#C6A7FE";
    } else if (themeColor === "secondary") {
      return "#9C9FA4";
    } else if (themeColor === "success") {
      return "#93DD5C";
    } else if (themeColor === "error") {
      return "#FF8C90";
    } else if (themeColor === "warning") {
      return "#FFCF5C";
    } else {
      return "#6ACDFF";
    }
  };

  return {
    customColors: {
      dark: darkColor,
      main: mainColor,
      light: lightColor,
      primaryGradient: primaryGradient(),
      bodyBg: mode === "light" ? "#F4F5FA" : "#151E30", // Same as palette.background.default but doesn't consider bordered skin
      trackBg: mode === "light" ? "#F0F2F8" : "#474360",
      darkBg: skin === "bordered" ? "#222B45" : "#151E30",
      lightBg: skin === "bordered" ? whiteColor : "#F4F5FA",
      tableHeaderBg: mode === "light" ? "#F9FAFC" : "#293350",
    },
    extendedColors: {
      ...(mode === "light" ? themeExtendedLight : themeExtendedDark),
    },
    mode,
    common: {
      black: blackColor,
      white: whiteColor,
    },

    grey: {
      50: "#FAFAFA",
      100: "#F5F5F5",
      200: "#EEEEEE",
      300: "#E0E0E0",
      400: "#BDBDBD",
      500: "#9E9E9E",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
      A100: "#F5F5F5",
      A200: "#EEEEEE",
      A400: "#BDBDBD",
      A700: "#616161",
    },

    ...(mode === "light" ? themeColorLight : themeColorDark),
  };
};

export default DefaultPalette;
