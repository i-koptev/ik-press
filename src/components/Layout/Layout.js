import React from "react"
import { makeStyles, useTheme, createMuiTheme } from "@material-ui/core/styles"
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"

const Layout = ({ children }) => {
    // const classes = useStyles()
    const theme = useTheme()

    return (
        <Container
            //  defined in pages/blog/index.js
            maxWidth={theme.siteContainer.maxWidth}
        >
            {children}
        </Container>
    )
}

export default Layout

// import React from "react"
// import Footer from "./Footer"
// import Navigation from "./Navigation"
// import SEO from "./Seo"

// const Layout = ({ title, description, lang, children }) => {
//     return (
//         <div
//             style={{
//                 backgroundImage: "url(/img/bg_16.jpg)",
//                 backgroundRepeat: "repeat",
//                 minHeight: "100vh",
//                 height: "100%",
//             }}
//         >
//             <SEO title={title} description={description} lang={lang} />
//             <Navigation />
//             {children}
//             <Footer />
//         </div>
//     )
// }

// export default Layout
