import {Redirect, Route} from "react-router-dom";
import React from "react";
import checkAuthorization from "../lib/checkAuth";

const PublicRoute = ({component: Component, ...rest}) => {
    return (

        <Route {...rest} render={props => (
            !checkAuthorization() ?
                <Component {...props} />
            : <Redirect to="/" />
        )} />
    );
};

export default PublicRoute;
