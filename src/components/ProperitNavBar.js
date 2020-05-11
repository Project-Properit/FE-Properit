import React, {Component} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logoutAction from "../actions/logoutActions";
import {connect} from "react-redux";

class ProperitNavBar extends Component {
    render() {
        const isLogin = this.props.token
        console.log(this.props)
        return (

            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">Properit</Navbar.Brand>
                <Nav className="mr-auto">
                    {isLogin &&
                    <>
                        <Nav.Link href="/users/123/properties">My Properties</Nav.Link>
                        <Nav.Link href="/users/123/renters">My Renters</Nav.Link>
                        <Nav.Link href="/users/123/payments">Payments</Nav.Link>
                        <Nav.Link href="/users/123/lease">Lease Management</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                        <Nav.Link href="/images">Images(Example)</Nav.Link>
                        <Nav.Link onClick={() => this.props.logout()}>Logout</Nav.Link>
                        <Nav.Link href="#document">Document</Nav.Link>

                    </>}
                    {!isLogin &&
                    <>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/signup">Register</Nav.Link>
                    </>
                    }
                </Nav>
            </Navbar>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logoutAction()),
});
const mapStateToProps = ({clientReducer}) => ({
    token: clientReducer.token,
});
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProperitNavBar);
