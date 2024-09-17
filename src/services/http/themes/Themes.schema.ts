import { z } from "zod";

// common
export const THEME_STYLES = ["gk", "gkBas", "piscada", "bas"] as const;

export const THEME_VALUE = "@Theme" as const;

const ThemeStyleSchema = z.enum(THEME_STYLES);

export type ThemeStyle = z.infer<typeof ThemeStyleSchema>;

const ItemThemeContentSchema = z.object({
  text: z.string(),
  itemBackground: z.string(),
  contrast: z.string(),
  alarmBackground: z.string(),
  alarmContrast: z.string(),
  run: z.string(),
  stop: z.string(),
  primaryValue: z.string(),
  secondaryCalculatedSetPoint: z.string(),
  secondarySetPoint: z.string(),
  secondaryValue: z.string(),
  heatingCoil: z.string(),
  coolingCoil: z.string(),
  extract: z.string(),
  exhaust: z.string(),
  inlet: z.string(),
  supply: z.string(),
  outOfService: z.string(),
  overridden: z.string(),
  inAlarm: z.string(),
  fault: z.string(),
});

export const ItemThemeSchema = ItemThemeContentSchema.extend({
  id: z.string(),
  name: z.string(),
  uuid: z.string(),
  isDefault: z.boolean().nullable(),
  isLocked: z.boolean(),
  style: ThemeStyleSchema,
  exceptionItem: z.object({
    flowMeter: z.object({
      value: z.string(),
    }),
    heatExchanger: z.object({
      value: z.string(),
    }),
    sensor: z.object({
      value: z.string(),
    }),
  }),
});

export const ListItemThemeSchema = z.array(ItemThemeSchema);

export type ItemThemeContent = z.infer<typeof ItemThemeContentSchema>;

export type ItemThemeColor = keyof ItemThemeContent;

export type ItemTheme = z.infer<typeof ItemThemeSchema>;


type ThemeValues = {
  [K in keyof ItemThemeContent]: K;
};

export const THEME_VALUES: ThemeValues = {
  text: "text",
  itemBackground: "itemBackground",
  contrast: "contrast",
  alarmBackground: "alarmBackground",
  alarmContrast: "alarmContrast",
  run: "run",
  stop: "stop",
  primaryValue: "primaryValue",
  secondaryCalculatedSetPoint: "secondaryCalculatedSetPoint",
  secondarySetPoint: "secondarySetPoint",
  secondaryValue: "secondaryValue",
  heatingCoil: "heatingCoil",
  coolingCoil: "coolingCoil",
  extract: "extract",
  exhaust: "exhaust",
  inlet: "inlet",
  supply: "supply",
  outOfService: "outOfService",
  overridden: "overridden",
  inAlarm: "inAlarm",
  fault: "fault"
};
