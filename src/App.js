import React from 'react';
import {Route, Router} from 'react-router-dom';
import './App.css'
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Signup from "./components/Signup";
import About from "./components/About";
import Properties from "./components/Properties";
import PropertyInfo from "./components/PropertyInfo";
import Renters from "./components/Renters";
import Payments from "./components/Payments";
import Documents from "./components/Documents";
import ProperitNavBar from "./components/ProperitNavBar";
import history from './history';
import PrivateRoute from "./components/PrivateRoute";
import {Switch} from "react-bootstrap";
import PublicRoute from "./components/PublicRoute";
function App() {
    return (
        <Router history={history}>
            <ProperitNavBar/>
            <div style={{padding: '14px'}}>
                <Switch>
                    <Route exact path="/" component={Welcome}/>
                    <PublicRoute path="/login" component={Login}/>
                    <PublicRoute path="/signup" component={Signup}/>
                    <PrivateRoute exact path="/about" component={About}/>
                    <PrivateRoute exact path="/properties" component={Properties}/>
                    <PrivateRoute exact path="/properties/:propId" component={PropertyInfo}/>
                    <PrivateRoute exact path="/renters" component={Renters}/>
                    <PrivateRoute exact path="/payments" component={Payments}/>
                    <PrivateRoute exact path="/lease" component={Documents}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
