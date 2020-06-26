import React, { useCallback } from "react";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { withRouter } from "react-router-dom";

const MenuDrawerItem = withRouter(({ to, history, Icon, text, current }) => {
    const onClick = useCallback(() => history.push(to), [history, to]);

    return (
        <ListItem button onClick={onClick} selected={current === to}>
            <ListItemIcon>
                <Icon />
            </ListItemIcon>
            <ListItemText primary={text} />
        </ListItem>
    );
});

export default MenuDrawerItem;