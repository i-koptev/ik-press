import React from "react"
import { StaticQuery, graphql } from "gatsby"

import MenuItem from "./MenuItem"

/**
 * Define MenuItem fragment and get all primary menu items.
 */
const MENU_QUERY = graphql`
    query GETMAINMENU {
        allWpMenuItem(filter: { locations: { eq: PRIMARY } }) {
            nodes {
                label
                url
                id
            }
        }
        wp {
            generalSettings {
                url
            }
        }
    }
`

const Menu = () => {
    return (
        <StaticQuery
            query={MENU_QUERY}
            render={data => {
                // if (data.wpgraphql.menuItems) {
                if (data.allWpMenuItem.nodes) {
                    //   const menuItems = data.wpgraphql.menuItems.nodes
                    const menuItems = data.allWpMenuItem.nodes
                    //   const wordPressUrl = data.wpgraphql.generalSettings.url
                    const wordPressUrl = data.wp.generalSettings.url

                    return (
                        <div style={{ marginBottom: "20px" }}>
                            {menuItems &&
                                menuItems.map(menuItem => (
                                    <MenuItem
                                        key={menuItem.id}
                                        menuItem={menuItem}
                                        wordPressUrl={wordPressUrl}
                                    />
                                ))}
                        </div>
                    )
                }
                return null
            }}
        />
    )
}

export default Menu
