import * as argTypes from "./Table.types";
import DefaultTableTemplate from "./DefaultTableTemplate";
import CustomHeaderTableTemplate from "./CustomHeaderTableTemplate";
import TranslationTableTemplate from "./TranslationTableTemplate";
import NoPaginationTableTemplate from "./NoPaginationTableTemplate";
import PlaygroundTableTemplate from "./PlaygroundTableTemplate";
import CheckboxSelectionTableTemplate from "./CheckboxSelectionTableTemplate";
import {
  HIDE_FOOTER,
  PAGE_SIZE_OPTIONS,
  PAGINATION,
  ROW_HEIGHT,
  COLUMN_HEADER_HEIGHT,
  HIDE_HEADER,
} from "@/components/table/Table.constants";
import { Meta } from "@storybook/react";
import { TableProps } from "@/components/table";
import TableWidthActionColTemplate from "./TableWidthActionColTemplate";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/Table",
  argTypes,
} as Meta<TableProps>;

export const DefaultTable = DefaultTableTemplate.bind({});
export const CustomHeaderTable = CustomHeaderTableTemplate.bind({});
export const TranslationTable = TranslationTableTemplate.bind({});
export const NoPaginationTable = NoPaginationTableTemplate.bind({});
export const PlaygroundTable = PlaygroundTableTemplate.bind({});
export const CheckboxSelectionTable = CheckboxSelectionTableTemplate.bind({});
export const TableWidthActionCol = TableWidthActionColTemplate.bind({});

PlaygroundTable.args = {
  checkboxSelection: false,
  disableRowSelectionOnClick: false,
  hideFooter: HIDE_FOOTER,
  hideHeader: HIDE_HEADER,
  pageSizeOptions: PAGE_SIZE_OPTIONS,
  pagination: PAGINATION,
  rowHeight: ROW_HEIGHT,
  columnHeaderHeight: COLUMN_HEADER_HEIGHT,
};
