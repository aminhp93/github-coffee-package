import {
  GeometryProperties,
  GeometryValues,
  PropertyGroupType,
  StyleProperties,
  StyleValues,
  TextProperties,
  TextValues,
  TransformProperties,
  TransformValues,
} from "../../types";

const initPropertyValues = (
  defaultValues: { [key: string]: unknown },
  overrides?: { [key: string]: unknown },
  omittedProperties?: string[]
) => {
  const initValues = { ...defaultValues };
  if (overrides) {
    Object.entries(overrides).forEach(([key, overrideValue]) => {
      initValues[key] = overrideValue;
    });
  }
  if (omittedProperties) {
    omittedProperties.forEach((key) => {
      delete initValues[key];
    });
  }

  return initValues;
};

export const transform = (
  overrides?: Partial<TransformValues>,
  omit?: (keyof TransformValues)[]
): TransformProperties => {
  const defaultValues: TransformValues = {
    anchor: "lt",
    x: 0,
    y: 0,
    z: 0,
    scale: 1,
    rotation: 0,
  };

  return {
    type: PropertyGroupType.TRANSFORM,
    label: "transform",
    values: initPropertyValues(defaultValues, overrides, omit) as TransformValues,
  };
};

export const geometry = (
  overrides?: Partial<GeometryValues>,
  omit?: (keyof GeometryValues)[]
): GeometryProperties => {
  const defaultValues = {
    width: 40,
    height: 40,
  };

  return {
    type: PropertyGroupType.GEOMETRY,
    label: "geometry",
    values: initPropertyValues(defaultValues, overrides, omit) as GeometryValues,
  };
};

export const style = (
  overrides?: Partial<StyleValues>,
  omit?: (keyof StyleValues)[]
): StyleProperties => {
  const defaultValues: StyleValues = {
    background: "#2196f3",
    opacity: 100,
    border: false,
    borderColor: "#0069c0",
    borderThickness: 4,
    borderRadius: 0,
  };

  return {
    type: PropertyGroupType.STYLE,
    label: "style",
    values: initPropertyValues(defaultValues, overrides, omit) as StyleValues,
  };
};

export const text = (
  overrides?: Partial<TextValues>,
  omit?: (keyof TextValues)[]
): TextProperties => {
  const defaultValues: TextValues = {
    value: "Text",
    color: "#1b1b1b",
    family: "Arial",
    size: 14,
    underline: false,
    italic: false,
    bold: false,
    strikethrough: false,
    fontWeight: 400,
    align: "left",
    position: "top",
  };

  return {
    type: PropertyGroupType.TEXT,
    label: "style",
    values: initPropertyValues(defaultValues, overrides, omit) as TextValues,
  };
};

// export const data = (label: string = "source") => ({
//   type: PropertyGroupType.DATA,
//   label,
//   values: undefined,
// });

export const group = <V>(label: string, values: V) => {
  return {
    type: PropertyGroupType.GROUP,
    label,
    values,
  }
};