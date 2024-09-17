// Import libraries
import * as React from "react";
import { useState } from "react";
import {
  PickersLayoutProps,
  usePickerLayout,
  pickersLayoutClasses,
  PickersLayoutRoot,
  PickersLayoutContentWrapper,
} from "@mui/x-date-pickers/PickersLayout";
import { DateView } from "@mui/x-date-pickers/models";
import { MultiSectionDigitalClock } from "@mui/x-date-pickers/MultiSectionDigitalClock";
import {
  Tabs,
  Tab,
  Box,
  Autocomplete,
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";

// Import local files
import { dayjs, log, useTranslation } from "../../..";
import { LIST_TABS } from "./constants";
import { LIST_START_TIME_FRAME } from "../constants";
import { Range, TimeConfig } from "../types";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface Props extends PickersLayoutProps<dayjs.Dayjs | null, dayjs.Dayjs, DateView> {
  onChangeTimeConfig?: (data: TimeConfig) => void;
  onCheckCurrentDay?: () => void;
}

const CustomLayout = (props: Props) => {
  const { content } = usePickerLayout(props);
  const { t } = useTranslation();

  const [value, setValue] = useState(0);
  const [range, setRange] = useState<Range>(LIST_START_TIME_FRAME(t)[0]);
  const [checkWholeDay, setCheckWholeDay] = useState(true);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeRange = (_: React.SyntheticEvent, newValue: Range | null) => {
    if (!newValue) return;
    setRange(newValue);
    props.onChangeTimeConfig?.({
      type: "relative",
      value: newValue,
    });
  };
  const handleChangeCheckWholeDay = (_: React.SyntheticEvent, value: boolean) => {
    setCheckWholeDay(value);
  };

  const handleChangeDigitalClock = (value: string) => {
    log(value);
  };

  const handleClickCurrentDay = () => {
    props.onCheckCurrentDay?.();
  };

  return (
    <PickersLayoutRoot
      ownerState={props}
      sx={{
        overflow: "auto",
        [`.${pickersLayoutClasses.actionBar}`]: {
          gridColumn: 1,
          gridRow: 2,
        },
        [`.${pickersLayoutClasses.toolbar}`]: {
          gridColumn: 2,
          gridRow: 1,
        },
      }}
    >
      <PickersLayoutContentWrapper className={pickersLayoutClasses.contentWrapper}>
        <Box sx={{ width: "100%" }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            {LIST_TABS.map((tab, index) => (
              <Tab key={index} label={tab.label} {...a11yProps(index)} />
            ))}
          </Tabs>
        </Box>
        {value === 0 && (
          <Box>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={LIST_START_TIME_FRAME(t)}
              sx={{ width: 300 }}
              value={range}
              onChange={handleChangeRange}
              renderInput={(params) => <TextField {...params} label="Select Range" />}
            />
          </Box>
        )}
        {value === 1 && (
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {content}
              {!checkWholeDay && <MultiSectionDigitalClock onChange={handleChangeDigitalClock} />}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox checked={checkWholeDay} onChange={handleChangeCheckWholeDay} />
                  }
                  label="Whole day"
                />
              </FormGroup>

              <Button onClick={handleClickCurrentDay}>{t("Current")}</Button>
            </Box>
          </Box>
        )}
      </PickersLayoutContentWrapper>
    </PickersLayoutRoot>
  );
};

export default CustomLayout;
