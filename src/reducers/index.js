import { combineReducers } from 'redux';

import componentReducer from './componentReducer.ts';

console.log(componentReducer);

const reducers = combineReducers({
  workspace: componentReducer,
});

export default reducers;
