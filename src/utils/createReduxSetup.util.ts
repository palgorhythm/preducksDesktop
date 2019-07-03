// testing stuff
import { Action, createStore } from 'redux';
import { isValidElement } from 'react';
import { format } from 'prettier';
import { StoreConfigInterface } from './Interfaces';

const fs = require('fs');
const {
  dummyComponent,
  dummyAllComponents,
  storeConfigTicTacToe,
  storeConfigTTTMultiReducer,
  storeConfigTodo,
} = require('./dummyData');

const dummyFilePath = '/Users/jacobrichards/Desktop/';

function createInterfaces(interfaceArray) {
  let data = '';

  // CREATE INTERFACES
  Object.keys(interfaceArray).forEach((interfaceName) => {
    let curInterface = `export interface ${interfaceName} {\n`;
    Object.keys(interfaceArray[interfaceName]).forEach((property) => {
      // loop thru all properties of the current interface
      const curType = interfaceArray[interfaceName][property];
      curInterface += `${property}: ${curType};\n`;
      // because curType needs to be flexible (can be an interface that was previously defined)
      // we need to add this UI to the frontend so that each interface that is created is now
      // an available type that can be applied when building subsequent interfaces.
    });
    curInterface += '}\n\n';
    data += curInterface;
  });
  return data;
}

export const createSharedInterfaces = (
  // creates an Interfaces.tsx that all other redux files will import from.
  path: string,
  appName: string,
  storeConfig: StoreConfigInterface,
): void => {
  // create reducers file path, and loop through reducers to create other reducer files
  // then build out index that combines reducers
  const filePath: string = `${path}${appName}/src/Interfaces.ts`;
  const data = createInterfaces(storeConfig.interfaces);
  fs.writeFileSync(
    filePath,
    format(data, {
      parser: 'typescript',
    }),
  );
};

export const createStoresAndActionsForEachReducer = (
  // creates an Interfaces.tsx that all other redux files will import from.
  path: string,
  appName: string,
  storeConfig: StoreConfigInterface,
): void => {
  // CREATE INTERFACES FOR EACH REDUCER
  Object.keys(storeConfig.reducers).forEach((reducer) => {
    // CREATE ACTION TYPES STUFF //////////////
    const actionTypesFile: string = `${path}${appName}/src/actions/${reducer}ActionTypes.ts`;
    const actions = Object.keys(storeConfig.reducers[reducer].actions); // action names in a list

    let actionInterfacesText = '';
    const actionCreatorsText = '';
    const actionNamesWithActionAppended = [];
    actions.forEach((actionName, i) => {
      const curActionObj = storeConfig.reducers[reducer].actions[actionName];
      const interfaceName = `${actionName}Action`;
      actionNamesWithActionAppended.push(interfaceName);

      // add an action interface
      const payloadType = curActionObj.payload.type;
      const curActionInterface = `export interface ${interfaceName} {\n
        type: ${reducer}ActionTypes.${actionName};
        payload: ${payloadType};
      }\n\n`;
      actionInterfacesText += curActionInterface;

      // add boilerplate for this action creator function
      const curActionCreator = `export const ${actionName} = ()`;
    });

    // import all shared interfaces
    const interfacesImportText = `import {${Object.keys(
      storeConfig.interfaces,
    ).toString()}} from '../Interfaces';\n\n`;
    // exoirt an enum with all actions
    const actionTypesEnumText = `export enum ${reducer}ActionTypes{${actions.toString()}};\n\n`;
    const typeGuardText = `export type Action = ${actionNamesWithActionAppended.join('|')};\n\n`;
    fs.writeFileSync(
      actionTypesFile,
      format(interfacesImportText + actionInterfacesText + actionTypesEnumText + typeGuardText, {
        parser: 'typescript',
      }),
    );

    // ///// ACTIONS STUFF /////////////////////////////

    const actionsFile: string = `${path}${appName}/src/actions/${reducer}Actions.ts`;
    // import dispatch, import the action types enum, and import ALL action interfaces
    const actionsImportText = `import {Dispatch} from 'redux';
    import {${reducer}ActionTypes, ${actionNamesWithActionAppended.join(',')}} 
    from ${reducer}ActionTypes.ts\n`;

    fs.writeFileSync(
      actionsFile,
      format(actionsImportText + interfacesImportText, {
        parser: 'typescript',
      }),
    );

    // next, we set up interfaces for the store
    const reducerFile: string = `${path}${appName}/src/reducers/${reducer}Reducer.ts`;
  });
  const combineReducersFile: string = `${path}${appName}/src/reducers/combineReducers.ts`;
};

const createActionFile = (
  path: string,
  appName: string,
  storeConfig: StoreConfigInterface,
): void => {};

export const createReducers = (
  path: string,
  appName: string,
  storeConfig: StoreConfigInterface,
): void => {
  // create reducers file path, and loop through reducers to create other reducer files
  // then build out index that combines reducers
  const filePath: string = `${path}/${appName}/src/reducers`;
  const data = '';
  fs.writeFileSync(filePath, data);
};

// createInterfaces(dummyFilePath, 'yeet', storeConfigTTTMultiReducer);

export const createActions = (path: string, appName: string): void => {};

// function createReducer(initialState, handlers) {
//   return function reducer(state = initialState, action) {
//     if (handlers.hasOwnProperty(action.type)) {
//       return handlers[action.type](state, action)
//     } else {
//       return state
//     }
//   }
// }

// createSharedInterfaces(dummyFilePath, 'yeet', storeConfigTTTMultiReducer);
// createStoresAndActionsForEachReducer(dummyFilePath, 'yeet', storeConfigTTTMultiReducer);
