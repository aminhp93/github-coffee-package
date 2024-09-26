import {
  Box,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Divider,
  TextField,
} from "@mui/material";
import React from "react";
import {
  useDateFormat,
  LIST_DATE_TIME_FORMAT,
  StartOfWeek,
  TimeFormat,
  DateFormat,
} from "@/hooks/useFormatDate";
import { dayjs } from "@/utils/formatter";
import { log } from "@/utils/logger";

const UseFormatDateTemplate = () => {
  const { format, changeFormat, formatDate } = useDateFormat();
  const [displayDateFormat, setDisplayDateFormat] = React.useState<
    string | undefined
  >(`${LIST_DATE_TIME_FORMAT[format.dateFormat]?.default}`);
  const [showTime, setShowTime] = React.useState<string>("on");

  const newDate = dayjs();
  log(
    displayDateFormat,
    LIST_DATE_TIME_FORMAT[format.dateFormat]?.default,
    LIST_DATE_TIME_FORMAT[format.dateFormat]?.shortForm
  );

  let customFormat = `${displayDateFormat} ${LIST_DATE_TIME_FORMAT[format.timeFormat]?.default}`;

  if (showTime === "off") {
    customFormat = `${displayDateFormat}`;
  }

  return (
    <Box
      sx={{
        "& .MuiTypography-root": {
          textTransform: "unset",
        },
      }}
    >
      <h1>{`Settings`}</h1>
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">{`Start of week`}</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          value={format.startOfWeek}
          onChange={(e) => {
            changeFormat({ startOfWeek: e.target.value as StartOfWeek });
          }}
        >
          <FormControlLabel value="Monday" control={<Radio />} label="Monday" />
          <FormControlLabel value="Sunday" control={<Radio />} label="Sunday" />
        </RadioGroup>
      </FormControl>

      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">{`Time format`}</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          value={format.timeFormat}
          name="radio-buttons-group"
          onChange={(e) => {
            changeFormat({ timeFormat: e.target.value as TimeFormat });
          }}
        >
          <FormControlLabel
            value="12-hour"
            control={<Radio />}
            label="12-hour"
          />
          <FormControlLabel
            value="24-hour"
            control={<Radio />}
            label="24-hour"
          />
        </RadioGroup>
      </FormControl>

      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">{`Date format`}</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          value={format.dateFormat}
          name="radio-buttons-group"
          onChange={(e) => {
            changeFormat({ dateFormat: e.target.value as DateFormat });
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const newData = `${(LIST_DATE_TIME_FORMAT as any)[e.target.value]?.default}`;
            setDisplayDateFormat(newData);
          }}
        >
          <FormControlLabel
            value="mm/dd/yyyy"
            control={<Radio />}
            label="mm/dd/yyyy"
          />
          <FormControlLabel
            value="dd/mm/yyyy"
            control={<Radio />}
            label="dd/mm/yyyy"
          />
          <FormControlLabel
            value="yyyy/mm/dd"
            control={<Radio />}
            label="yyyy/mm/dd"
          />
        </RadioGroup>
      </FormControl>
      <Divider />
      <h1>{`Display`}</h1>

      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">{`Show Time`}</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          value={showTime}
          name="radio-buttons-group"
          onChange={(e) => {
            setShowTime(e.target.value);
          }}
        >
          <FormControlLabel value={"on"} control={<Radio />} label={"on"} />
          <FormControlLabel value={"off"} control={<Radio />} label={"off"} />
        </RadioGroup>
      </FormControl>

      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">{`Display date format`}</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          value={displayDateFormat}
          name="radio-buttons-group"
          onChange={(e) => {
            setDisplayDateFormat(e.target.value);
          }}
        >
          <FormControlLabel
            value={LIST_DATE_TIME_FORMAT[format.dateFormat]?.default}
            control={<Radio />}
            label={LIST_DATE_TIME_FORMAT[format.dateFormat]?.default}
          />
          <FormControlLabel
            value={LIST_DATE_TIME_FORMAT[format.dateFormat]?.shortForm}
            control={<Radio />}
            label={LIST_DATE_TIME_FORMAT[format.dateFormat]?.shortForm}
          />
        </RadioGroup>
      </FormControl>
      <Divider />

      <h1>{`Result`}</h1>

      <TextField
        id="outlined-basic"
        label="Current date"
        variant="outlined"
        fullWidth
        value={newDate.format()}
      />
      <TextField
        sx={{
          mt: 4,
        }}
        id="outlined-basic"
        label="Formatted date"
        variant="outlined"
        fullWidth
        value={formatDate(newDate, customFormat)}
      />
    </Box>
  );
};

export default UseFormatDateTemplate;
