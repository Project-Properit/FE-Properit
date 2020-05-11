import React from 'react';
import ScrollspyNav from "react-scrollspy-nav";
import {NavLink} from "react-router-dom";
import logo from "../../../images/logoWhite .jpg";
import './NavBar.scss';

export default class NavBar extends React.PureComponent {
    render() {
        return (
            <div className="homePageNav">
                <ScrollspyNav
                    scrollTargetIds={["section_1", "section_2"]}
                    activeNavClass="is-active"
                    scrollDuration="1000"
                    headerBackground="true"
                    router="HashRouter"
                >
                    <NavLink to="/">
                        <img className="logo" src={logo} alt='logo'/>
                    </NavLink>
                    <ul>
                        <li><NavLink to="#section_1">The idea</NavLink></li>
                        <li><NavLink to="#section_2">who we are</NavLink></li>
                    </ul>
                </ScrollspyNav>
            </div>
        )
    }
}