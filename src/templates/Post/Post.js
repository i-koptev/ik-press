import React from "react"
import { Link, graphql } from "gatsby"

import { makeStyles, useTheme, createMuiTheme } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"

import Layout from "../../components/Layout"
import LangSwitcher from "../../components/LangSwitcher"

const useStyles = makeStyles(theme => ({
    header: {
        marginTop: "1rem",
        marginBottom: "1rem",
    },
    buttonLink: {
        textDecoration: "none",
    },
    linkButton: {
        [theme.breakpoints.up("md")]: {
            backgroundColor: "maroon",
            "&:hover": {
                backgroundColor: "red",
            },
        },
        // padding: "0.5em 1em 0.5em 2em",
        // fontSize: "0.7rem",
        border: `1px solid ${theme.mainNavigationLinkColor}`,
        marginTop: "1rem",
        backgroundColor: "tomato",
        "&:hover": {
            backgroundColor: "red",
        },
    },
    htmlContent: {
        "& h2": {
            ...theme.typography.h5,
            // paddingBottom: `${theme.siteSpacing.aboutPage * 4}px`,
            // paddingLeft: `${theme.siteSpacing.aboutPage * 8}px`,
            fontFamily: "PT Sans Narrow",
            fontWeight: 400,
            color: "#fffc",
            // textAlign: "center",
        },
        "& p": {
            ...theme.html.paragraph,
            textIndent: "3%",
        },
    },
    imageWrapper: {
        width: "50%",
        float: "left",
        marginRight: "3vw",
        marginBottom: "1vw",
        // border: "1px solid #fff3",
        padding: "0.7vw",
        paddingBottom: "2vw",
        // backgroundColor: "#fff1",
    },
}))

const Post = ({ pageContext, data }) => {
    const classes = useStyles()
    const theme = useTheme()

    return (
        <Layout>
            <Container maxWidth={theme.siteContainer.maxWidth}>
                <LangSwitcher />
                <Typography
                    className={classes.header}
                    variant="h3"
                    component="h1"
                    align="center"
                >
                    {data.thisPost.title}
                </Typography>
                <Link to="/a" className={classes.buttonLink}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.linkButton}
                    >
                        TEST
                    </Button>
                </Link>

                <div
                    style={{
                        fontSize: "14px",
                        backgroundColor: "#345",
                        color: "#eee",
                        padding: "1rem",
                    }}
                >
                    <pre>
                        <b>Template:</b> {__filename}
                    </pre>
                    <pre>
                        <b>Page location:</b>
                        <br />
                        {JSON.stringify(location, null, 2)}
                    </pre>
                    <pre>
                        <b>Page context:</b>
                        <br />
                        {JSON.stringify(pageContext, null, 2)}
                    </pre>
                    <pre>
                        <b>Page data:</b>
                        <br />
                        {JSON.stringify(data, null, 2)}
                    </pre>
                </div>
            </Container>
        </Layout>
    )
}

export default Post

export const postById = graphql`
    query postByID($id: String!, $previousPostId: String, $nextPostId: String) {
        thisPost: wpPost(id: { eq: $id }) {
            slug
            uri
            title
            content
        }
        nextPost: wpPost(id: { eq: $nextPostId }) {
            slug
            uri
            title
            content
        }
        previousPost: wpPost(id: { eq: $previousPostId }) {
            slug
            uri
            title
            content
        }
    }
`
