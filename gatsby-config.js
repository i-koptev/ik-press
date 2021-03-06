let activeEnv =
    process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || "development"

console.log(`Using environment config: '${activeEnv}'`)

require("dotenv").config({
    path: `.env.${activeEnv}`,
})

console.log(`This WordPress Endpoint is used: '${process.env.WORDPRESS_URL}'`)

module.exports = {
    plugins: [
        {
            // resolve: `gatsby-plugin-wordpress`,
            resolve: `gatsby-source-wordpress-experimental`,
            options: {
                url: `${process.env.WORDPRESS_URL}/graphql`,
                verbose: true,
                develop: {
                    nodeUpdateInterval: 1000,
                    hardCacheMediaFiles: true,
                },
                html: {
                    imageMaxWidth: 2048,
                    fallbackImageMaxWidth: 800,
                    imageQuality: 100,
                },
                type: {
                    Post: {
                        // perPage: 5, // default is 10
                        // sortFields: `slug`, // default is date
                        // sortOrder: `ASC`, // default is DESC
                        limit:
                            // process.env.NODE_ENV === `development`
                            `development` === `development`
                                ? // Lets just pull 50 posts in development to make it easy on ourselves.
                                  35
                                : // And then we can pull all posts in production
                                  null,
                    },
                },
                reports: {
                    templateRouting: true,
                },
            },
        },
        "gatsby-plugin-top-layout",
        {
            resolve: "gatsby-plugin-material-ui",
            // If you want to use styled components you should change the injection order.
            options: {
                // stylesProvider: {
                //   injectFirst: true,
                // },
            },
        },
        // If you want to use styled components you should add the plugin here.
        // 'gatsby-plugin-styled-components',
        "gatsby-plugin-react-helmet",
        "gatsby-plugin-sharp",
    ],
}
