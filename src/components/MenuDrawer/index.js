import React, { useCallback, useState } from "react";
import { Drawer, List, IconButton } from "@material-ui/core";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import { useLocation } from "react-router-dom";
import MenuDrawerItem from "./menu-drawer-item";
import "./index.css";
import menuItemTypes from "./menu-item-types";

export const TOPBAR_HEIGHT = 65;


const menuByUserType = {
    user: ["payments", "professional", "renters", "documents"],
};

const generateDrawerUrl = (currenntUrl, to) => {
    let url = currenntUrl;
    Object.values(menuItemTypes).forEach((type) => {
        url = url.replace(type.to, '');
    })
    return url + to;
};

const MenuDrawer = () => {
    const [open, setOpen] = useState(true);
    const { pathname } = useLocation();
    const toggleOpen = useCallback(() => setOpen(!open), [open, setOpen]);

    return (
        <Drawer className={`menu-drawer ${open ? "open" : "closed"}`} variant="permanent">
            <div style={{ height: TOPBAR_HEIGHT }} />
            <List component="nav" aria-label="main mailbox folders">
                {menuByUserType['user'].map((menuItemType,i) => {
                    const { to, text, Icon } = menuItemTypes[menuItemType];

                    return (
                        <MenuDrawerItem
                            key={i}
                            to={generateDrawerUrl(pathname, to)}
                            Icon={Icon}
                            text={text}
                            current={pathname}
                        />
                    );
                })}
            </List>
            <div className="open-close-button">
                <IconButton onClick={toggleOpen}>
                    {open ? <ChevronLeft fontSize="large" /> : <ChevronRight fontSize="large" />}
                </IconButton>
            </div>
        </Drawer>
    );
};

export default MenuDrawer;