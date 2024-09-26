import { ItemTheme, ItemThemeContent, THEME_VALUE } from "@/services";

export const getThemeColor = (
  itemTheme: ItemThemeContent | null,
  color: string
) => {
  if (isThemeColor(itemTheme, color)) {
    return itemTheme?.[color as keyof ItemThemeContent];
  } else {
    return color;
  }
};

export const getItemStyle = (itemTheme: ItemTheme | null, value: string) => {
  if (itemTheme && value === THEME_VALUE) {
    return itemTheme.style;
  } else {
    return value;
  }
};

export const isThemeColor = (
  itemTheme: ItemThemeContent | null,
  color: string
) => {
  return itemTheme && color in itemTheme;
};
