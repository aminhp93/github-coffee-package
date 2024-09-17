import * as React from "react";
import { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateTimeRangePicker } from "@mui/x-date-pickers-pro/DateTimeRangePicker";
import { SingleInputDateTimeRangeField } from "@mui/x-date-pickers-pro/SingleInputDateTimeRangeField";
import { Box, ClickAwayListener } from "@mui/material";
import { LIST_START_TIME_FRAME } from "./constants";
import { useTranslation } from "../../utils/translation";
import { DateRange } from "@mui/x-date-pickers-pro";
import dayjs, { Dayjs } from "dayjs";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { log } from "../../utils";
import { keyBy } from "lodash";
import { LIST_DATE_TIME_FORMAT } from "../../hooks/useFormatDate";

type ActionBarProps = {
  setTimeOption: (value: string) => void;
};

type CustomdatePickerProps = {
  format?: string;
};

const CustomDateTimePicker = ({ format: formatProps }: CustomdatePickerProps) => {
  const format =
    formatProps ??
    `${LIST_DATE_TIME_FORMAT["mm/dd/yyyy"]?.default} ${LIST_DATE_TIME_FORMAT["24-hour"]?.default}`;
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange<Dayjs>>([dayjs(), dayjs()]);
  const [timeOption, setTimeOption] = useState<string | null>(null);

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleChange = (dateRange: DateRange<Dayjs>) => {
    if (!dateRange[1]) {
      setSelectedDateRange([dateRange[0], dateRange[0]]);
    }
    setSelectedDateRange(dateRange);
  };

  useEffect(() => {
    if (timeOption && selectedDateRange[1]) {
      let fromDate = selectedDateRange[0];
      const toDate = selectedDateRange[1];

      const timeFrames = LIST_START_TIME_FRAME(t);
      const timeFrameObj = keyBy(timeFrames, "value");

      const result = timeFrameObj[timeOption];
      if (result) {
        fromDate = toDate.subtract(result.count, result.unit);
      } else {
        log("Invalid time option:", timeOption);
      }

      setSelectedDateRange([fromDate, toDate]);
    }
  }, [selectedDateRange, t, timeOption]);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ position: "relative" }}>
        <Box onClick={() => setOpen(true)}>
          {selectedDateRange[0] === null && selectedDateRange[1] === null
            ? "click me"
            : `${selectedDateRange[0]?.format(format)} - ${
                selectedDateRange[1] !== null ? selectedDateRange[1].format(format) : format
              }`}
        </Box>
        {open && (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["SingleInputDateTimeRangeField"]}>
              <DateTimeRangePicker
                onChange={handleChange}
                value={selectedDateRange}
                open
                slots={{
                  field: SingleInputDateTimeRangeField,
                  toolbar: Toolbar,
                  shortcuts: ShortCuts,
                  // tabs: Tabs,
                  actionBar: () => <ActionBar setTimeOption={setTimeOption} />,
                }}
                format={format}
                slotProps={{
                  actionBar: {
                    actions: ["cancel", "accept"],
                  },
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        )}
      </Box>
    </ClickAwayListener>
  );
};

export { CustomDateTimePicker };

const ActionBar = ({ setTimeOption }: ActionBarProps) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ overflow: "auto", height: "384px" }}>
      {LIST_START_TIME_FRAME(t).map((item, index) => (
        <ListItem disablePadding key={index}>
          <ListItemButton onClick={() => setTimeOption(item.value)}>
            <ListItemText>{item.label}</ListItemText>
          </ListItemButton>
        </ListItem>
      ))}
    </Box>
  );
};

// TODO: testing custom component
// const InputField = () => {
//   return <SingleInputDateTimeRangeField size="small" />;
// };

const ShortCuts = () => {
  return <Box></Box>;
};

const Toolbar = () => {
  return <Box></Box>;
};
