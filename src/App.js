import React from 'react';
import {Provider} from 'react-redux';
import configureStore from './configureStore'
import {Route, Router} from 'react-router-dom';
import './App.css'
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import Signup from "./components/Signup";
import About from "./components/About";
import Images from "./components/Images";
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
import HomePage from "./components/pages/HomePage";


let store = configureStore();
console.log("Configure Store")
function App() {
    console.log("RENDER APP")
    return (
        <Provider store={store}>
            <Router history={history}>
                <ProperitNavBar/>
                <div style={{padding: '14px'}}>
                    <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <PublicRoute  path="/login" component={Login}/>
                    <PublicRoute path="/signup" component={Signup}/>
                    <PrivateRoute exact path="/about" component={About}/>
                    <PrivateRoute exact path="images" component={Images}/>
                    <PrivateRoute exact path="/users/:userId/properties" component={Properties}/>
                    <PrivateRoute exact path="/users/:userId/properties/:propId" component={PropertyInfo}/>
                    <PrivateRoute exact path="/users/:userId/renters" component={Renters}/>
                    <PrivateRoute exact path="/users/:userId/payments" component={Payments}/>
                    <PrivateRoute exact path="/document" component={Documents}/>
                    {/*<PrivateRoute exact path="/users/:userId/lease" component={Documents}/>*/}

                    </Switch>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
