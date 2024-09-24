import { styled } from "@mui/material";
import { DataGridPremium, gridClasses } from "@mui/x-data-grid-premium";

// Import local files
import { FOOTER_HEIGHT } from "./Table.constants";

export const StyledDataGridPremium = styled(DataGridPremium)(({ theme }) => ({
  border: "none",
  // Hide outline when a cell is selected in the data grid.
  [`& .${gridClasses.columnHeader}, & .${gridClasses.cell}`]: {
    outline: "transparent",
  },
  [`& .${gridClasses.columnHeader}:focus-within, & .${gridClasses.cell}:focus-within`]:
    {
      outline: "none",
    },

  "& .MuiDataGrid-cell": {
    color: theme.palette.text.primary,
  },

  "& .MuiDataGrid-row:hover": {
    "& .MuiDataGrid-actionsCell, & .MuiDataGrid-rowReorderCell": {
      button: {
        visibility: "visible",
      },
    },
  },

  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    borderRadius: "unset",
    ".MuiDataGrid-columnHeaderTitle": {
      fontWeight: theme.typography.fontWeightBold,
    },
  },

  "& .MuiDataGrid-actionsCell, .MuiDataGrid-rowReorderCell": {
    "button:not([aria-label='more'])": {
      visibility: "hidden",
    },
    "& .MuiSvgIcon-root": {
      fontSize: theme.spacing(6),
    },
  },

  "& .MuiDataGrid-cell--withRightBorder": {
    borderRightWidth: 0,
  },

  "& .MuiDataGrid-columnHeader--withRightBorder": {
    borderRightWidth: 0,
  },

  "& .MuiDataGrid-filler--pinnedLeft": {
    borderRightWidth: 0,
  },

  "& .MuiDataGrid-footerContainer": {
    height: FOOTER_HEIGHT,
    minHeight: FOOTER_HEIGHT,
  },
  // '& .MuiDataGrid-pinnedColumnHeaders': {
  //   backgroundColor: theme.palette.background.paper,
  // },
  // '& .MuiDataGrid-pinnedColumnHeaders--left': {
  //   backgroundColor: theme.palette.background.paper,
  // },
  // '& .MuiDataGrid-pinnedColumnHeaders--right': {
  //   backgroundColor: theme.palette.background.paper,
  // },
  // '& .MuiDataGrid-pinnedColumn--left': {
  //   backgroundColor: theme.palette.background.paper,
  // },
  // '& .MuiDataGrid-pinnedColumn--right': {
  //   backgroundColor: theme.palette.background.paper,
  // },
}));
