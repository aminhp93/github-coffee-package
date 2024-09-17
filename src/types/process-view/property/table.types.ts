import { FixedPropertyGroup, PropertyGroupType } from ".";

export type TableValues = {
  columnConfig: unknown[];
  dataRows: { texts: unknown[]; tags: unknown[]; dataSources: unknown[] }[];
  style: {
    [key: string]: string | boolean;
  };
};

export type TableProperties = FixedPropertyGroup<typeof PropertyGroupType.GROUP, TableValues>;
