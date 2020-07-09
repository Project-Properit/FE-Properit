import React from 'react';
import { Route, Router } from 'react-router-dom';
import './App.css'
import Login from "./components/pages/NewLogin/index";

import Signup from "./components/pages/NewLogin/Register/index";
import About from "./components/About";
import Properties from "./components/Properties";
import PropertyInfo from "./components/PropertyInfo";
import AddNewProperty from "./components/AddNewProperty";
import Renters from "./components/Renters";
import ProperitNavBar from "./components/ProperitNavBar";
import history from './history';
import PrivateRoute from "./components/PrivateRoute";
import { Switch } from "react-bootstrap";
import PublicRoute from "./components/PublicRoute";
import HomePage from "./components/pages/HomePage";
import NewUserPage from "./components/pages/NewUserPage";
import DocumentsPage from "./components/pages/DocumentsPage";
import CreateGroupPayments from "./components/CreateGroupPayments";
import SelectionModeView from "./components/SelectionModeView";
import { PaymentsInfo } from "./components/PaymentsInfo";
import PaymentsTabs from "./components/payments/PaymentsTabs";
import MenuDrawer from "./components/MenuDrawer";
import { connect } from "react-redux";

const ORGBAR_HEIGHT = 30;
const TOPBAR_HEIGHT = 65;

class  App extends React.Component {


    render() {
    const topBarHeight = TOPBAR_HEIGHT + (this.props.firstName ? ORGBAR_HEIGHT : 0);
    const routeContentHeight = `calc(100vh - ${topBarHeight}px)`;

    return (
		<Router history={history}>
            {this.props.userId? <ProperitNavBar/> :null}
			<div style={{display: "flex"}}>
				{this.props.userId && (
					<MenuDrawer
						loggedInUserType={this.props.userId}
					/>
				)}
				<div id="main-page">
					{this.props.firstName && (
						<div className="org-bar" style={{height: `${ORGBAR_HEIGHT}px`}}>
                            {this.props.firstName}
						</div>
					)}
					<div id="routeContent" style={{height: routeContentHeight}}>
						<Switch>
							<Route exact path="/" component={HomePage}/>
							<PublicRoute path="/login" component={Login}/>
							<PublicRoute path="/signup" component={Signup}/>
							<PrivateRoute exact path="/chooseView" component={SelectionModeView}/>
							<PrivateRoute exact path="/about" component={About}/>
							<PrivateRoute exact path="/properties" component={Properties}/>
							<PrivateRoute exact path="/addNewProperty" component={AddNewProperty}/>
							<PrivateRoute exact path="/properties/:propId" component={DocumentsPage}/>
							<PrivateRoute exact path="/properties/:propId/edit" component={PropertyInfo}/>
							<PrivateRoute exact path="/properties/:propId/payments" component={PaymentsTabs}/>
							<PrivateRoute exact path="/properties/:propId/documents" component={DocumentsPage}/>
							<PrivateRoute exact path="/properties/:propId/payments/:groupPaymentId"
							              component={PaymentsInfo}/>
							<PrivateRoute exact path="/properties/:propId/CreatePayments"
							              component={CreateGroupPayments}/>
							<PrivateRoute exact path="/renters" component={Renters}/>
							<PrivateRoute exact path="/newUser" component={NewUserPage}/>
						</Switch>
					</div>
				</div>
			</div>
		</Router>
	);}
}

const mapDispatchToProps = dispatch => ({

});
const mapStateToProps = ({clientReducer, myPaymentsReducer}) => ({
	userId: clientReducer.userId,
    firstName: clientReducer.firstName,
	myPayments: myPaymentsReducer.myPayments

});
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);
