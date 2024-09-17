import { SelectChangeEvent } from "@mui/material";
import { useMemo, useState } from "react";

/**
 * Hook for filtering tables
 *
 * @param rowsData array of rows,
 * @param filterField the field of row data to filter
 */
export function useFilterSelect<T1 extends object = { [key: string]: unknown }>(
  rowsData: T1[],
  filterField: keyof T1
) {
  const [filterValues, setFilterValues] = useState<T1[keyof T1][]>([]);

  const data = useMemo(() => {
    if (filterValues.length === 0) return rowsData;
    const filterValuesSet = new Set(filterValues);
    return rowsData.filter((row) => filterValuesSet.has(row[filterField]));
  }, [filterValues, rowsData, filterField]);

  const handleChangeFilter = (event: SelectChangeEvent<typeof filterValues>) => {
    const {
      target: { value },
    } = event;
    setFilterValues(
      // On autofill we get a stringified value.
      typeof value === "string" ? (value ? (value.split(",") as T1[keyof T1][]) : []) : value
    );
  };

  return {
    data,
    filterValues,
    handleChangeFilter,
  };
}
