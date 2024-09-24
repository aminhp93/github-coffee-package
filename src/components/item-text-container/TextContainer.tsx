import React, { ReactNode } from "react";
import {
  TextPosition,
  TextValues,
} from "../../types/process-view/property/text.types";
import { Box, BoxProps, SxProps, Theme, styled } from "@mui/material";

type Props = {
  itemWidth: number;
  itemHeight: number;
  text: TextValues;
  textPosition?: TextPosition;
  textDecoration?: string;
  textBlocks?: (string | null)[];
  tagDesc?: string;
  showTagDesc?: boolean;
  children?: ReactNode;
  customStyle?: SxProps<Theme>;
};

const TextContainer = (props: Props) => {
  const {
    itemWidth,
    itemHeight,
    text,
    textPosition = "top",
    textBlocks = [],
    tagDesc,
    showTagDesc = false,
    textDecoration = "",
    children,
    customStyle,
  } = props;

  return (
    <FauxItem width={itemWidth} height={itemHeight}>
      <TextBox
        textPosition={textPosition}
        sx={{
          fontFamily: text.family,
          color: text.color,
          fontSize: text.size + "px",
          textDecoration: textDecoration === "" ? "none" : textDecoration,
          fontStyle: text.italic ? "italic" : "normal",
          fontWeight: text.bold ? "bold" : "normal",
          ...customStyle,
        }}
      >
        {children}
        {textBlocks.map((textBlock, idx) => (
          <span key={idx}>{textBlock}</span>
        ))}
        {showTagDesc && <span>{tagDesc}</span>}
      </TextBox>
    </FauxItem>
  );
};

export { TextContainer };

const FauxItem = styled(Box)(() => ({
  position: "absolute",
}));

type TextBoxProps = BoxProps & {
  textPosition: TextPosition;
};

const TextBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== "textPosition",
})<TextBoxProps>(({ theme }) => ({
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  alignContent: "center",
  padding: theme.spacing(1.25),
  span: {
    whiteSpace: "nowrap",
  },
  variants: [
    {
      props: { textPosition: "left" },
      style: {
        textAlign: "right",
        alignContent: "center",
        right: "100%",
        top: "50%",
        transform: "translateY(-50%)",
      },
    },
    {
      props: { textPosition: "leftReverse" },
      style: {
        flexDirection: "column-reverse",
        textAlign: "right",
        alignContent: "center",
        right: "100%",
        top: "50%",
        transform: "translateY(-50%)",
      },
    },
    {
      props: { textPosition: "right" },
      style: {
        textAlign: "left",
        alignContent: "center",
        left: "100%",
        top: "50%",
        transform: "translateY(-50%)",
      },
    },
    {
      props: { textPosition: "rightReverse" },
      style: {
        flexDirection: "column-reverse",
        textAlign: "left",
        alignContent: "center",
        left: "100%",
        top: "50%",
        transform: "translateY(-50%)",
      },
    },
    {
      props: { textPosition: "top" },
      style: {
        textAlign: "center",
        bottom: "calc(100% - 5px)",
        left: "50%",
        transform: "translateX(-50%)",
      },
    },
    {
      props: { textPosition: "topReverse" },
      style: {
        flexDirection: "column-reverse",
        textAlign: "center",
        bottom: "calc(100% - 5px)",
        left: "50%",
        transform: "translateX(-50%)",
      },
    },
    {
      props: { textPosition: "bottom" },
      style: {
        textAlign: "center",
        top: "calc(100% - 5px)",
        left: "50%",
        transform: "translateX(-50%)",
      },
    },
    {
      props: { textPosition: "bottomReverse" },
      style: {
        flexDirection: "column-reverse",
        textAlign: "center",
        top: "calc(100% - 5px)",
        left: "50%",
        transform: "translateX(-50%)",
      },
    },
  ],
}));
