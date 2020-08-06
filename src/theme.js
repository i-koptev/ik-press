import { red } from "@material-ui/core/colors"
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles"
import { width } from "@material-ui/system"

// ----------- Theme Variables --------------

const siteContainerMaxWidth = "xl"
const siteBackground = ""
const siteBackgroundImage = ""

// A custom theme for this app
const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#556cd6",
        },
        secondary: {
            main: "#19857b",
        },
        error: {
            main: red.A400,
        },
        background: {
            default: "#fff",
        },
    },
    siteContainer: {
        maxWidth: siteContainerMaxWidth,
    },
})

export default responsiveFontSizes(theme)
