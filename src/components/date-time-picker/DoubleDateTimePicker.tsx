// Import libraries
import * as React from "react";
import { SingleDateTimePicker } from "./SingleDateTimePicker";
import { Box } from "@mui/material";
import { TimeConfig } from "./types";

type Props = {
  onChange?: (data: { from?: TimeConfig; to?: TimeConfig }) => void;
};

const DoubleDateTimePicker = (props: Props) => {
  const [from, setFrom] = React.useState<TimeConfig | undefined>();
  const [to, setTo] = React.useState<TimeConfig | undefined>();

  const handleChangeFrom = (date: TimeConfig) => {
    setFrom(date);
  };

  const handleChangeTo = (date: TimeConfig) => {
    setTo(date);
  };

  React.useEffect(() => {
    props.onChange?.({ from, to });
  }, [from, to, props]);

  return (
    <Box sx={{ display: "flex" }}>
      <Box>
        <SingleDateTimePicker label="From" onChange={handleChangeFrom} />
      </Box>
      <Box ml={2}>
        <SingleDateTimePicker label="To" onChange={handleChangeTo} />
      </Box>
    </Box>
  );
};

export { DoubleDateTimePicker };
