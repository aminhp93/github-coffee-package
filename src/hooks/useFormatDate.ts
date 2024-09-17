import { useEffect, useState } from "react";
import dayjs from "dayjs";

// Available formats
export type StartOfWeek = "Monday" | "Sunday";
export type TimeFormat = "12-hour" | "24-hour";
export type DateFormat = "mm/dd/yyyy" | "dd/mm/yyyy" | "yyyy/mm/dd";

type Key = TimeFormat | DateFormat;

type FormatList = {
  [K in Key]?: {
    default: string;
    shortForm?: string;
  };
};

export const LIST_DATE_TIME_FORMAT: FormatList = {
  "12-hour": {
    default: "hh:mm A",
  },
  "24-hour": {
    default: "HH:mm",
  },
  "mm/dd/yyyy": {
    shortForm: "MM/DD",
    default: "MM/DD/YYYY",
  },
  "dd/mm/yyyy": {
    shortForm: "DD/MM",
    default: "DD/MM/YYYY",
  },
  "yyyy/mm/dd": {
    shortForm: "MM-DD",
    default: "YYYY/MM/DD",
  },
};

const DATE_TIME_FORMAT: {
  startOfWeek: StartOfWeek;
  timeFormat: TimeFormat;
  dateFormat: DateFormat;
} = {
  startOfWeek: "Monday",
  timeFormat: "12-hour",
  dateFormat: "yyyy/mm/dd",
};

export function useDateFormat() {
  const initialFormat = JSON.parse(localStorage.getItem("DATE_TIME_FORMAT") ?? "{}");

  const [format, setFormat] = useState<{
    startOfWeek: StartOfWeek;
    timeFormat: TimeFormat;
    dateFormat: DateFormat;
  }>({
    ...DATE_TIME_FORMAT,
    ...initialFormat,
  });

  useEffect(() => {
    localStorage.setItem("DATE_TIME_FORMAT", JSON.stringify(format));
  }, [format]);

  const formatDate = (
    date: dayjs.Dayjs,
    customFormat = `${LIST_DATE_TIME_FORMAT[format.dateFormat]?.default} ${
      LIST_DATE_TIME_FORMAT[format.timeFormat]?.default
    }`
  ) => {
    return dayjs(date).format(customFormat);
  };

  const changeFormat = (newFormat: {
    startOfWeek?: StartOfWeek;
    timeFormat?: TimeFormat;
    dateFormat?: DateFormat;
  }) => {
    setFormat((prev) => {
      return {
        ...prev,
        ...newFormat,
      };
    });
  };

  return {
    format,
    formatDate,
    changeFormat,
  };
}
