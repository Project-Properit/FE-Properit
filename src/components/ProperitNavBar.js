import React, { Component } from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { logoutAction } from "../actions/logoutActions";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import logo from "../images/logoWhite .jpg";
import SimpleListMenu from "./addressChoose";
import { loadProperties } from "../actions/propertiesActions";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

class ProperitNavBar extends Component {


	componentDidMount() {
		this.props.loadProperties(this.props.ownerId);
	}


	render() {
		const isLogin = this.props.token
		const isOwner = this.props.isOwner
		const isTenant = this.props.isTenant
		const tenantAssetId = this.props.tenantAssetId
		let chosenModeNotFromScreen;
		if (this.props.isOwner && this.props.isTenant){chosenModeNotFromScreen=null}
		else if (this.props.isOwner) {chosenModeNotFromScreen='owner'}
		else if (this.props.isTenant) {chosenModeNotFromScreen='tenant'}
		const chosenMode = this.props.chosenMode ? this.props.chosenMode: chosenModeNotFromScreen
		console.log('isOwner', isOwner)
		console.log('isTenant', isTenant)
		console.log('this.props.chosenMode',this.props.chosenMode)
		console.log('chosenModeNotFromScreen',chosenModeNotFromScreen)

		let mainUrl;
		if(!chosenMode){
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
		const documentsUrl = this.props.location.pathname.replace('/documents','').replace('/payments','') +'/documents'
		const paymentsUrl = this.props.location.pathname.replace('/payments','').replace('/documents','') +'/payments'

		if (isLogin) {
			return (

                <Navbar bg="dark" variant="dark" style={{zIndex: '1201', height: '64px', lineHeight: '64px'}}>
					<Navbar.Brand as={Link} to={mainUrl}><img className="logo" style={{height: '60px'}} src={logo}
					                                      alt='logo'/></Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						{/*{isOwner && isTenant && chosenMode===null &&*/}
						{/*<>*/}
						{/*    <Nav.Link onClick={()=> this.props.logout()}>Logout</Nav.Link>*/}
						{/*</>*/}
						{/*}*/}
						{isLogin && chosenMode === 'owner' &&
						<>
							<Nav.Link as={Link} to="/properties">Properties</Nav.Link>
							<Nav.Link as={Link} to={documentsUrl}>Documents</Nav.Link>
							<Nav.Link as={Link} to={paymentsUrl}>Payments</Nav.Link>
						</>
						}
						{isLogin && chosenMode === 'tenant' &&
						<>
							<Nav.Link as={Link} to="/payments">Payments</Nav.Link>

						</>
						}
						{/*<Nav.Link as={Link} to={`/renters`}>My Renters</Nav.Link>*/}
						{/*<Nav.Link as={Link} to="/payments">Payments</Nav.Link>*/}
						{/*<Nav.Link as={Link} to="/lease">Lease Management</Nav.Link>*/}
						{/*<Nav.Link as={Link} to='/about' >About</Nav.Link>*/}
						{/*    <Nav.Link as={Link} to="/documents">Document</Nav.Link>*/}


					</Nav>
					<form class="form-inline">
						{this.props.myProperties.length >0 &&
						<SimpleListMenu className="mr-sm-2"  choosenFunc={(d) => this.onChooseAddress(d)}
										options={this.props.myProperties.map(a => a.address)}/>}
						<Nav.Link onClick={() => this.props.logout()} style={{color: "rgba(255,255,255,.5)"}}><ExitToAppIcon/> Logout</Nav.Link>
					</form>
					</Navbar.Collapse>
				</Navbar>
			);
		}
		return (<div></div>)

	}

	onChooseAddress(d) {
		let c = this.props.myProperties[d]
		this.props.history.push("/properties/" + c.id);
	}
}

const mapDispatchToProps = dispatch => ({
	logout: () => dispatch(logoutAction()),
	loadProperties: (ownerId) => dispatch(loadProperties(ownerId))

});
const mapStateToProps = ({clientReducer, myProperties}) => ({
	token: clientReducer.token,
	userId: clientReducer.userId,
	isOwner: clientReducer.isOwner,
	isTenant: clientReducer.isTenant,
	chosenMode: clientReducer.chosenMode,
	tenantAssetId: clientReducer.tenantAssetId,
	myProperties: myProperties.myProperties

});
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(ProperitNavBar));
