// HeaderLayout.stories.tsx
import { ToggleButton, Button } from "@mui/material";
import React from "react";
import { FilterList } from "@mui/icons-material";
import {
  HeaderLayout,
  HeaderLayoutProvider,
  useHeaderLayout,
} from "@/components/header-layout";
import { Search } from "@/components/search";

const DetailHeaderLayoutTemplate = () => {
  const { showDetailAction, setShowDetailAction } = useHeaderLayout();

  return (
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
        <ToggleButton
          key="filter"
          value="filter"
          size="small"
          selected={showDetailAction}
          onClick={() => setShowDetailAction(!showDetailAction)}
        >
          <FilterList />
        </ToggleButton>,
        <Search key="search" />,
      ]}
      detailActionNode={
        <>
          <Button key="button1" variant="contained" color="primary">
            {`Button 1`}
          </Button>
          <Button key="button1" variant="contained" color="primary">
            {`Button 1`}
          </Button>
          <Button key="button1" variant="contained" color="primary">
            {`Button 1`}
          </Button>
          <Button key="button1" variant="contained" color="primary">
            {`Button 1`}
          </Button>
          <Button key="button1" variant="contained" color="primary">
            {`Button 1`}
          </Button>
          <Button key="button1" variant="contained" color="primary">
            {`Button 1`}
          </Button>
          <Button key="button1" variant="contained" color="primary">
            {`Button 1`}
          </Button>
          <Button key="button1" variant="contained" color="primary">
            {`Button 1`}
          </Button>
          <Button key="button1" variant="contained" color="primary">
            {`Button 1`}
          </Button>
        </>
      }
    />
  );
};

const Wrapper = () => {
  return (
    <HeaderLayoutProvider>
      <DetailHeaderLayoutTemplate />
    </HeaderLayoutProvider>
  );
};

export default Wrapper;
