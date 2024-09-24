import useMediaQuery from "@mui/material/useMediaQuery";
import "./theme/types";

export { default as ThemeComponent } from "./theme/ThemeComponent";
export { SettingsConsumer, SettingsProvider } from "./context/settingsContext";
export { useSettings } from "./hooks/useSettings";
export { styled, useTheme } from "@mui/material/styles";
export type { Theme } from "@mui/material/styles";
export { useMediaQuery };
