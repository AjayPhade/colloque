import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        primary: {
            // Purple and green play nicely together.
            main: "#321c59",
        },
        secondary: {
            // This is green.A700 as hex.
            main: "#77ACF1",
        },
    },
});

export default theme;
