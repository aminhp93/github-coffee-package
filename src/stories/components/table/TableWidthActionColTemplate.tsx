import {
  Edit,
  FilterList,
  OpenInNew,
  Preview,
  StarBorder,
} from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  SelectProps,
} from "@mui/material";
import { StoryFn } from "@storybook/react";
import { keyBy } from "lodash";
import React from "react";

import { Tooltip } from "@/components/tooltip";
import { HeaderLayoutProvider } from "@/components/header-layout";
import {
  GridActionsCellItem,
  GridColDef,
  Table,
  TableProps,
} from "@/components/table";
import { useFilterSelect } from "@/hooks";
import { i18n, useTranslation } from "@/utils/translation/i18n";
import { fakeData } from "./Table.utils";
import ButtonChangeLanguage from "./components/ButtonChangeLanguage";

const PlaygroundTableTemplate: StoryFn<TableProps> = (args) => {
  // const smSize = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const { t } = useTranslation();

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "name",
      flex: 1,
      minWidth: 350,
    },
    {
      field: "description",
      headerName: "description",
      width: 400,
    },
    {
      field: "dataType",
      headerName: "data type",
      width: 500,
    },
    {
      field: "action",
      headerName: "",
      type: "actions",
      sortable: false,
      align: "right",
      getActions: (params) => [
        <GridActionsCellItem
          key={params.id}
          icon={
            <Tooltip title={i18n.t("open")}>
              <Preview />
            </Tooltip>
          }
          label={i18n.t("quickLook")}
        />,
        //  Menu
        <GridActionsCellItem
          key={params.id}
          icon={
            <Tooltip title={i18n.t("open")}>
              <OpenInNew />
            </Tooltip>
          }
          label={i18n.t("open")}
          showInMenu
        />,
        <GridActionsCellItem
          key={params.id}
          icon={
            <Tooltip title={i18n.t("quickLook")}>
              <Preview />
            </Tooltip>
          }
          label={i18n.t("quickLook")}
          showInMenu
        />,
        <GridActionsCellItem
          key={params.id}
          icon={
            <Tooltip title={i18n.t("edit")}>
              <Edit />
            </Tooltip>
          }
          label={i18n.t("edit")}
          showInMenu
        />,
      ],
    },
  ];

  const {
    data: filteredRows,
    filterValues,
    handleChangeFilter,
  } = useFilterSelect(fakeData(), "name");

  return (
    <>
      <ButtonChangeLanguage />
      <Table
        rows={filteredRows}
        customHeader={{
          infoList: [
            { value: "1", label: "Info 1" },
            { value: "2", label: "Info 2" },
          ],
          quickActionListNodes: [
            <Button
              variant="outlined"
              startIcon={<FilterList />}
              key="quick-action-1"
            >
              {t("QuickAction1")}
            </Button>,
            <Button
              variant="outlined"
              startIcon={<FilterList />}
              key="quick-action-2"
            >
              {t("QuickAction2")}
            </Button>,
          ],
          detailActionNode: (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Button
                startIcon={<StarBorder />}
                variant="outlined"
                className="filter-button"
                sx={{ mr: 2 }}
              >
                {t("showFavorites")}
              </Button>
              <TypeFilter
                value={filterValues || []}
                onChange={(e) =>
                  handleChangeFilter?.(
                    e as SelectChangeEvent<
                      (
                        | string
                        | number
                        | {
                            active: number;
                          }
                      )[]
                    >
                  )
                }
              />
            </Box>
          ),
        }}
        {...args}
        columns={columns}
      />
    </>
  );
};

const WrapperPlaygroundTableTemplate: StoryFn<TableProps> = (props) => {
  return (
    <HeaderLayoutProvider>
      <PlaygroundTableTemplate {...props} />
    </HeaderLayoutProvider>
  );
};

export default WrapperPlaygroundTableTemplate;

const TypeFilter = (props: SelectProps) => {
  const { t } = useTranslation();
  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel
        id="type-filter-label"
        sx={{
          top: "-8px",
        }}
      >
        {t("typeFilter")}
      </InputLabel>
      <Select
        {...props}
        labelId="type-filter-label"
        id="type-filter"
        size="small"
        multiple
        input={<OutlinedInput label="Type Filter" />}
        renderValue={(value) => {
          const keyByValue = keyBy(NODE_OPTIONS, "type");
          return (value as string[])
            .map((i) => {
              // capitalize word
              const item = keyByValue[i].text;
              return item.charAt(0).toUpperCase() + item.slice(1);
            })
            .join(", ");
        }}
      >
        {NODE_OPTIONS.map((option) => (
          <MenuItem key={option.type} value={option.type}>
            {option.text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export const NODE_OPTIONS: {
  type: string;
  text: string;
}[] = [
  { type: "controller", text: "controller" },
  { type: "unknown", text: "unknown" },
  { type: "network", text: "network" },
  { type: "folder", text: "folder" },
  { type: "process-view", text: "processView" },
  { type: "device", text: "device" },
  { type: "program", text: "program" },
  { type: "popup", text: "popup" },
  { type: "template", text: "template" },
  { type: "tag", text: "tag" },
];
