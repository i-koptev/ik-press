/**
 * Parses a menu item object and returns Gatsby-field URI.
 *
 * @param {object} menuItem a single menu item
 * @param wordPressUrl
 * @param blogURI
 */
// const CreateLocalLink = (menuItem, wordPressUrl, blogURI = "blog/") => {
const CreateLocalLink = (menuItem, wordPressUrl, blogURI = `/blog`) => {
    const { url, connectedNode } = menuItem

    if (url === "#") {
        return null
    }
    /**
     * Always want to pull of our API URL.
     */
    let newUri = url.replace(wordPressUrl, "")
    console.log(newUri)

    /**
     * If it's a blog link, respect the users blogURI setting.
     */
    if (
        connectedNode &&
        connectedNode.node.__typename === "WpPost" &&
        blogURI
    ) {
        newUri = blogURI + newUri
    }

    return newUri
}

export default CreateLocalLink
