import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import Welcome from './components/Welcome'
import About from './components/About'
import Images from './components/Images'
import Properties from './components/Properties'
import Renters from './components/Renters'
import Payments from './components/Payments'
import LeaseManagement from './components/LeaseManagement'
import ProperitNavBar from './components/ProperitNavBar'

class Routes extends Component {

    render() {
        const {location} = this.props;
        return (
            <div >
                {location.pathname !== '/about' && location.pathname !== '/' &&<ProperitNavBar/>}
                <div style={{padding:'14px'}}>
                <Switch>
                    <Route exact path="/" component={Welcome}/>
                    <Route exact path="/about" component={About}/>
                    <Route exact path="/images" component={Images}/>
                    <Route exact path="/users/:userId/properties" component={Properties}/>
                    <Route exact path="/users/:userId/renters" component={Renters}/>
                    <Route exact path="/users/:userId/payments" component={Payments}/>
                    <Route exact path="/users/:userId/lease" component={LeaseManagement}/>
                    <Route component={Welcome}/>
                </Switch>
                </div>
            </div>
        );
    }
}

export default withRouter(Routes);
