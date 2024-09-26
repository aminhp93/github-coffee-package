// Import libraries
import * as React from "react";
import { useEffect, useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Box, ClickAwayListener } from "@mui/material";
import { DateTimeField } from "@mui/x-date-pickers/DateTimeField";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";

// Import local files
import { TimeConfig } from "./types";
import { dayjs } from "@/utils/formatter";
import CustomLayout from "./components/CustomLayout";
import CustomTextField from "./components/CustomTextField";

const styles = {
  position: "absolute",
  top: 50,
  right: 0,
  left: 0,
  zIndex: 1,
  border: "1px solid rgba(0, 0, 0, 0.12)",
  p: 1,
  bgcolor: "background.paper",
  width: 400,
};

type Props = {
  onChange?: (data: TimeConfig) => void;
  label?: string;
};

const SingleDateTimePicker = (props: Props) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const [data, setData] = useState<TimeConfig | undefined>();

  useEffect(() => {
    if (data) {
      props.onChange?.(data);
    }
  }, [data, props]);

  const handleChangeTimeConfig = (date: TimeConfig) => {
    setData(date);
  };

  const handleChangeDateTime = (date: dayjs.Dayjs | null) => {
    setData({
      type: "exact",
      value: date,
    });
  };

  const handleCheckCurrentDay = () => {
    setData({
      type: "exact",
      value: dayjs(),
    });
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Box sx={{ position: "relative" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DateTimeField"]}>
            <DateTimeField
              label={props.label ?? "Basic date time field"}
              onClick={handleClick}
              slots={{
                textField: CustomTextField,
              }}
              slotProps={{
                textField: {
                  size: "small",
                  ...data,
                },
              }}
            />
          </DemoContainer>
        </LocalizationProvider>
        {open ? (
          <Box sx={styles}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["StaticDateTimePicker"]}>
                <StaticDatePicker
                  slots={{
                    layout: CustomLayout,
                  }}
                  slotProps={{
                    layout: {
                      onChangeTimeConfig: handleChangeTimeConfig,
                      onCheckCurrentDay: handleCheckCurrentDay,
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    } as any,
                  }}
                  onChange={handleChangeDateTime}
                  value={(data?.type === "exact" && data.value) || dayjs()}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Box>
        ) : null}
      </Box>
    </ClickAwayListener>
  );
};

export { SingleDateTimePicker };
