import { ItemDataSrcConfig, PropertyPickerType, TableValues } from "@/types";

export const color = (label = "Color", values?: string) => {
  return {
    type: PropertyPickerType.COLOR,
    label,
    values,
  };
};

export const number = (
  label = "Number",
  values?: number,
  settings: {
    min?: number;
    max?: number;
    step?: number;
    maxDecimals?: number;
  } = {}
) => {
  const { min, max } = settings;
  if (min && max && min > max) {
    throw new Error(`Number picker: Min is larger than Max`);
  }

  return {
    type: PropertyPickerType.NUMBER,
    label,
    values,
    min,
    max,
    ...settings,
  };
};

export const string = (label = "String", values?: string) => ({
  type: PropertyPickerType.STRING,
  values,
  label,
});

export const toggle = (label = "Toggle", values = false) => ({
  type: PropertyPickerType.TOGGLE,
  values,
  label,
});

export const select = (
  label = "Option",
  values?: string,
  settings?: {
    multiple?: boolean;
    options: { label: string; value: string }[];
  }
) => {
  return {
    type: PropertyPickerType.SELECT,
    label,
    values,
    ...settings,
  };
};

export const tag = (label = "Tag", values?: unknown) => ({
  type: PropertyPickerType.TAG,
  values,
  label,
});

export const dataSource = (label = "Source") => {
  return {
    type: PropertyPickerType.DATA_SOURCE,
    values: {
      nested: false,
    } as ItemDataSrcConfig,
    label,
  };
};

export const dataSourceList = (label = "Sources", values?: unknown) => ({
  type: PropertyPickerType.DATA_SOURCE_LIST,
  values,
  label,
});

export const popup = (label = "Popup", values?: unknown) => ({
  type: PropertyPickerType.POPUP,
  values,
  label,
});

export const processView = (label = "Process View", values?: unknown) => ({
  type: PropertyPickerType.PV,
  values,
  label,
});

export const link = (label = "Link", values?: unknown) => ({
  type: PropertyPickerType.LINK,
  values,
  label,
});

export const role = (label = "Role", values?: unknown) => ({
  type: PropertyPickerType.ROLE,
  values,
  label,
});

export const compensationCurve = (label = "Setup", values?: unknown) => ({
  type: PropertyPickerType.COMP_CURVE,
  values,
  label,
});

export const objectList = (label = "Setup", values?: unknown) => ({
  type: PropertyPickerType.OBJECT_LIST,
  values,
  label,
});

export const dmf = (
  label = "Matrix",
  values?: unknown,
  options?: { headers?: unknown }
) => ({
  type: PropertyPickerType.DMF,
  values,
  label,
  ...options,
});

export const eos = (label = "Select EOS", values?: unknown) => {
  return {
    type: PropertyPickerType.EOS,
    label,
    values,
  };
};

export const image = (label = "Image", values?: unknown) => ({
  type: PropertyPickerType.IMAGE,
  values,
  label,
});

export const navBar = (label = "NavBar", values?: unknown) => ({
  type: PropertyPickerType.NAV_BAR,
  values,
  label,
});

export const multiChart = (label = "MultiChart", values?: unknown) => ({
  type: PropertyPickerType.MULTI_CHART,
  values,
  label,
});

export const headerSetup = (label = "Header setup", values?: unknown) => ({
  type: PropertyPickerType.HEADER_SETUP,
  values,
  label,
});

export const report = (label = "Report", values?: unknown) => ({
  type: PropertyPickerType.REPORT,
  values,
  label,
});

export const adaptiveDashboard = (
  label = "Adaptive Dashboard",
  values?: unknown
) => ({
  type: PropertyPickerType.ADAPTIVE_DASHBOARD,
  values,
  label,
});

export const chart = (
  label = "Chart",
  values?: { timeInterval: string; type: string }
) => ({
  type: PropertyPickerType.CHART,
  values,
  label,
});

export const doughnutChart = (label = "Doughnut Chart", values?: unknown) => ({
  type: PropertyPickerType.DOUGHNUT_CHART,
  values,
  label,
});

export const trend = (label = "Trend", values?: unknown) => ({
  type: PropertyPickerType.TREND,
  values,
  label,
});

export const alarmClass = (label = "Alarm Class", values?: unknown) => ({
  type: PropertyPickerType.ALARM_CLASS,
  values,
  label,
});

export const statusTableItem = (
  label = "Status Table Item",
  values?: unknown
) => ({
  type: PropertyPickerType.STATUS_TABLE_ITEM,
  values,
  label,
});

export const tree = (label = "Tree location", values?: unknown) => ({
  type: PropertyPickerType.LOCATION_TREE,
  values,
  label,
});

export const table = (
  label = "Table",
  values: TableValues = {
    columnConfig: [],
    dataRows: [{ texts: [], tags: [], dataSources: [] }],
    style: {
      showHeader: true,
      showFooter: true,
    },
  }
) => ({
  type: PropertyPickerType.TABLE,
  label,
  values,
});
