import React from 'react';
import {Route, Router} from 'react-router-dom';
import './App.css'
// import Login from "./components/Login";
import Login from "./components/pages/NewLogin/index";

import Signup from "./components/Signup";
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
import FilesUpload from "./components/pages/documents/filesUpload";
import DocumentsView from "./components/pages/DocumentsView/index";


import Documents from "./components/Documents";
import CreateGroupPayments from "./components/CreateGroupPayments";

function App() {
    return (
        <Router history={history}>
            <ProperitNavBar/>
            <div className={'tt'}>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <PublicRoute path="/login" component={Login}/>
                    <PublicRoute path="/signup" component={Signup}/>
                    <PrivateRoute exact path="/about" component={About}/>
                    <PrivateRoute exact path="/properties" component={Properties}/>
                    <PrivateRoute exact path="/addNewProperty" component={AddNewProperty}/>
                    <PrivateRoute exact path="/properties/:propId" component={PropertyInfo}/>
                    <PrivateRoute exact path="/properties/:propId/payments" component={GroupsPayments}/>
                    <PrivateRoute exact path="/properties/:propId/CreatePayments" component={CreateGroupPayments}/>
                    <PrivateRoute exact path="/renters" component={Renters}/>
                    <PrivateRoute exact path="/lease" component={Documents}/>
                    <PrivateRoute exact path="/documents" component={DocumentsView}/>

                </Switch>
            </div>
        </Router>
    );
}

export default App;
