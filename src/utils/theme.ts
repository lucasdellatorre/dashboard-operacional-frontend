import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#c1a047",
    },
    warning: {
      main: "#f23030",
    },
    background: {
      paper: "#1c1c1c",
      default: "#181818",
    },
    text: {
      primary: "#ffffff",
      secondary: "#c1a047",
    },
    custom: {
      gold: "#c1a047",
    },
  },
});

declare module "@mui/material/styles" {
  interface Palette {
    custom: {
      gold: string;
    };
  }
  interface PaletteOptions {
    custom?: {
      gold?: string;
    };
  }
}

export default theme;
