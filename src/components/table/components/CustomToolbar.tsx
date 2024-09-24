// Import libraries
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid-premium";
import React from "react";
import { HeaderLayout } from "../../header-layout";
import { Box } from "@mui/material";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CustomToolbar(props: any) {
  return (
    <Box sx={{ pb: 2, px: 2 }}>
      <HeaderLayout
        customToolbarNode={
          <GridToolbarContainer
            sx={{
              padding: 0,
              "& .MuiButton-startIcon": {
                marginRight: "0px",
                marginLeft: "-1px",
              },
              "& .MuiButton-root": {
                minWidth: "36px",
                height: "40px",
              },
            }}
          >
            <GridToolbarColumnsButton
              ref={(ref) =>
                ref &&
                ref.childNodes.forEach(
                  (c) => c.nodeType === Node.TEXT_NODE && c.remove()
                )
              }
              slotProps={{
                button: { color: "secondary" },
              }}
            />
            <GridToolbarFilterButton
              ref={(ref) =>
                ref &&
                ref.childNodes.forEach(
                  (c) => c.nodeType === Node.TEXT_NODE && c.remove()
                )
              }
              slotProps={{
                button: { color: "secondary" },
              }}
            />
            <GridToolbarDensitySelector
              ref={(ref) =>
                ref &&
                ref.childNodes.forEach(
                  (c) => c.nodeType === Node.TEXT_NODE && c.remove()
                )
              }
              slotProps={{
                button: { color: "secondary" },
              }}
            />
            <GridToolbarExport
              ref={(ref) =>
                ref &&
                ref.childNodes.forEach(
                  (c) => c.nodeType === Node.TEXT_NODE && c.remove()
                )
              }
              slotProps={{
                button: { color: "secondary" },
              }}
            />
          </GridToolbarContainer>
        }
        {...props}
      />
    </Box>
  );
}
