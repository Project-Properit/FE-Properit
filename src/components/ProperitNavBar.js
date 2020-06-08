import React, {Component} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logoutAction from "../actions/logoutActions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import logo from "../images/logoWhite .jpg";

class ProperitNavBar extends Component {
    render() {
        const isLogin = this.props.token
        // if(href == "/"){
        //      return (null)
        // }
        if(isLogin) {


            return (

                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/properties"><img className="logo" style={{height: '60px'}} src={logo}
                                                          alt='logo'/></Navbar.Brand>
                    <Nav className="mr-auto">
                        {isLogin &&
                        <>
                            <Nav.Link href="/properties">My Properties</Nav.Link>
                            <Nav.Link href={`/renters`}>My Renters</Nav.Link>
                            <Nav.Link href="/payments">Payments</Nav.Link>
                            <Nav.Link href="/lease">Lease Management</Nav.Link>
                            <Nav.Link href='/about'>About</Nav.Link>
                            <Nav.Link href="/documents">Document</Nav.Link>
                            <Nav.Link onClick={() => this.props.logout()}>Logout</Nav.Link>

                        </>}
                        {/*{!isLogin &&*/}
                        {/*<>*/}
                        {/*    <Nav.Link href="/login">Login</Nav.Link>*/}
                        {/*    <Nav.Link href="/signup">Register</Nav.Link>*/}
                        {/*</>*/}
                        {/*}*/}
                    </Nav>
                </Navbar>
            );
        }
        return(null);
    }
}

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logoutAction()),
});
const mapStateToProps = ({clientReducer}) => ({
    token: clientReducer.token,
    userId: clientReducer.userId,
});
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProperitNavBar);
