import React from 'react';
import Reducer from './Reducer';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider as ProviderRedux } from 'react-redux';
import reduxThunk from 'redux-thunk';
import Model from '../Model';

export const store = createStore(
    combineReducers(Model._events.combineReducers(Reducer)),
    {},
    applyMiddleware(reduxThunk),
);
Model._events.setStore(store)

const Redux = (props) => {
    return (<ProviderRedux store={store} >
        {props.children}
    </ProviderRedux>)
}
export default Redux;