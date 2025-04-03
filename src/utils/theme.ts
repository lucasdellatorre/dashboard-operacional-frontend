import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    customBackground: {
      primary: "#EEEEEE",
      secondary: "#F7F7F7",
      gray: "#8D8D8D",
      black: "#000000",
    },
    customButton: {
      primary: "#D9D9D9",
      white: "#FFFFFF",
      black: "#D9D9D9",
      gray: "#4E4E4E",
    },
    customText: {
      black: "#191919",
      gray: "#565656",
      lightGrey: "#8D8D8D",
    },
    customInput: {
      primary: "#E3E3E3",
      white: "#FFFFFF",
      gray: "#A0AEC0",
      darkGrey: "#8D8D8D",
      lightGrey: "#D1D1D1",
      veryLightGray: "#EEEEEE",
    },
    icon: {
      black: "#000000",
      white: "#FFFFFF",
    },
    chart: {
      darkBrown: "#4A4331",
      reddishBrow: "#D6CFBF",
      oliveBrown: "#624F1C",
      mustardBrown: "#D6CFBF",
      goldenYellow: "#C1A047",
      lightBeige: "#D6CFBF",
      lightGray: "#D6CFBF",
    },
    hover: {
      primary: "#F5F5F5",
    },
    table: {
      primary: "#D9D9D9",
      white: "#FFFFFF",
    },
    suspectTable: {
      paleBeige: "#EFE5C9",
      mediumGray: "#F1F1F5",
      gold: "#C1A047",
      black: "#000000",
      white: "#F1F1F5",
    },
  },
});

declare module "@mui/material/styles" {
  interface Palette {
    customBackground: {
      primary: string;
      secondary: string;
      gray: string;
      black: string;
    };
    customButton: {
      primary: string;
      white: string;
      black: string;
      gray: string;
    };
    customText: {
      black: string;
      gray: string;
      lightGrey: string;
    };
    customInput: {
      primary: string;
      white: string;
      gray: string;
      darkGrey: string;
      lightGrey: string;
      veryLightGray: string;
    };
    icon: {
      black: string;
      white: string;
    };
    suspectTable: {
      paleBeige: string;
      mediumGray: string;
      gold: string;
      black: string;
      white: string;
    };
    chart: {
      darkBrown: string;
      reddishBrow: string;
      oliveBrown: string;
      mustardBrown: string;
      goldenYellow: string;
      lightBeige: string;
      lightGray: string;
    };
    hover: {
      primary: string;
    };
    table: {
      primary: string;
      white: string;
    };
  }
  interface PaletteOptions {
    customBackground?: {
      primary?: string;
      secondary?: string;
      gray?: string;
      black?: string;
    };
    customButton: {
      primary: string;
      white: string;
      black: string;
      gray: string;
    };
    customText: {
      black: string;
      gray: string;
      lightGrey: string;
    };
    customInput: {
      primary: string;
      white: string;
      gray: string;
      darkGrey: string;
      lightGrey: string;
      veryLightGray: string;
    };
    icon: {
      black: string;
      white: string;
    };
    chart: {
      darkBrown: string;
      reddishBrow: string;
      oliveBrown: string;
      mustardBrown: string;
      goldenYellow: string;
      lightBeige: string;
      lightGray: string;
    };
    hover: {
      primary: string;
    };
    table: {
      primary: string;
      white: string;
    };
    suspectTable: {
      paleBeige: string;
      mediumGray: string;
      gold: string;
      black: string;
      white: string;
    };
  }
}

export default theme;
