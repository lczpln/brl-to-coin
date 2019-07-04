import { createStore, combineReducers } from 'redux';

import coinReducer from './reducers/coin';

const store = createStore(coinReducer)

export default store;