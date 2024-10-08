import { TFunction } from "i18next";

export const getTableLocalization = (t: TFunction) => {
  return {
    noRowsLabel: t("_table.noRowsLabel"),
    noResultsOverlayLabel: t("_table.noResultsOverlayLabel"),
    errorOverlayDefaultLabel: t("_table.errorOverlayDefaultLabel"),
    toolbarDensity: t("_table.toolbarDensity"),
    toolbarDensityLabel: t("_table.toolbarDensityLabel"),
    toolbarDensityCompact: t("_table.toolbarDensityCompact"),
    toolbarDensityStandard: t("_table.toolbarDensityStandard"),
    toolbarDensityComfortable: t("_table.toolbarDensityComfortable"),
    toolbarColumns: t("_table.toolbarColumns"),
    toolbarColumnsLabel: t("_table.toolbarColumnsLabel"),
    toolbarFilters: t("_table.toolbarFilters"),
    toolbarFiltersLabel: t("_table.toolbarFiltersLabel"),
    toolbarFiltersTooltipHide: t("_table.toolbarFiltersTooltipHide"),
    toolbarFiltersTooltipShow: t("_table.toolbarFiltersTooltipShow"),
    toolbarFiltersTooltipActive: (count: number): string =>
      t("_table.toolbarFiltersTooltipActive", { count }),
    toolbarExport: t("_table.toolbarExport"),
    toolbarExportLabel: t("_table.toolbarExportLabel"),
    toolbarExportCSV: t("_table.toolbarExportCSV"),
    toolbarExportPrint: t("_table.toolbarExportPrint"),
    columnsPanelTextFieldLabel: t("_table.columnsPanelTextFieldLabel"),
    columnsPanelTextFieldPlaceholder: t(
      "_table.columnsPanelTextFieldPlaceholder"
    ),
    columnsPanelDragIconLabel: t("_table.columnsPanelDragIconLabel"),
    columnsPanelShowAllButton: t("_table.columnsPanelShowAllButton"),
    columnsPanelHideAllButton: t("_table.columnsPanelHideAllButton"),
    filterPanelAddFilter: t("_table.filterPanelAddFilter"),
    filterPanelDeleteIconLabel: t("_table.filterPanelDeleteIconLabel"),
    filterPanelLinkOperator: t("_table.filterPanelLinkOperator"),
    filterPanelOperators: t("_table.filterPanelOperators"),
    filterPanelOperatorAnd: t("_table.filterPanelOperatorAnd"),
    filterPanelOperatorOr: t("_table.filterPanelOperatorOr"),
    filterPanelColumns: t("_table.filterPanelColumns"),
    filterPanelInputLabel: t("_table.filterPanelInputLabel"),
    filterPanelInputPlaceholder: t("_table.filterPanelInputPlaceholder"),
    filterOperatorContains: t("_table.filterOperatorContains"),
    filterOperatorEquals: t("_table.filterOperatorEquals"),
    filterOperatorStartsWith: t("_table.filterOperatorStartsWith"),
    filterOperatorEndsWith: t("_table.filterOperatorEndsWith"),
    filterOperatorIs: t("_table.filterOperatorIs"),
    filterOperatorNot: t("_table.filterOperatorNot"),
    filterOperatorAfter: t("_table.filterOperatorAfter"),
    filterOperatorOnOrAfter: t("_table.filterOperatorOnOrAfter"),
    filterOperatorBefore: t("_table.filterOperatorBefore"),
    filterOperatorOnOrBefore: t("_table.filterOperatorOnOrBefore"),
    filterOperatorIsEmpty: t("_table.filterOperatorIsEmpty"),
    filterOperatorIsNotEmpty: t("_table.filterOperatorIsNotEmpty"),
    filterOperatorIsAnyOf: t("_table.filterOperatorIsAnyOf"),
    filterValueAny: t("_table.filterValueAny"),
    filterValueTrue: t("_table.filterValueTrue"),
    filterValueFalse: t("_table.filterValueFalse"),
    columnMenuLabel: t("_table.columnMenuLabel"),
    columnMenuShowColumns: t("_table.columnMenuShowColumns"),
    columnMenuFilter: t("_table.columnMenuFilter"),
    columnMenuHideColumn: t("_table.columnMenuHideColumn"),
    columnMenuUnsort: t("_table.columnMenuUnsort"),
    columnMenuSortAsc: t("_table.columnMenuSortAsc"),
    columnMenuSortDesc: t("_table.columnMenuSortDesc"),
    columnHeaderFiltersTooltipActive: (count: number): string =>
      t("_table.columnHeaderFiltersTooltipActive", { count }),
    columnHeaderFiltersLabel: t("_table.columnHeaderFiltersLabel"),
    columnHeaderSortIconLabel: t("_table.columnHeaderSortIconLabel"),
    footerRowSelected: (count: number): string =>
      t("_table.footerRowSelected", { count }),
    footerTotalRows: t("_table.footerTotalRows"),
    footerTotalVisibleRows: (
      visibleCount: number,
      totalCount: number
    ): string =>
      t("_table.footerTotalVisibleRows", { visibleCount, totalCount }),
    checkboxSelectionHeaderName: t("_table.checkboxSelectionHeaderName"),
    checkboxSelectionSelectAllRows: t("_table.checkboxSelectionSelectAllRows"),
    checkboxSelectionUnselectAllRows: t(
      "_table.checkboxSelectionUnselectAllRows"
    ),
    checkboxSelectionSelectRow: t("_table.checkboxSelectionSelectRow"),
    checkboxSelectionUnselectRow: t("_table.checkboxSelectionUnselectRow"),
    booleanCellTrueLabel: t("_table.booleanCellTrueLabel"),
    booleanCellFalseLabel: t("_table.booleanCellFalseLabel"),
    actionsCellMore: t("_table.actionsCellMore"),
    pinToLeft: t("_table.pinToLeft"),
    pinToRight: t("_table.pinToRight"),
    unpin: t("_table.unpin"),
    treeDataGroupingHeaderName: t("_table.treeDataGroupingHeaderName"),
    treeDataExpand: t("_table.treeDataExpand"),
    treeDataCollapse: t("_table.treeDataCollapse"),
    groupingColumnHeaderName: t("_table.groupingColumnHeaderName"),
    groupColumn: (name: string): string => t("_table.groupColumn", { name }),
    unGroupColumn: (name: string): string =>
      t("_table.unGroupColumn", { name }),
    expandDetailPanel: t("_table.expandDetailPanel"),
    collapseDetailPanel: t("_table.collapseDetailPanel"),
    rowReorderingHeaderName: t("_table.rowReorderingHeaderName"),
  };
};
