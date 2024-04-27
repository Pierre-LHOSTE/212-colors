import type { Preview } from "@storybook/react";
import { themes } from "@storybook/theming";
import { ConfigProvider } from "antd";
import React from "react";
import "../app/globals.css";
import darkTheme from "../src/themes/dark";
import lightTheme from "../src/themes/light";

const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: isDarkTheme ? "dark" : "light",
      values: [
        { name: "light", value: "#e9e9e9" },
        { name: "dark", value: "#0F1319" },
      ],
    },
    docs: {
      theme: themes.dark,
    },
  },
  decorators: [
    (Story) => {
      const isDarkTheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      return (
        <ConfigProvider theme={isDarkTheme ? darkTheme : lightTheme}>
          <Story />
        </ConfigProvider>
      );
    },
  ],
};

export default preview;
