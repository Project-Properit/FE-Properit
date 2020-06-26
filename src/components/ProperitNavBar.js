import React, {Component} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {logoutAction}from "../actions/logoutActions";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import logo from "../images/logoWhite .jpg";

class ProperitNavBar extends Component {
    render() {
        const isLogin = this.props.token
        const isOwner = this.props.isOwner
        const isTenant = this.props.isTenant
        const chosenMode = this.props.chosenMode
        console.log(chosenMode)
        console.log(isOwner)
        console.log(isTenant)
        console.log(isLogin)
        if(isLogin) {
            return (

                <Navbar bg="dark" variant="dark" style={{zIndex: '1201', height: '64px', lineHeight: '64px'}}>
                    <Navbar.Brand href="/properties"><img className="logo" style={{height: '60px'}} src={logo}
                                                          alt='logo'/></Navbar.Brand>
                    <Nav className="mr-auto">
                        {/*{isOwner && isTenant && chosenMode===null &&*/}
                        {/*<>*/}
                        {/*    <Nav.Link onClick={()=> this.props.logout()}>Logout</Nav.Link>*/}
                        {/*</>*/}
                        {/*}*/}
                        {isLogin && chosenMode==='owner' &&
                        <>
                        <Nav.Link as={Link} to="/properties">Properties</Nav.Link>
                        <Nav.Link as={Link} to="/documents">Documents</Nav.Link>
                            </>
                        }
                        {isLogin && chosenMode==='tenant' &&
                        <>
                            <Nav.Link as={Link} to="/payments">Payments</Nav.Link>

                        </>
                        }
                        {/*<Nav.Link as={Link} to={`/renters`}>My Renters</Nav.Link>*/}
                        {/*<Nav.Link as={Link} to="/payments">Payments</Nav.Link>*/}
                        {/*<Nav.Link as={Link} to="/lease">Lease Management</Nav.Link>*/}
                        {/*<Nav.Link as={Link} to='/about' >About</Nav.Link>*/}
                        {/*    <Nav.Link as={Link} to="/documents">Document</Nav.Link>*/}
                            <Nav.Link onClick={() => this.props.logout()}>Logout</Nav.Link>

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
    isOwner: clientReducer.isOwner,
    isTenant: clientReducer.isTenant,
    chosenMode: clientReducer.chosenMode
});
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProperitNavBar);
