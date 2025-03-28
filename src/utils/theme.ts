import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
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
    input: {
      primary: "",
    },
  },
});

declare module "@mui/material/styles" {
  interface Palette {
    custom: {
      gold: string;
    };
    input: {
      primary: string;
    };
  }
  interface PaletteOptions {
    custom?: {
      gold?: string;
    };
    input: {
      primary: string;
    };
  }
}

export default theme;
