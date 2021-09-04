import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiGrid: {
      styleOverrides: {
        container: {
          maxWidth: "100%",
        },
        item: {
          maxWidth: "100%",
        },
      },
    },
  },
});

export default theme;
