import {applyMiddleware, createStore, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers/rootReducer';
import rootSaga from './sagas/sagas';
import history from './history';
import { routerMiddleware } from 'connected-react-router';

export default function configureStore() {
    const composeSetup =
    process.env.NODE_ENV !== 'production' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : compose;
    const sagaMiddleware = createSagaMiddleware();

    const appRouterMiddleware = routerMiddleware(history);

    const store = createStore(rootReducer, compose(applyMiddleware(sagaMiddleware,appRouterMiddleware)));
    sagaMiddleware.run(rootSaga);
    return store;

}