import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import Welcome from './components/Welcome'
import About from './components/About'
import Images from './components/Images'
import Documents from './components/pages/documents/filesUpload'
import Properties from './components/Properties'
import PropertyInfo from './components/PropertyInfo'
import Renters from './components/Renters'
import Payments from './components/Payments'
import LeaseManagement from './components/LeaseManagement'
import ProperitNavBar from './components/ProperitNavBar'
import HomePage from "./components/pages/HomePage";

class Routes extends Component {

    render() {
        const {location} = this.props;
        return (
            <div >
                {location.pathname !== '/about' && location.pathname !== '/' &&<ProperitNavBar/>}
                <div>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/welcome" component={Welcome}/>
                    <Route exact path="/about" component={About}/>
                    <Route exact path="/images" component={Images}/>
                    <Route exact path="/document" component={Documents}/>
                    <Route exact path="/users/:userId/properties" component={Properties}/>
                    <Route exact path="/users/:userId/properties/:propId" component={PropertyInfo}/>
                    <Route exact path="/users/:userId/renters" component={Renters}/>
                    <Route exact path="/users/:userId/payments" component={Payments}/>
                    <Route exact path="/users/:userId/lease" component={LeaseManagement}/>
                    {/*<Route component={Welcome}/>*/}
                </Switch>
                </div>
            </div>
        );
    }
}

export default withRouter(Routes);
