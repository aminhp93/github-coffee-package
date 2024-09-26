import * as React from "react";
import {
  Button,
  Box,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
  ToggleButtonGroupProps,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  HeaderLayoutProvider,
  Table,
  IconButtonWithTooltip,
  GridColDef,
} from "@/components";

const columns: GridColDef[] = [
  { field: "color", headerName: "Color", width: 100 },
  { field: "variant", headerName: "Variant", width: 100 },
  {
    field: "text",
    headerName: "Text",
    width: 130,
    renderCell: (params) => (
      <Button variant={params.row.variant} color={params.row.color}>
        {`Label`}
      </Button>
    ),
  },
  {
    field: "disableText",
    headerName: "Disable Text",
    width: 130,
    renderCell: (params) => (
      <Button variant={params.row.variant} color={params.row.color} disabled>
        {`Label`}
      </Button>
    ),
  },
  {
    field: "textWithIcon",
    headerName: "Text with icon",
    width: 130,
    renderCell: (params) => (
      <Button
        variant={params.row.variant}
        color={params.row.color}
        startIcon={<Close />}
      >
        {`Label`}
      </Button>
    ),
  },
  {
    field: "disableTextWithIcon",
    headerName: "Disable Text with icon",
    width: 130,
    renderCell: (params) => (
      <Button
        variant={params.row.variant}
        color={params.row.color}
        startIcon={<Close />}
        disabled
      >
        {`Label`}
      </Button>
    ),
  },
  {
    field: "toggleButtonWithTextAndIcon",
    headerName: "Toggle Button with Text and Icon",
    width: 130,
    renderCell: (params) => (
      <ToggleButtonComp
        color={params.row.color}
        text="Label"
        icon={<Close />}
      />
    ),
  },
  {
    field: "toggleButtonWithIcon",
    headerName: "Toggle Button with Icon",
    width: 130,
    renderCell: (params) => (
      <ToggleButtonComp color={params.row.color} icon={<Close />} />
    ),
  },
  {
    field: "toggleButtonWithText",
    headerName: "Toggle Button with Text",
    width: 130,
    renderCell: (params) => (
      <ToggleButtonComp color={params.row.color} text="Label" />
    ),
  },
  {
    field: "iconNoBorder",
    headerName: "Icon No Border",
    width: 130,
    renderCell: (params) => (
      <IconButton aria-label="close" color={params.row.color}>
        <Close />
      </IconButton>
    ),
  },
  {
    field: "iconWithBorder",
    headerName: "Icon With Border",
    width: 130,
    renderCell: (params) => (
      <IconButtonWithTooltip
        buttonProps={{
          color: params.row.color,
          variant: params.row.variant,
        }}
      >
        <Close />
      </IconButtonWithTooltip>
    ),
  },
  {
    field: "disableIOconWithBorder",
    headerName: "Disable Icon With Border",
    width: 130,
    renderCell: (params) => (
      <IconButtonWithTooltip
        buttonProps={{
          color: params.row.color,
          variant: params.row.variant,
          disabled: true,
        }}
      >
        <Close />
      </IconButtonWithTooltip>
    ),
  },
  {
    field: "disableIconNoBorder",
    headerName: "Disable Icon No Border",
    width: 130,
    renderCell: (params) => (
      <IconButton aria-label="close" color={params.row.color} disabled>
        <Close />
      </IconButton>
    ),
  },
  {
    field: "loadingButton",
    headerName: "Loading Button",
    width: 130,
    renderCell: (params) => (
      <LoadingButton
        loading={true}
        variant={params.row.variant}
        color={params.row.color}
        disabled
      >
        <span>{`disabled`}</span>
      </LoadingButton>
    ),
  },
];

const ButtonTemplate = () => {
  return (
    <Box sx={{ height: "600px" }}>
      <HeaderLayoutProvider>
        <Table rows={rows} columns={columns} rowHeight={60} />
      </HeaderLayoutProvider>
    </Box>
  );
};

export default ButtonTemplate;

const colors = ["primary", "secondary", "error"];
const variants = ["contained", "text", "outlined"];

const rows = colors.flatMap((color, index1) =>
  variants.map((variant, index2) => ({
    id: index1 * 3 + index2 + 1,
    color,
    variant,
  }))
);

const ToggleButtonComp = ({
  color,
  text,
  icon,
}: {
  color: ToggleButtonGroupProps["color"];
  text?: string;
  icon?: React.ReactNode;
}) => {
  const [alignment, setAlignment] = React.useState("web");

  const handleChange = (
    _: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      size="small"
      color={color}
      value={alignment}
      exclusive
      aria-label="Platform"
      onChange={handleChange}
    >
      <ToggleButton value="web">
        {text && <Typography>{text}</Typography>}
        {icon}
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
