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
import {ArrowDropDown, ArrowDropUp, PersonPinCircle} from "@material-ui/icons";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import {Button} from "@material-ui/core";
import {loadProperty} from "../actions/propertyActions";
import myPropertyReducer from "../reducers/propertyReducer";

class ProperitNavBar extends Component {
    componentDidMount() {
        this.props.loadProperties(this.props.userId);
    }

	render() {
		const isLogin = this.props.token
		const tenantAssetId = this.props.tenantAssetId
		let chosenModeNotFromScreen;
		if (this.props.isOwner && this.props.isTenant){chosenModeNotFromScreen=null}
		else if (this.props.isOwner) {chosenModeNotFromScreen='owner'}
		else if (this.props.isTenant) {chosenModeNotFromScreen='tenant'}
		const chosenMode = this.props.chosenMode ? this.props.chosenMode: chosenModeNotFromScreen
		let mainUrl;
		if((!chosenMode && this.props.isOwner && this.props.isTenant)|| (chosenMode && this.props.isOwner && this.props.isTenant)){
			console.log('chosenMode',chosenMode)
			console.log('this.props.isOwner',this.props.isOwner)
			console.log('this.props.isTenant',this.props.isTenant)
			mainUrl='/chooseView'
		}
		else if(chosenMode==='owner'){mainUrl="/properties"}
		else if(chosenMode==='tenant')
		{
			if(tenantAssetId && tenantAssetId!=='null'){
				mainUrl=`/properties/${tenantAssetId}/payments`
			}
			else{
				mainUrl='/newUser'
			}
		}
    render() {
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
        if (!chosenMode || (chosenMode && this.props.isOwner && this.props.isTenant)) {
            mainUrl = '/chooseView'
        } else if (chosenMode === 'owner') {
            mainUrl = "/properties"
        } else if (chosenMode === 'tenant') {
            if (tenantAssetId && tenantAssetId !== 'null') {
                mainUrl = `/properties/${tenantAssetId}/payments`
            } else {
                mainUrl = '/newUser'
            }
        }

        if (isLogin) {
            console.log('this.props.myProperties.length >0', this.props.myProperties.length > 0)
            console.log('this.props.myProperties', this.props.myProperties)
            return (

                <Navbar bg="dark" variant="dark" style={{zIndex: '1201', height: '64px', lineHeight: '64px'}}>
                    <Navbar.Brand as={Link} to={mainUrl}><img className="logo" style={{height: '60px'}} src={logo}
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
                            {this.props.myProperties.length > 0 ?
                                <SimpleListMenu className="mr-sm-2" choosenFunc={(d) => this.onChooseAddress(d)}
                                                options={this.props.myProperties.map(a => a.address)}
                                                choosenIndex={this.getIndexOfList()}/> : chosenMode === 'tenant' ?
                                <Button
                                    dir="rtl"
                                    style={{
                                        padding: 0,
                                        color: "white",
                                        fontWeight: "bold",
                                        fontSize: "22px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        position: "relative",
                                        minWidth: "182px"
                                    }}
                                >
                                    <PersonPinCircle/>
                                    <div style={{marginRight: "8px", marginLeft: "8px", whiteSpace: "nowrap"}}>
                                        {this.props.myProperty.address}
                                    </div>
                                </Button>:null}
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

    getIndexOfList() {
        let c = this.props.myProperties.findIndex(a => a.id === this.props.chosenAssetId)
        console.log('c-', c)
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
    loadProperty: (propertyId) => dispatch(loadProperty(propertyId)),
    chooseAsset: (assetId) => dispatch(chooseAsset(assetId)),
    setMode: (mode) => dispatch(setMode(mode))

});
const mapStateToProps = ({myPropertyReducer, clientReducer, myProperties}) => ({
    token: clientReducer.token,
    userId: clientReducer.userId,
    isOwner: clientReducer.isOwner,
    isTenant: clientReducer.isTenant,
    chosenMode: clientReducer.chosenMode,
    tenantAssetId: clientReducer.tenantAssetId,
    myProperties: myProperties.myProperties,
    chosenAssetId: myProperties.chosenAssetId,
    myProperty: myPropertyReducer.myProperty

});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(ProperitNavBar));
