import { FixedPropertyGroup, PropertyGroupType } from "@/types";

export type TransformAnchor =
  | "lt"
  | "lc"
  | "lb"
  | "ct"
  | "cc"
  | "cb"
  | "rt"
  | "rc"
  | "rb";

export type TransformValues = {
  anchor: TransformAnchor;
  x: number;
  y: number;
  z: number;
  scale: number;
  rotation: number;
};

export type TransformProperties = FixedPropertyGroup<
  typeof PropertyGroupType.TRANSFORM,
  TransformValues
>;
