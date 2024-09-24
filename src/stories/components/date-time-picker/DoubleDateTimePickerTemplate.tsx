// import "@/styles/globals.css";

import React from "react";
import { DoubleDateTimePicker } from "../../../components/date-time-picker";
import { log } from "../../../utils/logger";

const DoubleDateTimePickerTemplate = () => {
  return <DoubleDateTimePicker onChange={(data) => log(data)} />;
};

export default DoubleDateTimePickerTemplate;
