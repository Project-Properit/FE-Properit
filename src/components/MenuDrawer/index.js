import React, { useCallback, useState } from "react";
import { Drawer, List, IconButton } from "@material-ui/core";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import { useLocation } from "react-router-dom";
import MenuDrawerItem from "./menu-drawer-item";
import "./index.css";
import menuItemTypes from "./menu-item-types";

export const TOPBAR_HEIGHT = 65;
// const ORGBAR_HEIGHT = 30;
// const topBarHeight = TOPBAR_HEIGHT + (orgBarExists ? ORGBAR_HEIGHT : 0);
// const routeContentHeight = `calc(100vh - ${topBarHeight}px)`;

const menuByUserType = {
    user: ["payments", "professional", "renters", "documents"],
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
                            to={to}
                            Icon={Icon}
                            text={text}
                            current={pathname}
                        />
                    );
                })}
            </List>
            <div className="open-close-button">
                <IconButton onClick={toggleOpen}>
                    {open ? <ChevronRight fontSize="large" /> : <ChevronLeft fontSize="large" />}
                </IconButton>
            </div>
        </Drawer>
    );
};

export default MenuDrawer;