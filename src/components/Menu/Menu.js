import React from "react"
import { StaticQuery, graphql } from "gatsby"

import MenuItem from "./MenuItem"
import "./menu.css"

/**
 * Define MenuItem fragment and get all primary menu items.
 */
const MENU_QUERY = graphql`
    fragment MenuFields on WpMenuItem {
        label
        url
        id
        connectedNode {
            node {
                __typename
            }
        }
    }

    query GETMAINMENU {
        allWpMenuItem(filter: { locations: { eq: PRIMARY } }) {
            nodes {
                ...MenuFields
                childItems {
                    nodes {
                        ...MenuFields
                        childItems {
                            nodes {
                                ...MenuFields
                                childItems {
                                    nodes {
                                        ...MenuFields
                                        childItems {
                                            nodes {
                                                ...MenuFields
                                                childItems {
                                                    nodes {
                                                        ...MenuFields
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        wp {
            generalSettings {
                url
            }
        }
    }
`
// ==================================================================

const renderMenuItem = (menuItem, wordPressUrl) => {
    if (menuItem.childItems && menuItem.childItems.nodes.length) {
        return renderSubMenu(menuItem)
    } else {
        return (
            <li key={menuItem.id}>
                <MenuItem menuItem={menuItem} wordPressUrl={wordPressUrl} />
            </li>
        )
    }

    // const link = createLocalLink(menuItem.url)
    // if (menuItem.childItems && menuItem.childItems.nodes.length) {
    //     return renderSubMenu(menuItem)
    // } else {
    //     return (
    //         <li className="menu-item" key={menuItem.id}>
    //             {link ? (
    //                 <Link to={createLocalLink(menuItem.url)}>
    //                     {menuItem.label}
    //                 </Link>
    //             ) : (
    //                 menuItem.label
    //             )}
    //         </li>
    //     )
    // }
}
const renderSubMenu = (menuItem, wordPressUrl) => {
    return (
        <>
            <li key={menuItem.id}>
                <MenuItem menuItem={menuItem} wordPressUrl={wordPressUrl} />

                <ul>
                    {menuItem.childItems.nodes.map(item =>
                        renderMenuItem(item)
                    )}
                </ul>
            </li>
        </>
        // <li className="has-subMenu menu-item" key={menuItem.id}>
        //     {createLocalLink(menuItem.url) ? (
        //         <Link to={createLocalLink(menuItem.url)}>{menuItem.label}</Link>
        //     ) : (
        //         menuItem.label
        //     )}
        //     <ul className="menuItemGroup">
        //         {menuItem.childItems.nodes.map(item => renderMenuItem(item))}
        //     </ul>
        // </li>
    )
}
// ==================================================================

const Menu = () => {
    return (
        <StaticQuery
            query={MENU_QUERY}
            render={data => {
                // if (data.wpgraphql.menuItems) {
                if (data.allWpMenuItem) {
                    //   const wordPressUrl = data.wpgraphql.generalSettings.url
                    const wordPressUrl = data.wp.generalSettings.url

                    return (
                        <>
                            {/* <ul>
                                <li>
                                    <a href="#">One</a>
                                </li>
                                <li>
                                    <a href="#" aria-haspopup="true">
                                        Two
                                    </a>
                                    <ul class="dropdown" aria-label="submenu">
                                        <li>
                                            <a href="#">Sub-1</a>
                                        </li>
                                        <li>
                                            <a href="#">Sub-2</a>
                                        </li>
                                        <li>
                                            <a href="#">Sub-3</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#">Three</a>
                                </li>
                            </ul> */}
                            <nav role="navigation">
                                <ul role="menu">
                                    {data.allWpMenuItem.nodes &&
                                        data.allWpMenuItem.nodes.map(
                                            menuItem => {
                                                if (
                                                    menuItem.childItems.nodes
                                                        .length
                                                ) {
                                                    return renderSubMenu(
                                                        menuItem,
                                                        wordPressUrl
                                                    )
                                                } else {
                                                    return renderMenuItem(
                                                        menuItem,
                                                        wordPressUrl
                                                    )
                                                }
                                            }
                                        )}
                                </ul>
                            </nav>
                        </>
                    )
                } else {
                    return null
                }
            }}
        />
    )
}

export default Menu
