// Import libraries
import { FilterList } from "@mui/icons-material";
import { DataGridPremiumProps, GridSlotProps } from "@mui/x-data-grid-premium";
import React from "react";
import { ToggleButton } from "@mui/material";

// Import local files
import { useSearch } from "../../hooks";
import { useTranslation } from "../../utils/translation/i18n";
import { HeaderLayoutProps, useHeaderLayout } from "../header-layout";
import { Search } from "../search";
import {
  COLUMN_HEADER_HEIGHT,
  CUSTOM_RESIZE_COLUMN,
  HIDE_FOOTER,
  PAGE_SIZE_OPTIONS,
  PAGINATION,
  ROW_HEIGHT,
  HIDE_HEADER,
} from "./Table.constants";
import { StyledDataGridPremium } from "./Table.styles";
import { getColumns, getInitialState } from "./Table.utils";
import { CustomToolbar } from "./components/CustomToolbar";
import { EmptyDataRow } from "./components/EmptyDataRow";
import { getTableLocalization } from "./localization";

export type TableProps = {
  emptyDataRowComponent?: React.JSXElementConstructor<
    GridSlotProps["noRowsOverlay"]
  >;
  customResizeColumn?: boolean;
  customHeader?: HeaderLayoutProps;
  hideHeader?: boolean;
} & DataGridPremiumProps;

const Table = ({
  customResizeColumn = CUSTOM_RESIZE_COLUMN,
  columnHeaderHeight = COLUMN_HEADER_HEIGHT,
  hideHeader = HIDE_HEADER,
  hideFooter = HIDE_FOOTER,
  pageSizeOptions = PAGE_SIZE_OPTIONS,
  pagination = PAGINATION,
  rowHeight = ROW_HEIGHT,
  customHeader,
  columns,
  rows,
  ...rest
}: TableProps) => {
  const { t } = useTranslation();
  const { showDetailAction, setShowDetailAction } = useHeaderLayout();
  const { data: searchedRows, onChangeKeyword } = useSearch([...(rows || [])]);

  const CUSTOM_HEADER: HeaderLayoutProps = {
    actionListNodes: [
      <ToggleButton
        key="filter"
        value="filter"
        size="small"
        selected={showDetailAction}
        color="secondary"
        onClick={() => setShowDetailAction(!showDetailAction)}
      >
        <FilterList />
      </ToggleButton>,
      <Search key="search" onChange={onChangeKeyword} />,
    ],
  };

  return (
    <StyledDataGridPremium
      columnHeaderHeight={columnHeaderHeight}
      initialState={getInitialState({
        customResizeColumn,
        columnHeaderHeight,
        hideFooter,
        pageSizeOptions,
        pagination,
        rowHeight,
        columns,
        ...rest,
      })}
      slots={{
        toolbar: hideHeader ? null : CustomToolbar,
        noRowsOverlay: rest.emptyDataRowComponent ?? EmptyDataRow,
      }}
      slotProps={{
        toolbar: { ...CUSTOM_HEADER, ...customHeader },
      }}
      hideFooter={hideFooter}
      pageSizeOptions={pageSizeOptions}
      pagination={pagination}
      rowHeight={rowHeight}
      localeText={rest.localeText ?? getTableLocalization(t)}
      columns={getColumns({
        customResizeColumn,
        columnHeaderHeight,
        hideFooter,
        pageSizeOptions,
        pagination,
        rowHeight,
        columns,
        ...rest,
      })}
      rows={searchedRows}
      {...rest}
    />
  );
};

export { Table };
