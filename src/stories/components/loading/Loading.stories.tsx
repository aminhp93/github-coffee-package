import LoadingTemplate from "./LoadingTemplate";
import * as argTypes from "./Loading.types";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components/Loading",
  argTypes,
};

export const LoadingStory = LoadingTemplate.bind({});
