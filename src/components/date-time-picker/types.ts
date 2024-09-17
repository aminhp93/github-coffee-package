// import { dayjs } from "webpmp-v5-components";
import { dayjs } from "../../";

export type TimeType = "realTime" | "history";

export type TimeFrameType = "exact" | "relative";

export type Range = {
  value: string;
  label: string;
  count: number;
  unit: dayjs.ManipulateType;
};

export type ExactTime = {
  type: "exact";
  isCurrentDay?: boolean;
  value: dayjs.Dayjs | null;
};

export type RelativeTime = {
  type: "relative";
  value: Range;
};

export type TimeConfig = ExactTime | RelativeTime;

export type DateTimeData = {
  from?: TimeConfig;
  to?: TimeConfig;
};
