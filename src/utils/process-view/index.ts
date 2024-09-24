import { ItemConfig } from "../../types/process-view";
import {
  PropertyGroupType,
  SetupConfig,
} from "../../types/process-view/property";

export * from "./item-cache.utils";
export * from "./item-theme.utils";
export * as ConfigHelper from "./item-setup.utils";
export * as Picker from "./property-picker.utils";

export function extractDefaultValuesFromConfig(
  config: SetupConfig<ItemConfig>
): ItemConfig {
  const result: Record<string, unknown> = {};

  if (typeof config !== "object") {
    return result;
  }

  Object.entries(config).forEach(([key, propertyGroup]) => {
    if (propertyGroup.type === PropertyGroupType.GROUP) {
      const temp: Record<string, unknown> = {};

      if (typeof propertyGroup.values === "object") {
        Object.entries(propertyGroup.values).forEach(
          ([propertyKey, propertyPicker]) => {
            const { values } = propertyPicker;
            if (typeof values === "object") {
              temp[propertyKey] = { ...values };
            } else {
              temp[propertyKey] = values;
            }
          }
        );
      }

      result[key] = temp;
    } else {
      const { values } = propertyGroup;
      result[key] = typeof values === "object" ? { ...values } : values;
    }
  });

  return result;
}
