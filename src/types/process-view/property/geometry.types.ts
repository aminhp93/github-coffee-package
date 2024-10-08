import { FixedPropertyGroup, PropertyGroupType } from "@/types";

export type GeometryValues = {
  width: number;
  minWidth: number;
  maxWidth: number;
  height: number;
  minHeight: number;
  maxHeight: number;
};

export type GeometryProperties = FixedPropertyGroup<
  typeof PropertyGroupType.GEOMETRY,
  GeometryValues
>;
