import { FixedPropertyGroup, PropertyGroupType } from "@/types";

const _TEXT_POSITIONS = [
  "left",
  "leftReverse",
  "right",
  "rightReverse",
  "top",
  "topReversed",
  "bottom",
  "bottomReverse",
] as const;

export const TEXT_POSITIONS = [..._TEXT_POSITIONS];

export const TEXT_POS_OPTIONS = TEXT_POSITIONS.map((i) => ({
  label: i,
  value: i,
}));

export type TextPosition = (typeof TEXT_POSITIONS)[number];

export type TextAlignment = "left" | "right" | "center" | "justify";

export type TextValues = {
  value: string;
  color: string;
  fontWeight: number;
  family: string;
  size: number;
  underline: boolean;
  italic: boolean;
  bold: boolean;
  strikethrough: boolean;
  align: TextAlignment;
  position: TextPosition;
};

export type TextProperties = FixedPropertyGroup<
  typeof PropertyGroupType.TEXT,
  TextValues
>;
