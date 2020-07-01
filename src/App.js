import React from 'react';
import {Route, Router} from 'react-router-dom';
import './App.css'
import Login from "./components/pages/NewLogin/index";

import Signup from "./components/pages/NewLogin/Register/index";
import About from "./components/About";
import Properties from "./components/Properties";
import PropertyInfo from "./components/PropertyInfo";
import AddNewProperty from "./components/AddNewProperty";
import Renters from "./components/Renters";
import GroupsPayments from "./components/GroupsPayments";
import ProperitNavBar from "./components/ProperitNavBar";
import history from './history';
import PrivateRoute from "./components/PrivateRoute";
import {Switch} from "react-bootstrap";
import PublicRoute from "./components/PublicRoute";
import HomePage from "./components/pages/HomePage";
import NewUserPage from "./components/pages/NewUserPage";
import DocumentsPage from "./components/pages/DocumentsPage";
import FilesUpload from "./components/pages/documents/filesUpload";
import DocumentsView from "./components/pages/DocumentsView/index";


import Documents from "./components/Documents";
import CreateGroupPayments from "./components/CreateGroupPayments";
import SelectionModeView from "./components/SelectionModeView";
import {PaymentsInfo} from "./components/PaymentsInfo";
import PaymentsTabs from "./components/payments/PaymentsTabs";
import MenuDrawer from "./components/MenuDrawer";
import { BrowserView, MobileView } from "react-device-detect";

const ORGBAR_HEIGHT = 30;
const TOPBAR_HEIGHT = 65;

function App() {
    const loggedInUser = "shoham";
    const orgBarExists = !!loggedInUser;
    const topBarHeight = TOPBAR_HEIGHT + (orgBarExists ? ORGBAR_HEIGHT : 0);
    const routeContentHeight = `calc(100vh - ${topBarHeight}px)`;

    return (
        <Router history={history}>
            <ProperitNavBar/>
            <div style={{ display: "flex" }}>
                {loggedInUser && (
                    <MenuDrawer
                        loggedInUserType={loggedInUser.type}
                    />
                )}
                <div id="main-page">
                    {orgBarExists && (
                        <div className="org-bar" style={{ height: `${ORGBAR_HEIGHT}px` }}>
                            "להכניס את השם של היוזר המחובר"
                        </div>
                    )}
                    <div id="routeContent" style={{ height: routeContentHeight }}>
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
                                <PrivateRoute exact path="/properties/:propId/payments/:groupPaymentId" component={PaymentsInfo}/>
                                <PrivateRoute exact path="/properties/:propId/CreatePayments" component={CreateGroupPayments}/>
                                <PrivateRoute exact path="/renters" component={Renters}/>
                                <PrivateRoute exact path="/newUser" component={NewUserPage}/>
                            </Switch>
                    </div>
                </div>
            </div>

            {/*<div className={'tt'}>*/}
            {/*    <MenuDrawer/>*/}
            {/*    <Switch>*/}
            {/*        <Route exact path="/" component={HomePage}/>*/}
            {/*        <PublicRoute path="/login" component={Login}/>*/}
            {/*        <PublicRoute path="/signup" component={Signup}/>*/}
            {/*        <PrivateRoute exact path="/chooseView" component={SelectionModeView}/>*/}
            {/*        <PrivateRoute exact path="/about" component={About}/>*/}
            {/*        <PrivateRoute exact path="/properties" component={Properties}/>*/}
            {/*        <PrivateRoute exact path="/addNewProperty" component={AddNewProperty}/>*/}
            {/*        <PrivateRoute exact path="/properties/:propId" component={DocumentsPage}/>*/}
            {/*        <PrivateRoute exact path="/properties/:propId/edit" component={PropertyInfo}/>*/}
            {/*        <PrivateRoute exact path="/properties/:propId/payments" component={PaymentsTabs}/>*/}
            {/*        <PrivateRoute exact path="/properties/:propId/documents" component={DocumentsPage}/>*/}
            {/*        <PrivateRoute exact path="/properties/:propId/payments/:groupPaymentId" component={PaymentsInfo}/>*/}
            {/*        <PrivateRoute exact path="/properties/:propId/CreatePayments" component={CreateGroupPayments}/>*/}
            {/*        <PrivateRoute exact path="/renters" component={Renters}/>*/}
            {/*        <PrivateRoute exact path="/newUser" component={NewUserPage}/>*/}
            {/*    </Switch>*/}
            {/*</div>*/}
        </Router>
    );
}

export default App;
