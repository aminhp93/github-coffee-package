import { TFunction } from "i18next";
import { Range } from "./types";

export const LIST_START_TIME_FRAME = (t: TFunction<"translation", undefined>): Range[] => {
  return [
    {
      value: "last_15_mins",
      label: t("_plot.utils.last_n_minutes", { n: 15 }),
      count: 15,
      unit: "minutes",
    },
    {
      value: "last_30_mins",
      label: t("_plot.utils.last_n_minutes", { n: 30 }),
      count: 30,
      unit: "minutes",
    },
    {
      value: "last_hour",
      label: t("_plot.utils.last_hour"),
      count: 1,
      unit: "hours",
    },
    {
      value: "last_2_hours",
      label: t("_plot.utils.last_n_hours", { n: 2 }),
      count: 2,
      unit: "hours",
    },
    {
      value: "last_4_hours",
      label: t("_plot.utils.last_n_hours", { n: 4 }),
      count: 4,
      unit: "hours",
    },
    {
      value: "last_6_hours",
      label: t("_plot.utils.last_n_hours", { n: 6 }),
      count: 6,
      unit: "hours",
    },
    {
      value: "last_12_hours",
      label: t("_plot.utils.last_n_hours", { n: 12 }),
      count: 12,
      unit: "hours",
    },
    {
      value: "last_day",
      label: t("_plot.utils.last_day"),
      count: 1,
      unit: "days",
    },
    {
      value: "last_2_days",
      label: t("_plot.utils.last_n_days", { n: 2 }),
      count: 2,
      unit: "days",
    },
    {
      value: "last_3_days",
      label: t("_plot.utils.last_n_days", { n: 3 }),
      count: 3,
      unit: "days",
    },
    {
      value: "last_4_days",
      label: t("_plot.utils.last_n_days", { n: 4 }),
      count: 4,
      unit: "days",
    },
    {
      value: "last_5_days",
      label: t("_plot.utils.last_n_days", { n: 5 }),
      count: 5,
      unit: "days",
    },
    {
      value: "last_6_days",
      label: t("_plot.utils.last_n_days", { n: 6 }),
      count: 6,
      unit: "days",
    },
    {
      value: "last_week",
      label: t("_plot.utils.last_week"),
      count: 7,
      unit: "days",
    },
    {
      value: "last_x_weeks",
      label: t("_plot.utils.last_n_weeks", { n: 2 }),
      count: 14,
      unit: "days",
    },
    {
      value: "last_x_weeks_2",
      label: t("_plot.utils.last_n_weeks", { n: 3 }),
      count: 21,
      unit: "days",
    },
    {
      value: "last_month",
      label: t("_plot.utils.last_month"),
      count: 30,
      unit: "days",
    },
    {
      value: "last_3_months",
      label: t("_plot.utils.last_n_months", { n: 3 }),
      count: 1 * 30 * 3,
      unit: "days",
    },
    {
      value: "last_6_months",
      label: t("_plot.utils.last_n_months", { n: 6 }),
      count: 1 * 30 * 6,
      unit: "days",
    },
    {
      value: "last_year",
      label: t("_plot.utils.last_year"),
      count: 1 * 30 * 12,
      unit: "days",
    },
    {
      value: "last_18_months",
      label: t("_plot.utils.last_n_months", { n: 18 }),
      count: 1 * 30 * 18,
      unit: "days",
    },
  ];
};

export const LIST_END_TIME_FRAME = (t: TFunction<"translation", undefined>): Range[] => {
  return [
    {
      value: "next_15_mins",
      label: t("_plot.utils.n_minutes", { n: 15 }),
      count: 15,
      unit: "minutes",
    },
    {
      value: "next_30_mins",
      label: t("_plot.utils.n_minutes", { n: 30 }),
      count: 15,
      unit: "minutes",
    },
    {
      value: "next_hour",
      label: t("_plot.utils.hour"),
      count: 1,
      unit: "hours",
    },
    {
      value: "next_2_hours",
      label: t("_plot.utils.n_hours", { n: 2 }),
      count: 2,
      unit: "hours",
    },
    {
      value: "next_4_hours",
      label: t("_plot.utils.n_hours", { n: 4 }),
      count: 4,
      unit: "hours",
    },
    {
      value: "next_6_hours",
      label: t("_plot.utils.n_hours", { n: 6 }),
      count: 6,
      unit: "hours",
    },
    {
      value: "next_12_hours",
      label: t("_plot.utils.n_hours", { n: 12 }),
      count: 12,
      unit: "hours",
    },
    {
      value: "next_day",
      label: t("_plot.utils.day"),
      count: 1,
      unit: "days",
    },
    {
      value: "next_2_days",
      label: t("_plot.utils.n_days", { n: 2 }),
      count: 2,
      unit: "days",
    },
    {
      value: "next_3_days",
      label: t("_plot.utils.n_days", { n: 3 }),
      count: 3,
      unit: "days",
    },
    {
      value: "next_4_days",
      label: t("_plot.utils.n_days", { n: 4 }),
      count: 4,
      unit: "days",
    },
    {
      value: "next_5_days",
      label: t("_plot.utils.n_days", { n: 5 }),
      count: 5,
      unit: "days",
    },
    {
      value: "next_6_days",
      label: t("_plot.utils.n_days", { n: 6 }),
      count: 6,
      unit: "days",
    },
    {
      value: "next_week",
      label: t("_plot.utils.week"),
      count: 7,
      unit: "days",
    },
    {
      value: "next_x_weeks",
      label: t("_plot.utils.n_weeks", { n: 2 }),
      count: 14,
      unit: "days",
    },
    {
      value: "next_x_weeks_2",
      label: t("_plot.utils.n_weeks", { n: 3 }),
      count: 21,
      unit: "days",
    },
    {
      value: "next_month",
      label: t("_plot.utils.month"),
      count: 30,
      unit: "days",
    },
    {
      value: "next_3_months",
      label: t("_plot.utils.n_months", { n: 3 }),
      count: 1 * 30 * 3,
      unit: "days",
    },
    {
      value: "next_6_months",
      label: t("_plot.utils.n_months", { n: 6 }),
      count: 1 * 30 * 6,
      unit: "days",
    },
    {
      value: "next_year",
      label: t("_plot.utils.year"),
      count: 1 * 30 * 12,
      unit: "days",
    },
    {
      value: "next_18_months",
      label: t("_plot.utils.n_months", { n: 18 }),
      count: 1 * 30 * 18,
      unit: "days",
    },
  ];
};
