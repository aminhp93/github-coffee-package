import { useMediaQuery, useTheme } from "../theme";

export function useIsMobile() {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.down("sm"));
}
