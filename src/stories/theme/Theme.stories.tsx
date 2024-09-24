import React from "react";
import DefaultTheme from "./DefaultTheme";
import ThemeTemplate from "./ThemeTemplate";

export default {
  title: "Theme",
};

export const Default = () => <DefaultTheme />;
export const Theme = ThemeTemplate.bind({});
