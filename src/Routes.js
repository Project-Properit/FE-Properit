import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import Welcome from './components/Welcome'
import About from './components/About'
import Images from './components/Images'

class Routes extends Component {

    render() {
        return (
            <div style={{padding: '14px'}}>
                <Switch>
                    <Route exact path="/" component={Welcome}/>
                    <Route exact path="/about" component={About}/>
                    <Route exact path="/images" component={Images}/>
                </Switch>
            </div>
        );
    }
}

export default withRouter(Routes);
