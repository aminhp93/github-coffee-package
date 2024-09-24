import NotificationTemplate from "./NotificationTemplate";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Components",
};

export const Notification = NotificationTemplate.bind({});
