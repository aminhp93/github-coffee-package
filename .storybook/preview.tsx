// import type { Preview } from "@storybook/react";

// const preview: Preview = {
//   parameters: {
//     controls: {
//       matchers: {
//         color: /(background|color)$/i,
//         date: /Date$/i,
//       },
//     },
//   },
// };

// export default preview;

import React from "react";

import { Preview } from "@storybook/react";
import { DialogContainer } from "../src/components/dialog-container/DialogContainer";
import { SettingsConsumer, SettingsProvider } from "../src/theme";

const preview: Preview = {
  decorators: [
    (Story) => (
      <SettingsProvider>
        <SettingsConsumer>
          <Story />
          {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
          <DialogContainer />
        </SettingsConsumer>
      </SettingsProvider>
    ),
  ],
};

export default preview;
