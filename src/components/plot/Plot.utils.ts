import { DEFAULT_CHART_COLOR, getDefaultOption } from "./Plot.constants";
import { PlotDataDetail, Series } from "./Plot.types";
import Highcharts, { SeriesOptionsType } from "highcharts/highstock";
import { dayjs } from "../../utils/formatter/dayjs";
import { HoverPoints } from "./Plot";

export const SUFFIX_RANGE_SERIES = "_range";

export const getIdChartRange = (id: string) => id.split(SUFFIX_RANGE_SERIES)[0];

export const formatDate = (timestamp: number) => {
  return dayjs(timestamp).format("HH:mm:ss YYYY-MM-DD ");
};

export const getValidatedOptions = (
  newOptions: {
    tooltip?: Highcharts.TooltipOptions;
    navigator?: Highcharts.NavigatorOptions;
    yAxis?: Highcharts.YAxisOptions[];
    xAxis?: Highcharts.XAxisOptions[] | Highcharts.XAxisOptions;
    series?: Highcharts.SeriesOptionsType[];
    plotOptions?: Highcharts.PlotOptions;
  },
  oldOptions: Highcharts.Options
) => {
  const validatedOptions = { ...oldOptions };

  if (newOptions.tooltip !== undefined) {
    validatedOptions.tooltip = {
      ...validatedOptions.tooltip,
      ...newOptions.tooltip,
    };
  }

  if (newOptions.navigator !== undefined) {
    validatedOptions.navigator = {
      ...validatedOptions.navigator,
      ...newOptions.navigator,
    };
  }

  if (newOptions.yAxis !== undefined) {
    validatedOptions.yAxis = newOptions.yAxis;
  }

  if (newOptions.xAxis !== undefined) {
    validatedOptions.xAxis = newOptions.xAxis;
  }

  if (newOptions.series !== undefined) {
    validatedOptions.series = newOptions.series;
  }

  if (newOptions.plotOptions !== undefined) {
    validatedOptions.plotOptions = {
      ...validatedOptions.plotOptions,
      ...newOptions.plotOptions,
    };
  }

  return validatedOptions;
};

export const isEnumTag = (tag: PlotDataDetail) =>
  tag.dataType === "enum" || tag.dataType === "digital";

const getXTitleYAxis = (i: number, isEnum: boolean) => {
  if (i === 0) {
    if (isEnum) {
      return 0;
    }
    return 65;
  }
  return isEnum ? 95 : 50;
};

export const getOptionsRowSelectionModelChange = (
  rows: string[],
  prev: Highcharts.Options
) => {
  const newSeries: Highcharts.SeriesOptionsType[] = [];
  const newYAxis: Highcharts.YAxisOptions[] = [];

  const objIndexYAxisVisible: {
    [key: string]: boolean[];
  } = {};

  prev.series?.forEach((item) => {
    if (rows.includes(item.id?.replace(SUFFIX_RANGE_SERIES, "") ?? "")) {
      newSeries.push({ ...item, visible: true });
      if (item.yAxis) {
        if (!objIndexYAxisVisible[item.yAxis]) {
          objIndexYAxisVisible[item.yAxis] = [true];
        } else {
          objIndexYAxisVisible[item.yAxis] = [
            ...objIndexYAxisVisible[item.yAxis],
            true,
          ];
        }
      }
    } else {
      newSeries.push({ ...item, visible: false });
      if (item.yAxis) {
        if (!objIndexYAxisVisible[item.yAxis]) {
          objIndexYAxisVisible[item.yAxis] = [false];
        } else {
          objIndexYAxisVisible[item.yAxis] = [
            ...objIndexYAxisVisible[item.yAxis],
            false,
          ];
        }
      }
    }
  });

  Object.keys(objIndexYAxisVisible).forEach((key) => {
    // if all value is false, set yAxis visible to false
    if (objIndexYAxisVisible[key].every((item) => !item)) {
      newYAxis.push({
        ...(prev.yAxis as Highcharts.YAxisOptions[])[Number(key)],
        visible: false,
      });
    } else {
      newYAxis.push({
        ...(prev.yAxis as Highcharts.YAxisOptions[])[Number(key)],
        visible: true,
      });
    }
  });
  return {
    series: newSeries,
    yAxis: newYAxis,
  };
};

export const getOptionsRowRemove = (
  row: PlotDataDetail,
  prev: Highcharts.Options
) => {
  let newSeries = prev.series as Highcharts.SeriesOptionsType[];
  let newYAxis = prev.yAxis as Highcharts.YAxisOptions[];

  const deleteSeries = prev.series?.find((item) => item.id === row.id);
  const deleteSeriesYAxis = deleteSeries?.yAxis;

  //  find all series with the same yAxis
  const seriesWithSameYAxis =
    prev.series?.filter((item) => item.yAxis === deleteSeriesYAxis) || [];
  if (seriesWithSameYAxis.length === 1) {
    // delete yAxis in prev.yAxis at index deleteSeriesYAxis
    newYAxis =
      (prev.yAxis as Highcharts.YAxisOptions[]).filter(
        (_, index) => index !== deleteSeriesYAxis
      ) || [];

    newSeries = newSeries
      .filter((item) => {
        let id = item.id;
        if (item.type === "arearange" && item.id !== undefined) {
          id = getIdChartRange(item.id);
        }
        return id !== row.id;
      }) // remove series in prev.series at index deleteSeriesYAxis
      .map((item) => {
        // update yAxis by reducing 1
        if (
          deleteSeriesYAxis !== undefined &&
          item.yAxis !== undefined &&
          item.yAxis > deleteSeriesYAxis
        ) {
          return { ...item, yAxis: (item.yAxis as number) - 1 };
        }
        return item;
      });
  } else {
    // don't delete in yAxis
    // delete series in prev.series at index deleteSeriesYAxis
    newSeries = prev.series?.filter((item) => {
      let id = item.id;
      if (item.type === "arearange" && item.id !== undefined) {
        id = getIdChartRange(item.id);
      }
      return id !== row.id;
    }) as Highcharts.SeriesOptionsType[];
  }

  return {
    series: newSeries,
    yAxis: newYAxis,
  };
};

