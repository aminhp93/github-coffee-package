import type { Meta } from "@storybook/react";
import DateTimePickerTemplate from "./DateTimePickerTemplate";
import SingleDateTimePickerTemplate from "./SingleDateTimePickerTemplate";
import DoubleDateTimePickerTemplate from "./DoubleDateTimePickerTemplate";
import CustomDateTimePickerTemplate from "./CustomDateTimePickerTemplate";
import { DateTimePicker } from "../../../components/date-time-picker";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/DateTimePicker",
} as Meta<typeof DateTimePicker>;

export const DateTimePickerStory = DateTimePickerTemplate.bind({});
export const SingleDateTimePickerStory = SingleDateTimePickerTemplate.bind({});
export const DoubleDateTimePickerStory = DoubleDateTimePickerTemplate.bind({});
export const CustomDateTimePickerStory = CustomDateTimePickerTemplate.bind({});
