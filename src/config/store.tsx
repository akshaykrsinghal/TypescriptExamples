import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from 'config/reducers';

export const store = createStore(rootReducer, applyMiddleware(thunk));
