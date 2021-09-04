import { createTheme } from "@material-ui/core/styles";

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