type Config = {
  from: string;
  to: string;
};

export const getOptionsFromData = (data: PlotDataDetail[], config?: Config) => {
  let newXAxis: Highcharts.XAxisOptions = {
    ...(getDefaultOption().xAxis as Highcharts.XAxisOptions),
  };
  // get list yAxis, unique by dataType and dataUnit
  const newYAxis: Highcharts.YAxisOptions[] = [];
  const keyYAxis: {
    dataType: string;
    dataUnit: string;
  }[] = [];
  const newSeries: Highcharts.SeriesOptionsType[] = [];
  let latestOffset = 0;

  let colorCount = 0;
  data.forEach((item, i) => {
    // find yAxis
    const index = keyYAxis.findIndex(
      (key) => key.dataType === item.dataType && key.dataUnit === item.dataUnit
    );
    const isEnum = isEnumTag(item);

    // No yAxis found, update yAxis and series
    if (index === -1) {
      const tickInterval = isEnum ? 1 : undefined;
      let tickAmount;

      if (isEnum && item.customUnit) {
        tickAmount = Object.keys(item.customUnit).length + 2;
      } else {
        tickAmount = undefined;
      }

      keyYAxis.push({ dataType: item.dataType, dataUnit: item.dataUnit });

      newYAxis.push({
        ...getDefaultOption().yAxis,
        id: `${i.toString()}_${isEnum ? "enum" : "number"}`,
        title: {
          text: `${item.dataType} ${item.dataUnit}`,
          align: "high",
          y: -5,
          x: getXTitleYAxis(i, isEnum),
          rotation: 0,
          style: {
            color: DEFAULT_CHART_COLOR[colorCount],
          },
          offset: latestOffset === 0 ? 50 : latestOffset,
        },
        opposite: false,
        offset: latestOffset,
        tickInterval,
        tickAmount,
        visible: true,
        gridLineWidth: isEnum ? 0 : 1,
        categories:
          isEnum && item.customUnit ? Object.keys(item.customUnit) : undefined,
        labels: {
          style: {
            color: DEFAULT_CHART_COLOR[colorCount],
          },
          formatter: (data) => {
            if (isEnum) {
              return `<div class="yAxis-enum-label" style="max-width: 100px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; position:"relative">${
                item.customUnit?.[data.value]
              }
              <div class="yAxis-enum-tooltip" style="visibility:hidden; position:absolute">${
                item.customUnit?.[data.value]
              }</div>
              </div>
              `;
            } else {
              return `<div style="max-width: 100px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${data.value}</div>`;
            }
          },
          useHTML: true,
        },
      });

      // after add new yAxis, update offset for next yAxis
      colorCount++;
      const baseOffset = isEnum ? 110 : 50;
      latestOffset += baseOffset;
    }

    const yAxis = index === -1 ? newYAxis.length - 1 : index;

    newSeries.push({
      id: item.id,
      name: item.name,
      data: item.data,
      type: "line",
      visible: true,
      zIndex: 1,
      yAxis,
      // Magic number 9 is the length of DEFAULT_CHART_COLOR. Refactor this color later
      color: DEFAULT_CHART_COLOR[i % 9],
    });

    if (item.dataRange) {
      newSeries.push({
        id: item.id + SUFFIX_RANGE_SERIES,
        name: item.name + " range",
        data: item.dataRange,
        type: "arearange",
        visible: true,
        fillOpacity: 0.2,
        // yAxis,
        lineWidth: 0,
        zIndex: 0,
        linkedTo: ":previous",
        marker: {
          enabled: false,
        },
        color: DEFAULT_CHART_COLOR[i % 9],
      });
    }
  });

  if (config) {
    const from = new Date(config?.from).getTime();
    const to = new Date(config?.to).getTime();

    newXAxis = {
      type: "datetime",
      tickInterval: 24 * 3600 * 1000,
      min: from,
      max: to,
    };
  }

  return {
    series: newSeries,
    yAxis: newYAxis,
    xAxis: newXAxis,
  };
};

export type PlotTableProps = SeriesOptionsType[] & {
  point?: HoverPoints[string];
};

export const filteredRowTable = (
  data: SeriesOptionsType[],
  hoverData?: HoverPoints
) => {
  const dataFilter = data.filter((item) => {
    const isAreaRangeSeries = item.type === "arearange";
    return !isAreaRangeSeries;
  });
  const dataSet = dataFilter.map((item) => {
    if (item.id !== undefined && item.visible) {
      const point = hoverData?.[item.id];
      if (point) {
        return { ...item, point };
      }
    }
    return item;
  });

  return dataSet;
};

export const getDataHover = (data: SeriesOptionsType[], x: number) => {
  const dataPoints: HoverPoints = {};
  data?.forEach((serie) => {
    const point = (serie as Series).data.find((point) => point[0] === x);

    if (!point) return;

    if (serie.id !== undefined) {
      if (serie.type !== "arearange") {
        dataPoints[serie.id] = {
          ...dataPoints[serie.id],
          avg: point[1],
        };
      } else {
        const idSplit = serie.id.split(SUFFIX_RANGE_SERIES)[0];
        dataPoints[idSplit] = {
          ...dataPoints[idSplit],
          max: point[1],
          min: point[2],
        };
      }
    }
  });

  return dataPoints;
};
