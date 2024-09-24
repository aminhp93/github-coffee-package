import React from "react";
import { StoryFn } from "@storybook/react";
import {
  Select,
  SelectProps,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  ToggleButton,
  SelectChangeEvent,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { StarBorder, AddReaction } from "@mui/icons-material";
import { keyBy } from "lodash";

import { Table, GridColDef, TableProps } from "../../../components/table";
import { useTranslation } from "../../../utils/translation/i18n";
import { fakeData, MEDIUM_COLUMNS, SMALL_COLUMNS } from "./Table.utils";
import ButtonChangeLanguage from "./components/ButtonChangeLanguage";
import { HeaderLayoutProvider } from "../../..";
import { useFilterSelect, useIsMobile } from "../../../hooks";
import { IconButtonWithTooltip } from "../../../components";

const PlaygroundTableTemplate: StoryFn<TableProps> = (args) => {
  const smSize = useIsMobile();
  const { t } = useTranslation();

  const columns: GridColDef[] = smSize ? SMALL_COLUMNS(t) : MEDIUM_COLUMNS(t);

  const {
    data: filteredRows,
    filterValues,
    handleChangeFilter,
  } = useFilterSelect(fakeData(), "name");

  const [alignment, setAlignment] = React.useState("");

  const handleChange = (
    _: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

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
            <IconButtonWithTooltip key="filter1">
              <AddReaction />
            </IconButtonWithTooltip>,
            <IconButtonWithTooltip key="filter2">
              <AddReaction />
            </IconButtonWithTooltip>,
          ],
          detailActionNode: (
            <>
              <ToggleButtonGroup
                size="small"
                color="secondary"
                value={alignment}
                exclusive
                aria-label="Platform"
                onChange={handleChange}
              >
                <ToggleButton value="showFavorites">
                  <StarBorder
                    sx={{
                      mr: 2,
                    }}
                  />
                  <Typography>{`showFavorites`}</Typography>
                </ToggleButton>
              </ToggleButtonGroup>
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
            </>
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
  return (
    <FormControl sx={{ width: 300 }}>
      <InputLabel
        size="small"
        id="type-filter-label"
      >{`Type Filter`}</InputLabel>
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
