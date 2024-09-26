// HeaderLayout.stories.tsx
import { Button, Typography } from "@mui/material";
import React from "react";
import { AddCircleOutlined, Downloading } from "@mui/icons-material";
import { HeaderLayout, HeaderLayoutProvider } from "@/components/header-layout";

const DefaultHeaderLayoutTemplate = () => {
  return (
    <HeaderLayoutProvider>
      <HeaderLayout
        infoList={[
          {
            value: "processViews",
            label: "processViews",
          },
          {
            value: "popups",
            label: "popups",
          },
          {
            value: "templates",
            label: "templates",
          },
        ]}
        actionListNodes={[
          <Button
            key="import"
            color="secondary"
            startIcon={<Downloading />}
            variant="text"
          >
            <Typography variant="inherit">{"import"}</Typography>
          </Button>,
          <Button
            key="addNew"
            startIcon={<AddCircleOutlined />}
            variant="contained"
            color="primary"
            className="add-new-button"
          >
            <Typography variant="inherit">{`${"addNew"}`}</Typography>
          </Button>,
        ]}
      />
    </HeaderLayoutProvider>
  );
};
export default DefaultHeaderLayoutTemplate;
