import React, {Component} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logoutAction from "../actions/logoutActions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

class ProperitNavBar extends Component {
    render() {
        const isLogin = this.props.token
        return (

            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">Properit</Navbar.Brand>
                <Nav className="mr-auto">
                    {isLogin &&
                    <>
                        <Nav.Link as={Link} to="/properties">My Properties</Nav.Link>
                        <Nav.Link as={Link} to={`/renters`}>My Renters</Nav.Link>
                        <Nav.Link as={Link} to="/payments">Payments</Nav.Link>
                        <Nav.Link as={Link} to="/lease">Lease Management</Nav.Link>
                        <Nav.Link as={Link} to='/about' >About</Nav.Link>
                        <Nav.Link onClick={() => this.props.logout()}>Logout</Nav.Link>
                    </>}
                    {!isLogin &&
                    <>
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        <Nav.Link as={Link} to="/signup">Register</Nav.Link>
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
    userId: clientReducer.userId,
});
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProperitNavBar);
