interface ExtendedColor {
  lightBackground: string;
  border: string;
}

interface ExtendedColorOption {
  lightBackground?: string;
  border?: string;
}

interface Shape {
  borderRadiusLg: number;
  borderRadiusMd: number;
  borderRadius: number;
}

declare module "@mui/material/styles" {
  interface Palette {
    customColors: {
      dark: string;
      main: string;
      light: string;
      bodyBg: string;
      darkBg: string;
      lightBg: string;
      trackBg: string;
      tableHeaderBg: string;
      primaryGradient: string;
    };
    extendedColors: {
      primary: ExtendedColor;
      secondary: ExtendedColor;
      error: ExtendedColor;
      warning: ExtendedColor;
      info: ExtendedColor;
      success: ExtendedColor;
    };
    border: string;
  }
  interface PaletteOptions {
    customColors?: {
      dark?: string;
      main?: string;
      light?: string;
      bodyBg?: string;
      darkBg?: string;
      lightBg?: string;
      trackBg?: string;
      tableHeaderBg?: string;
      primaryGradient?: string;
    };
    extendedColors?: {
      primary?: ExtendedColorOption;
      secondary?: ExtendedColorOption;
      error?: ExtendedColorOption;
      warning?: ExtendedColorOption;
      info?: ExtendedColorOption;
      success?: ExtendedColorOption;
    };
    border?: string;
  }

  interface Theme {
    constants?: {
      DEFAULT_HEIGHT?: number;
      IMAGE_SIZE?: {
        small: number;
        medium: number;
        large: number;
      };
    };
    shape: Shape;
  }
}

export {};
