import { Box } from "@mui/material";
import React from "react";
import { ContextMenu } from "../../../components/context-menu";

type PointContextMenu = {
  x: number;
  y: number;
};

export const POINT_CONTEXT_MENU_DEFAULT = {
  x: 0,
  y: 0,
};

const SearchTemplate = () => {
  const [openContextMenu, setOpenContextMenu] = React.useState<boolean>(false);
  const [pointContextMenu, setPointContextMenu] = React.useState<PointContextMenu>(
    POINT_CONTEXT_MENU_DEFAULT
  );

  const handleContextMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault(); // prevent the default behavior when right clicked
    setPointContextMenu({
      x: event.pageX,
      y: event.pageY,
    });
    setOpenContextMenu(true);
  };

  return (
    <Box
      onContextMenu={handleContextMenu}
      sx={{
        background: "gray",
      }}
    >
      {`Right click me`}
      <ContextMenu
        open={openContextMenu}
        onClose={() => setOpenContextMenu(false)}
        points={pointContextMenu}
      >
        <Box>{`list item 1`}</Box>
        <Box>{`list item 1`}</Box>
      </ContextMenu>
    </Box>
  );
};

export default SearchTemplate;
