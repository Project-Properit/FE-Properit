import React from 'react';
import {Provider} from 'react-redux';
import configureStore from './configureStore'
import {HashRouter as Router} from 'react-router-dom';
import Routes from './Routes'
let store = configureStore();

function App() {
    return (
        <Provider store={store}>
            <Router>
                <h1>Hello</h1>
                <Routes/>
            </Router>
        </Provider>
    );
}

export default App;
