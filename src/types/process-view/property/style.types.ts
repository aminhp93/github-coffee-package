import { FixedPropertyGroup, PropertyGroupType } from "@/types";

export type StyleValues = {
  background: string;
  opacity: number;
  border: boolean;
  borderThickness: number;
  borderColor: string;
  borderRadius: number;
};

export type StyleProperties = FixedPropertyGroup<
  typeof PropertyGroupType.STYLE,
  StyleValues
>;
