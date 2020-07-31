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
            resolve: `gatsby-plugin-wordpress`,
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
                        perPage: 5, // default is 10
                        sortFields: `slug`, // default is date
                        sortOrder: `ASC`, // default is DESC
                    },
                },
                reports: {
                    templateRouting: true,
                },
            },
        },
    ],
}
