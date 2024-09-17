import {
  Box,
  BoxProps,
  Button,
  InputAdornment,
  Popover,
  PopoverOrigin,
  TextField,
  TextFieldProps,
  styled,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { ColorResult, SketchPicker } from "react-color";
import { DEFAULT_COLORS, MIXED_VALUE } from "./constant";
import { isTransparentColor, isValidColor } from "./utils";
import { CopyButton } from "../copy-button/CopyButton";

const COLOR_DEFAULT = "red";

type ColorPickerVariant = "textFiled" | "button";

export type PropsColorPicker = {
  value: string;
  variant?: ColorPickerVariant;
  size?: TextFieldProps["size"];
  paddingHorizon?: string;
  showCopyButton?: boolean;
  label?: string;
  anchorOrigin?: PopoverOrigin;
  renderValue?: string;
  onChange: (color: string) => void;
  onRevert?: () => void;
};

const ColorPicker = ({
  value,
  size = "small",
  paddingHorizon,
  label,
  showCopyButton,
  anchorOrigin = {
    vertical: "bottom",
    horizontal: "right",
  },
  renderValue,
  onChange,
  onRevert,
  variant = "textFiled",
}: PropsColorPicker) => {
  const [color, setColor] = useState(value);
  const [isError, setIsError] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLInputElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const isOpenColorPicker = Boolean(anchorEl);

  const handleChangeColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    const color = event.target.value;

    if (isValidColor(color)) {
      onChange(color);
      setIsError(false);
    } else {
      setIsError(true);
    }
    setColor(color);
  };

  useEffect(() => {
    setColor(value);
  }, [value]);

  const renderCopyButton = () => {
    if (!showCopyButton) return "";
    return (
      <InputAdornment position="end">
        <CopyButton copyContent={color} edge="end" />
      </InputAdornment>
    );
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRevert = () => {
    onRevert && onRevert();
    handleClose();
  };

  // TODO: Replace TransparentColorImg with the SVG component
  const TransparentColor = (
    <Box>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="1.35355" y1="0.646447" x2="19.3536" y2="18.6464" stroke="#F44336" />
        <rect x="0.5" y="0.5" width="19" height="19" rx="1.5" stroke="#E0E0E0" />
      </svg>
      {/* <TransparentColorImg /> */}
    </Box>
  );

  return (
    <>
      {variant === "textFiled" && (
        <StyledBoxTextFieldContainer paddingLeftRight={paddingHorizon}>
          <TextField
            onClick={handleClick}
            fullWidth
            size={size}
            value={color === MIXED_VALUE ? "" : color}
            error={isError}
            onChange={handleChangeColor}
            ref={ref}
            label={label}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {value && isTransparentColor(value) ? (
                    TransparentColor
                  ) : (
                    <StyledBoxColorSelected value={value} />
                  )}
                </InputAdornment>
              ),
              endAdornment: renderCopyButton(),
              value: renderValue ?? color,
            }}
          />
        </StyledBoxTextFieldContainer>
      )}

      {variant === "button" && (
        <StyledBoxButtonContainer ref={ref} onClick={handleClick} bgColor={value} />
      )}
      <Popover
        open={isOpenColorPicker}
        anchorOrigin={anchorOrigin}
        onClose={handleClose}
        anchorEl={anchorEl}
        sx={{
          ".sketch-picker": {
            borderRadius: "0 !important",
          },
        }}
      >
        <Button fullWidth onClick={handleRevert} sx={{ textTransform: "none" }}>
          {`Revert to theme`}
        </Button>
        <SketchPicker
          presetColors={DEFAULT_COLORS}
          color={value}
          onChangeComplete={(color: ColorResult) => {
            const alpha = Math.floor(color.rgb.a ? color.rgb.a * 100 : 100);
            const hexColor = color.hex;

            const hexColorWithTransparency = alpha < 100 ? `${hexColor}${alpha}` : hexColor;
            setColor(hexColorWithTransparency);
          }}
          onChange={(color: ColorResult) => {
            const alpha = Math.floor(color.rgb.a ? color.rgb.a * 100 : 100);
            const hexColor = color.hex;

            const hexColorWithTransparency = alpha < 100 ? `${hexColor}${alpha}` : hexColor;
            setColor(hexColorWithTransparency);

            onChange(hexColorWithTransparency);
          }}
        />
      </Popover>
    </>
  );
};

interface StyledBoxColorSelectedProps extends BoxProps {
  value: string;
}

const StyledBoxColorSelected = styled(Box, {
  shouldForwardProp: (prop) => prop !== "value",
})<StyledBoxColorSelectedProps>(({ value = COLOR_DEFAULT }) => ({
  width: "20px",
  height: "20px",
  borderRadius: "2px",
  backgroundColor: value,
}));

interface StyledBoxTextFieldContainerProps extends BoxProps {
  paddingLeftRight?: string;
}

const StyledBoxTextFieldContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "paddingLeftRight",
})<StyledBoxTextFieldContainerProps>(({ paddingLeftRight }) => ({
  position: "relative",

  "& .MuiInputBase-root": {
    fontSize: "inherit",
  },
  "& input.MuiInputBase-inputSizeSmall": {
    paddingRight: paddingLeftRight,
  },
  "& .MuiInputBase-adornedStart": {
    paddingLeft: paddingLeftRight,
  },
}));

interface StyledBoxButtonContainerProps extends BoxProps {
  bgColor?: string;
}

const StyledBoxButtonContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "paddingLeftRight",
})<StyledBoxButtonContainerProps>(({ bgColor, theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  width: "100%",
  height: "100%",
  backgroundColor: bgColor,
  borderRadius: theme.shape.borderRadius,
}));

export { ColorPicker };
