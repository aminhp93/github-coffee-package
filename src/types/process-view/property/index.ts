import { GeometryProperties, GeometryValues } from "./geometry.types";
import { PropertyPickerType } from "./property-picker.types";
import { StyleProperties } from "./style.types";
import { TextProperties } from "./text.types";
import { TransformProperties, TransformValues } from "./transform.types";

export * from "./geometry.types";
export * from "./property-picker.types";
export * from "./style.types";
export * from "./table.types";
export * from "./text.types";
export * from "./transform.types";
export * from "./value.types";

export type FixedPropertyGroupKey = "transform" | "geometry" | "style" | "text";

export type CommonPropertyGroupKey =
  | FixedPropertyGroupKey
  | "settings"
  | "matrix"
  | "dataSources"
  | "popup";

export type BaseProperties = {
  transform: TransformValues;
  geometry: GeometryValues;
};

export type PropertyPicker = {
  type: PropertyPickerType;
  label: string;
  values: unknown;
  [key: string]: unknown;
};

export type GroupProperties<T> = {
  type: "group";
  label: string;
  values: {
    [key in keyof T]: PropertyPicker;
  };
};

export const PropertyGroupType = {
  TRANSFORM: "transform",
  GEOMETRY: "geometry",
  STYLE: "style",
  TEXT: "text",
  // DATA: "data",
  GROUP: "group",
} as const;

export type FixedPropertyGroup<T, V> = {
  type: T;
  label: string;
  values: V;
};

export type FixedProperties =
  | TransformProperties
  | GeometryProperties
  | TextProperties
  | StyleProperties;

export type SetupConfig<T> = {
  [K in keyof T]: GroupProperties<T[K]> | FixedProperties;
};
