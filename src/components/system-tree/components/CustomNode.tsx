// Import libraries
import { Add, KeyboardArrowRight, MoreVert } from "@mui/icons-material";
import { Box, Checkbox, IconButton, Typography } from "@mui/material";
import React from "react";

// Import local files
import TypeIcon from "./TypeIcon";
import { CustomNodeProps } from "../types";
import {
  StyledBoxRoot,
  StyledBoxIcon,
  StyledBoxText,
  StyledText,
  StyledBoxTypeIcon,
  StyledBoxActionsGroup,
} from "./CustomNode.styles";

const CustomNode = (props: CustomNodeProps) => {
  const { droppable, id, text, data } = props.node;

  const indent = props.depth * 24;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    props.onToggle(id);
    props.onClickNode(props.node);
  };

  const onClickNode = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!props.isOpen) props.onToggle(id);
    props.onClickNode(props.node);
  };

  const handleSelect = () => props.onSelect(props.node);

  const handleClickButton = (
    e: React.MouseEvent<HTMLElement>,
    type: string
  ) => {
    e.stopPropagation();
    props.setAnchorEl?.(e.currentTarget);
    props.setClickedActionsButton(id);

    const options = {
      type,
      options:
        type === "add"
          ? data?.addButton?.options
          : data?.moreActionsButton?.options,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props.setOptionMenu(options as any);
  };

  const renderLeftSide = () => {
    return (
      <>
        <StyledBoxIcon className={props.isOpen ? "isOpen" : ""}>
          {droppable && (
            <Box>
              <KeyboardArrowRight onClick={handleToggle} />
            </Box>
          )}
        </StyledBoxIcon>
        {!props.hideCheckbox && (
          <Box>
            <Checkbox
              indeterminate={props.isIndeterminate}
              color="primary"
              size="small"
              checked={props.isSelected}
              onClick={handleSelect}
            />
          </Box>
        )}

        <StyledBoxTypeIcon>
          <TypeIcon isOpen={props.isOpen} type={data?.type} />
        </StyledBoxTypeIcon>

        <StyledBoxText>
          <StyledText color="inherit" variant="body2">
            {text}
          </StyledText>
        </StyledBoxText>
      </>
    );
  };

  const renderRightSide = () => {
    const showRightSide =
      data?.addButton?.show ??
      data?.moreActionsButton?.show ??
      data?.descriptionText?.show;

    if (!showRightSide) return <></>;

    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {!props.hideActionButton && (
          <StyledBoxActionsGroup
            show={props.fixActionsButton}
            className="actions-group"
          >
            {data?.addButton?.show && (
              <IconButton
                sx={{ mr: 1.5 }}
                onClick={(e) => {
                  handleClickButton(e, "add");
                }}
              >
                <Add />
              </IconButton>
            )}

            {data?.moreActionsButton?.show && (
              <IconButton
                onClick={(e) => {
                  handleClickButton(e, "more-actions");
                }}
              >
                <MoreVert />
              </IconButton>
            )}
          </StyledBoxActionsGroup>
        )}
        {data?.descriptionText && (
          <Box>
            {data.descriptionText.show && (
              <Typography variant="body2">
                {data.descriptionText.text}
              </Typography>
            )}
          </Box>
        )}
      </Box>
    );
  };

  return (
    <StyledBoxRoot
      className={props.isSelected ? "isSelected" : ""}
      style={{ paddingInlineStart: indent }}
      onClick={onClickNode}
    >
      {renderLeftSide()}
      {renderRightSide()}
    </StyledBoxRoot>
  );
};

export default CustomNode;
