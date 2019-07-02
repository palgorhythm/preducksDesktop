import fs from 'fs';
// testing stuff
import {
  dummyComponent,
  dummyAllComponents,
  storeConfigTicTacToe,
  storeConfigTodo,
} from './dummyData';

export const createIndexTsx = (path: string, appName: string): void => {
  const filePath = `${path}/${appName}/src/index.tsx`;
  const data = `
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { reducers } from './reducers';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
`;
  fs.writeFile(filePath, data, (err) => {
    if (err) {
      console.log('index.tsx error:', err.message);
    } else {
      console.log('index.tsx written successfully');
    }
  });
};

export const createReducers = (path: string, appName: string): void => {
  // create reducers file path, and loop through reducers to create other reducer files
  // then build out index that combines reducers
  // const filePath = `${path}/${appName}/src/reducers`;
};

export const createActions = (path: string, appName: string): void => {};
