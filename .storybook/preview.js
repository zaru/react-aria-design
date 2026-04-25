import { themes } from "storybook/theming";
import "../src/index.css";

if (typeof document !== "undefined") {
  const id = "uidotsh-ui-picker-script";
  if (!document.getElementById(id)) {
    const s = document.createElement("script");
    s.id = id;
    s.src = "https://ui.sh/ui-picker.js";
    document.body.appendChild(s);
  }
}

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {},
    },
    docs: {
      theme: window.matchMedia("(prefers-color-scheme: dark)").matches
        ? themes.dark
        : themes.light,
    },
  },
};

export default preview;
