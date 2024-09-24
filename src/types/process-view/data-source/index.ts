export enum DataSourceType {
  OBJECT_VALUE = "objectValue",
  OBJECT_PROPERTY = "objectProperty",
  VARIABLE = "variable",
  AGGREGATION = "aggregation",
  CALCULATION = "calculation",
}

export type DataValue = number | string | undefined;

export type ItemDataSrcConfig = {
  nested: boolean;
  dataSrcId?: string;
};

export type ItemDataValueAndConfig = {
  data: DataValue;
  type?: DataSourceType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  config?: any;
};

export type ItemDataSources<K extends string = string> = Record<
  K,
  ItemDataSrcConfig
>;

export type ItemData<K extends string = string> = Record<
  K,
  ItemDataValueAndConfig
>;
