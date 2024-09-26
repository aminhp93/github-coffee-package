import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  DateTimePicker as MuiDateTimePicker,
  DateTimePickerProps,
} from "@mui/x-date-pickers/DateTimePicker";
import { dayjs } from "@/utils/formatter";

const DateTimePicker = (props: DateTimePickerProps<dayjs.Dayjs>) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateTimePicker"]}>
        <MuiDateTimePicker {...props} />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export { DateTimePicker };
