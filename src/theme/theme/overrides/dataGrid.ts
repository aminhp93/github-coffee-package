const DataGrid = () => {
  return {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          "--DataGrid-pinnedBackground": "inherit", // Set your custom color here
          "& .MuiDataGrid-row.Mui-selected:hover .MuiDataGrid-cell--pinnedLeft, .MuiDataGrid-row.Mui-selected:hover .MuiDataGrid-cell--pinnedRight":
            {
              backgroundColor: "unset !important",
            },
        },
        columnHeaderTitleContainerContent: {
          fontSize: "0.75rem",
          fontWeight: 500,
          lineHeight: 1.75,
        },
      },
    },
  };
};

export default DataGrid;
