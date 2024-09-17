const TRANSPARENT_COLOR = "transparent";
const TRANSPARENT_HEX = "#ffffff00";

export const isCSSColor = (cssColor: string) => {
  const s = new Option().style;
  s.color = cssColor;
  return s.color === cssColor;
};

export const isHex = (color: string) => {
  // for 3 digit HEX colors
  if (color && color.length === 4) return /^#[0-9A-Fa-f]{3}$/.test(color);
  // for 6 digit HEX colors
  else if (color && color.length === 7) return /^#[0-9A-Fa-f]{6}$/.test(color);
  // for 8 digit HEX colors (HEX with opacity)
  else if (color && color.length === 9) return /^#[0-9A-Fa-f]{8}$/.test(color);
  // for any other values
  else return false;
};

export const isValidColor = (color: string) => {
  if (!color) return false;
  if (color.startsWith("#")) {
    return isHex(color);
  } else {
    return isCSSColor(color);
  }
};

export const isTransparentColor = (color: string) => {
  if (
    color.toLowerCase() === TRANSPARENT_COLOR ||
    color.toLowerCase() === TRANSPARENT_HEX
  )
    return true;
  return false;
};
