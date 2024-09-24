const _UNITS = [
  "°C",
  "Ω",
  "%",
  "%η",
  "bar",
  "Hz",
  "kW",
  "kWh",
  "m/s",
  "m³/s",
  "pa",
  "pH",
  "m³/h",
  "ppm",
  "l/s",
] as const;

export const UNITS = [..._UNITS];

export const UNIT_OPTIONS = UNITS.map((i) => ({ label: i, value: i }));

export type Unit = (typeof UNITS)[number];

export type ValueValues = {
  unit: Unit | null;
  scaleUnit: boolean;
  decimal: number;
  valueRange: {
    min: number;
    max: number;
  };
  threshold: {
    low: number;
    high: number;
  };
};
