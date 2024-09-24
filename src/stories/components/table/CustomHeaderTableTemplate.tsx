import React from "react";
import { FilterList, StarBorder } from "@mui/icons-material";
import {
  Button,
  Box,
  Select,
  SelectProps,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import { keyBy } from "lodash";

import { Table, GridColDef } from "../../../components/table";
import { useTranslation } from "../../../utils/translation/i18n";
import { MEDIUM_COLUMNS, SMALL_COLUMNS, fakeData } from "./Table.utils";
import { Theme, useMediaQuery } from "../../../theme";
import { HeaderLayoutProvider } from "../../..";
import { useFilterSelect } from "../../../hooks";

const CustomHeaderTableTemplate = () => {
  const smSize = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
  const { t } = useTranslation();
  const columns: GridColDef[] = smSize ? SMALL_COLUMNS(t) : MEDIUM_COLUMNS(t);

  const {
    data: filteredRows,
    filterValues,
    handleChangeFilter,
  } = useFilterSelect(fakeData(), "name");

  return (
    <Table
      sx={{
        minHeight: 300,
      }}
      rows={filteredRows}
      columns={columns}
      hideHeader
      customHeader={{
        priorityActionListNodes: [
          <Button startIcon={<FilterList />} key="force-action-1">
            {"Force action 1"}
          </Button>,
          <Button startIcon={<FilterList />} key="force-action-2">
            {"Force action 2"}
          </Button>,
          <Button startIcon={<FilterList />} key="force-action-3">
            {"Force action 3"}
          </Button>,
        ],

        infoList: [
          { value: "1", label: "Info 1" },
          { value: "2", label: "Info 2" },
        ],
        quickActionListNodes: [
          <Button variant="outlined" startIcon={<FilterList />} key="quick-action-1">
            {"Quick action 1"}
          </Button>,
          <Button variant="outlined" startIcon={<FilterList />} key="quick-action-2">
            {"Quick action 2"}
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
    />
  );
};

const WrapperCustomHeaderTableTemplate = () => {
  return (
    <HeaderLayoutProvider>
      <CustomHeaderTableTemplate />
    </HeaderLayoutProvider>
  );
};

export default WrapperCustomHeaderTableTemplate;

const TypeFilter = (props: SelectProps) => {
  return (
    <FormControl sx={{ width: 300 }}>
      <InputLabel
        id="type-filter-label"
        sx={{
          top: "-8px",
        }}
      >
        {"Type Filter"}
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
