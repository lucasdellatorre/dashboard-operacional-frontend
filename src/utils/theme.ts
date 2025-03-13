import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const customConfig = defineConfig({
  theme: {
    semanticTokens: {
      colors: {
        background: {
          primary: {
            value: "#1c1c1c",
          },
          secondary: {
            value: "#181818",
          },
          black: {
            value: "#000000",
          },
        },
        brand: {
          primary: {
            value: "#c1a047",
          },
        },
        text: {
          white: { value: "#ffffff" },
          black: { value: "#000000" },
          gold: { value: "#c1a047" },
          warning: { value: "#f23030)" },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, customConfig);
