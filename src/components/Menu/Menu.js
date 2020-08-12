import React from "react"
import { StaticQuery, graphql } from "gatsby"

import MenuItem from "./MenuItem"
import "./menu.css"

const MENU_QUERY = graphql`
    fragment MenuFields on WpMenuItem {
        id
        parentId
        label
        url
        connectedNode {
            node {
                __typename
            }
        }
    }

    query GETMAINMENU {
        allWpMenuItem(filter: { locations: { eq: PRIMARY___EN } }) {
            nodes {
                ...MenuFields
            }
        }
        wp {
            generalSettings {
                url
            }
        }
    }
`
const renderMenuItem = (menuItem, wordPressUrl) => {
    if (menuItem.children && menuItem.children.length) {
        return renderSubMenu(menuItem)
    } else {
        return (
            <li key={menuItem.id}>
                <MenuItem menuItem={menuItem} wordPressUrl={wordPressUrl} />
            </li>
        )
    }
}
const renderSubMenu = (menuItem, wordPressUrl) => {
    return (
        <>
            <li key={menuItem.id}>
                <MenuItem menuItem={menuItem} wordPressUrl={wordPressUrl} />
                <ul>{menuItem.children.map(item => renderMenuItem(item))}</ul>
            </li>
        </>
    )
}
//** ==========================================================================
//* Jason Bahl's function --> https://docs.wpgraphql.com/getting-started/menus/
//** ==========================================================================

const flatListToHierarchical = (
    data = [],
    { idKey = "id", parentKey = "parentId", childrenKey = "children" } = {}
) => {
    const tree = []
    const childrenOf = {}
    data.forEach(item => {
        const newItem = { ...item }
        const { [idKey]: id, [parentKey]: parentId = 0 } = newItem
        childrenOf[id] = childrenOf[id] || []
        newItem[childrenKey] = childrenOf[id]
        parentId
            ? (childrenOf[parentId] = childrenOf[parentId] || []).push(newItem)
            : tree.push(newItem)
    })
    return tree
}

const Menu = () => {
    return (
        <StaticQuery
            query={MENU_QUERY}
            render={data => {
                const hierarchicalMenu =
                    data.allWpMenuItem && data.allWpMenuItem.nodes
                        ? flatListToHierarchical(data.allWpMenuItem.nodes)
                        : null
                if (hierarchicalMenu) {
                    const wordPressUrl = data.wp.generalSettings.url
                    return (
                        <>
                            <pre>
                                {/* {JSON.stringify(
                                    data.allWpMenuItem.nodes,
                                    null,
                                    2
                                )} */}
                                {/* {JSON.stringify(hierarchicalMenu, null, 2)} */}
                            </pre>
                            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
                            <nav role="navigation">
                                <ul role="menu">
                                    {hierarchicalMenu.map(menuItem => {
                                        if (menuItem.children.length) {
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
                                    })}
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
