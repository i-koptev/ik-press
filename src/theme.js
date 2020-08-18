import { red } from "@material-ui/core/colors"
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles"
import { width } from "@material-ui/system"

// ----------- Theme Variables --------------

const siteContainerMaxWidth = "xl"
const siteBackground = ""
const siteBackgroundImage = ""

// ------------ Site Palette ---------------

const sitePaletteWhite = ""
const sitePaletteBlack = ""
const sitePaletteLightGrey = ""
const sitePaletteGrey = ""
const sitePaletteDarkGrey = ""
const sitePaletteMain = ""
const sitePaletteAccent = ""

// ------------- Typography ------------------

const siteTextFontFamily = ""
const siteTextFontWeight = ""
const siteTextColor = "#ccca"

const headingsFontFamily = "'Playfair Display', Times, serif" //h1, h2, h3, h4, h5, h6
const headingsWeight = 700
const headingsColor = "#ffbf55"

// ------------- Site Sections ---------------

// ------------- Main Navigation ------------------

// ------------- Main Navigation - Desktop Size ----------------
const mainNavigationBackgroundColor = "rgba(0, 20, 30, 0.7)"
const mainNavigationBorderBottom = "1px solid rgba(255, 255, 255, 0.1)"

const mainNavigationPinnedBackgroundColor = "rgba(0, 20, 30, 0.9)"
const mainNavigationPinnedBorderBottom = "1px solid rgba(255, 255, 255, 0.2)"

const mainNavigationUnpinnedBackgroundColor = ""
const mainNavigationUnpinnedBorderBottom = ""

const mainNavigationLinkColor = "rgba(232,232,232,0.8)"
const mainNavigationLinkActiveColor = "#ffbf55"
// const mainNavigationLinkActiveColor = 'rgba(232,232,232,1)';
const mainNavigationLinkHoverColor = "rgba(252,252,252,1)"
const mainNavigationLinkHoverUnderlineColor = ""

// ------------- Main Navigation Brand -----------------------
const mainNavigationBrandColor = mainNavigationLinkColor
const mainNavigationBrandHoverColor = mainNavigationLinkHoverColor

// ------------- Main Navigation - Mobile Size ----------------------
const mainNavigationMobileBackgroundColor = "transparent"
const mainNavigationMobileBoardColor = "rgba(0, 20, 30, 0.9)"
const mainNavigationMobileDividerColor = ""

const mainNavigationMobileLinkColor = mainNavigationLinkColor
const mainNavigationMobileLinkActiveColor = mainNavigationLinkActiveColor
const mainNavigationMobileLinkHoverColor = mainNavigationLinkHoverColor

// ----------- End Of Theme Variables --------------

// A custom theme for this app

let theme = createMuiTheme({
    props: {
        // Name of the component ⚛️
        MuiButtonBase: {
            //IK- works!
            // The default props to change
            disableRipple: false, // if true - No more ripple, on the whole application 💣!
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 784,
            lg: 1120,
            xl: 1472,
        },
    },
    overrides: {
        MuiDrawer: {
            // for navigation Mobile Bar
            paperAnchorTop: {
                // backgroundColor: 'transparent',
                // boxShadow: 'none',
            },
        },
        MuiButton: {
            root: {
                // border: "3px solid tomato !important",
                // borderRadius: "25px !important",
                // fontSize: "3rem", // differs from defining fz in label
            },
            label: {
                // color: "red",
                // fontSize: "3rem",
            },
        },
        MuiAppBar: {
            root: {
                /*  '@media(min-width: 0px) and (orientation: landscape)': {
                    minHeight: '48px',
                },
                '@media(min-width: 600px)': {
                    minHeight: '54px',
                },
                '@media(min-width: 1200px)': {
                    minHeight: '64px',
                },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center', */
            },
        },
    },
    typography: {
        root: {
            color: "tomato",
        },
        fontSize: 15,
        // htmlFontSize: 16,
        h1: {
            fontFamily: headingsFontFamily,
            fontWeight: headingsWeight,
            color: headingsColor,
            letterSpacing: "0.2rem",
        },
        h2: {
            fontFamily: headingsFontFamily,
            fontWeight: headingsWeight,
            color: headingsColor,
            letterSpacing: "0.2rem",
        },
        h3: {
            fontFamily: headingsFontFamily,
            fontWeight: headingsWeight,
            color: headingsColor,
            letterSpacing: "0.2rem",
        },
        h4: {
            fontFamily: headingsFontFamily,
            fontWeight: headingsWeight,
            color: headingsColor,
            letterSpacing: "0.2rem",
        },
        h5: {
            fontFamily: headingsFontFamily,
            fontWeight: headingsWeight,
            color: headingsColor,
            letterSpacing: "0.2rem",
        },
        h6: {
            fontFamily: headingsFontFamily,
            fontWeight: headingsWeight,
            color: headingsColor,
            letterSpacing: "0.2rem",
        },
        body1: {
            // fontSize: "1rem",
        },
        body2: {
            // fontSize: "1rem",
        },

        fontFamily: [
            "PT Sans",
            "Roboto",
            "Arial",
            '"Segoe UI"',
            "sans-serif",
            "-apple-system",
            "BlinkMacSystemFont",
            '"Helvetica Neue"',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(","),
    },
    mainNavigationBrandColor: mainNavigationBrandColor,
    mainNavigationBrandHoverColor: mainNavigationBrandHoverColor,
    mainNavigationBackgroundColor: mainNavigationBackgroundColor,
    mainNavigationBorderBottom: mainNavigationBorderBottom,
    mainNavigationLinkColor: mainNavigationLinkColor,
    mainNavigationLinkActiveColor: mainNavigationLinkActiveColor,
    mainNavigationLinkHoverColor: mainNavigationLinkHoverColor,

    mainNavigationPinnedBackgroundColor: mainNavigationPinnedBackgroundColor,
    mainNavigationPinnedBorderBottom: mainNavigationPinnedBorderBottom,

    mainNavigationUnpinnedBackgroundColor: mainNavigationUnpinnedBackgroundColor,

    mainNavigationMobileBoardColor: mainNavigationMobileBoardColor,
    mainNavigationMobileBackgroundColor: mainNavigationMobileBackgroundColor,
    mainNavigationMobileLinkColor: mainNavigationMobileLinkColor,
    mainNavigationMobileLinkActiveColor: mainNavigationMobileLinkActiveColor,
    mainNavigationMobileLinkHoverColor: mainNavigationMobileLinkHoverColor,
    siteSections: {
        primary: {
            main: "#00f",
        },
    },
    siteContainer: {
        maxWidth: siteContainerMaxWidth,
    },
    siteSpacing: {
        aboutPage: 4,
    },
    html: {
        paragraph: {
            color: siteTextColor,
            fontWeight: 400,
            textIndent: "2em",
        },
    },

    palette: {
        primary: {
            main: "#556cd6",
            ikky: "#0f0",
        },
        secondary: {
            main: "#19857b",
        },
        error: {
            main: red.A400,
        },
        background: {
            default: "transparent",
            //   default: 'rgba(222, 228, 231, 0.9)',
        },
    },
    sections: {
        blogRoll: {
            postCardBackground: "rgba(0, 41, 63, 0.7)",
            postCardTextColor: "rgba(255, 255, 255, 0.7)",
        },
    },
})
export default responsiveFontSizes(theme)
