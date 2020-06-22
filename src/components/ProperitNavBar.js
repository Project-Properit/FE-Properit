import React, { Component } from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { logoutAction } from "../actions/logoutActions";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import logo from "../images/logoWhite .jpg";
import SimpleListMenu from "./addressChoose";
import { loadProperties } from "../actions/propertiesActions";


class ProperitNavBar extends Component {


	componentDidMount() {
		this.props.loadProperties(this.props.ownerId);
	}


	render() {
        const {propId} = this.props.match.params;
		console.log('ds',this.props.match.params)
		console.log('propId',this.props.location.pathname)
		const isLogin = this.props.token
		const isOwner = this.props.isOwner
		const isTenant = this.props.isTenant
		const chosenModeNotFromScreen = this.props.isOwner? 'owner': 'tenant'
		const chosenMode = this.props.chosenMode ? this.props.chosenMode: chosenModeNotFromScreen
		const documentsUrl = this.props.location.pathname.replace('/documents','').replace('/payments','') +'/documents'
		const paymentsUrl = this.props.location.pathname.replace('/payments','').replace('/documents','') +'/payments'
		console.log(chosenMode)
		console.log('isOwner', isOwner)
		console.log('isTenant', isTenant)
		console.log('properties', this.props.myProperties)


		if (isLogin) {
			return (

				<Navbar bg="dark" variant="dark">
					<Navbar.Brand href="/properties"><img className="logo" style={{height: '60px'}} src={logo}
					                                      alt='logo'/></Navbar.Brand>
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
							{this.props.myProperties.length >0 &&
							<SimpleListMenu choosenFunc={(d) => this.onChooseAddress(d)}
						                options={this.props.myProperties.map(a => a.address)}/>}
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

						<Nav.Link onClick={() => this.props.logout()}>Logout</Nav.Link>

					</Nav>
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
	myProperties: myProperties.myProperties

});
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(ProperitNavBar));
