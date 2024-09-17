import { Theme } from "@mui/material/styles";

const Shape = (): Theme["shape"] => {
  return {
    borderRadius: 4,
    borderRadiusMd: 8,
    borderRadiusLg: 20,
  };
};

export default Shape;
