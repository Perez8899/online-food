import { createTheme } from "@mui/material";

const darkTheme = createTheme({
    palette: {
        mode: "dark", // theme 
        primary: {
          main: "#7de51c", 
        },
        secondary: {
          main: "#5A20CB", 
        },
        black: {
          main: "#242B2E",
        },
        background: {
          main: "#000000",
          default: "#999999",
          paper: "#0D0D0D",
        },
        textColor: {
          main: "#111111",
        },
      },
    });
    export default darkTheme;
