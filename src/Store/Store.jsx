import {createStore} from 'redux'
import {composeWithDevTools}from 'redux-devtools-extension'
import { reducer } from './Reducer';
export const INITIAL_STORE = [
];

export const store = createStore(reducer, INITIAL_STORE, composeWithDevTools())

