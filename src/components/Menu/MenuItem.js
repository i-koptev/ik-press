import React from "react"
import CreateLocalLink from "./CreateLocalLink"
import UniversalLink from "./UniversalLink"

const MenuItem = ({ menuItem, wordPressUrl }) => {
    return (
        <UniversalLink
            activeClassName="active"
            activeStyle={{ color: "red" }}
            style={{ marginRight: "20px" }}
            to={CreateLocalLink(menuItem, wordPressUrl)}
        >
            {menuItem.label}
        </UniversalLink>
    )
}

export default MenuItem
