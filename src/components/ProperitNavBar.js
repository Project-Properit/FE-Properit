import React, {Component} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {logoutAction} from "../actions/logoutActions";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import logo from "../images/logoWhite .jpg";
import SimpleListMenu from "./addressChoose";
import {chooseAsset, loadProperties} from "../actions/propertiesActions";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import {setMode} from "../actions/clientActions";

class ProperitNavBar extends Component {
    componentDidMount() {
        this.props.loadProperties(this.props.userId);
    }

    render() {
        console.log(this.props)
        const isLogin = this.props.token
        const tenantAssetId = this.props.tenantAssetId
        let chosenModeNotFromScreen;
        if (this.props.isOwner && this.props.isTenant) {
            chosenModeNotFromScreen = null
        } else if (this.props.isOwner) {
            chosenModeNotFromScreen = 'owner'
        } else if (this.props.isTenant) {
            chosenModeNotFromScreen = 'tenant'
        }
        const chosenMode = this.props.chosenMode ? this.props.chosenMode : chosenModeNotFromScreen
        let mainUrl;
        console.log(chosenMode)
        if (!chosenMode || (chosenMode && this.props.isOwner && this.props.isTenant)) {
            mainUrl = '/chooseView'
        } else if (chosenMode === 'owner') {
            mainUrl = "/properties"
        } else if (chosenMode === 'tenant') {
            console.log('inside tenant')
            if (tenantAssetId && tenantAssetId !== 'null') {
                mainUrl = `/properties/${tenantAssetId}/payments`
            } else {
                mainUrl = '/newUser'
            }
        }
        console.log(mainUrl)
        if (isLogin) {
            return (
                <Navbar bg="dark" variant="dark" style={{zIndex: '1201', height: '64px', lineHeight: '64px'}}>
                    <Navbar.Brand onClick={() => this.changeToMainUrl(mainUrl)}><img className="logo" style={{height: '60px'}} src={logo}
                                                              alt='logo'/></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            {isLogin && chosenMode === 'owner' &&
                            <>
                                {/*<Nav.Link as={Link} to="/properties">Properties</Nav.Link>*/}
                                {/*<Nav.Link as={Link} to={documentsUrl}>Documents</Nav.Link>*/}
                                {/*<Nav.Link as={Link} to={paymentsUrl}>Payments</Nav.Link>*/}
                            </>
                            }
                            {isLogin && chosenMode === 'tenant' &&
                            <>
                                {/*<Nav.Link as={Link} to="/payments">Payments</Nav.Link>*/}

                            </>
                            }


                        </Nav>
                        <form className="form-inline">
                            <Nav.Link onClick={() => this.handleChangeSettings(this.props.userId)} style={{
                                padding: "0.5rem",
                                color: "rgba(255,255,255,.5)"
                            }}><SettingsIcon/></Nav.Link>
                            {this.props.myProperties.length > 0 &&
                            <SimpleListMenu className="mr-sm-2" choosenFunc={(d) => this.onChooseAddress(d)}
                                            options={this.props.myProperties.map(a => a.address)}
                                            choosenIndex={this.getIndexOfList()}/>}
                            <Nav.Link onClick={() => this.props.logout()}
                                      style={{padding: "0.5rem", color: "rgba(255,255,255,.5)"}}><ExitToAppIcon/> Logout</Nav.Link>
                        </form>
                    </Navbar.Collapse>
                </Navbar>
            );
        }
        return (<div></div>)

    }

    handleChangeSettings(userId) {
        this.props.history.push("/settings/" + userId);
    }
    changeToMainUrl(mainUrl) {
        this.props.history.push(mainUrl);
            window.location.reload()
    }
    getIndexOfList() {
        let c = this.props.myProperties.findIndex(a => a.id === this.props.chosenAssetId)
        return c === -1 ? null : c
    }

    onChooseAddress(d) {
        let c = this.props.myProperties[d]
        this.props.chooseAsset(c.id)
        this.props.history.push("/properties/" + c.id + '/payments');
    }
}

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logoutAction()),
    loadProperties: (ownerId) => dispatch(loadProperties(ownerId)),
    chooseAsset: (assetId) => dispatch(chooseAsset(assetId)),
    setMode: (mode) => dispatch(setMode(mode))

});
const mapStateToProps = ({clientReducer, myProperties}) => ({
    token: clientReducer.token,
    userId: clientReducer.userId,
    isOwner: clientReducer.isOwner,
    isTenant: clientReducer.isTenant,
    chosenMode: clientReducer.chosenMode,
    tenantAssetId: clientReducer.tenantAssetId,
    myProperties: myProperties.myProperties,
    chosenAssetId: myProperties.chosenAssetId

});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ProperitNavBar));
