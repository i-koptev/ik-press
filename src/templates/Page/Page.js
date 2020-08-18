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

const Page = ({ pageContext, data }) => {
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
                    {data.wpPage.title}
                </Typography>
                <div
                    style={{
                        fontSize: "10px",
                        backgroundColor: "#345",
                        color: "#eee",
                        padding: "1rem",
                    }}
                >
                    <pre>
                        <b>Template:</b> {__filename}
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
                <h1>{data.wpPage.title}</h1>
                <div
                    dangerouslySetInnerHTML={{
                        __html: data.wpPage.title,
                    }}
                ></div>
                <div
                    dangerouslySetInnerHTML={{
                        __html: data.wpPage.content,
                    }}
                ></div>
            </Container>
        </Layout>
    )
}

export default Page

export const postPageQuery = graphql`
    query pageByID($id: String!) {
        wpPage(id: { eq: $id }) {
            id
            title
            content
        }
    }
`
