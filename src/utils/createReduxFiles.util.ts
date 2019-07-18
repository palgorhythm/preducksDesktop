import { format } from 'prettier';
import { StoreConfigInterface } from './Interfaces';

const fs = require('fs');

function createInterfaces(interfaceObj) {
  let data = '';

  // CREATE INTERFACESddddd
  Object.keys(interfaceObj).forEach((interfaceName) => {
    let curInterface = `export interface ${interfaceName} {\n`;
    Object.keys(interfaceObj[interfaceName]).forEach((property) => {
      // loop thru all properties of the current interface
      const curType = interfaceObj[interfaceName][property];
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

const createSharedInterfaces = (
  // creates an Interfaces.tsx that all other redux files will import from.
  path: string,
  appName: string,
  storeConfig: StoreConfigInterface,
): any => {
  // create reducers file path, and loop through reducers to create other reducer files
  // then build out index that combines reducers
  const filePath: string = `${path}/${appName}/src/Interfaces.ts`;
  const data = createInterfaces(storeConfig.interfaces);
  fs.writeFileSync(
    filePath,
    format(data, {
      parser: 'typescript',
    }),
  );
};

function createActionFiles(path, appName, storeConfig, reducerName) {
  // CREATE ACTION TYPES STUFF //////////////
  const reducerObj = storeConfig.reducers[reducerName];
  const actionTypesFile: string = `${path}/${appName}/src/actions/${reducerName}ActionTypes.ts`;
  const actions = Object.keys(reducerObj.actions); // action names in a list

  let actionInterfacesText = '';
  let actionCreatorsText = '';
  const actionInterfaceNames = [];
  actions.forEach((actionName, i) => {
    // loop through all actions and generate all text in actionTypes
    // and actions that depends on it.
    const curActionObj = reducerObj.actions[actionName];
    const actionInterfaceName = `${actionName}ActionInterface`;
    actionInterfaceNames.push(actionInterfaceName);

    // add an action interface
    const bracketsIfPayloadIsAnArray = curActionObj.payload.array ? '[]' : '';
    const payloadType = curActionObj.payload.type;
    const curActionInterface = `export interface ${actionInterfaceName}{\n
      type: ${reducerName}ActionTypes.${actionName};
      payload?: ${payloadType}${bracketsIfPayloadIsAnArray};
    }\n\n`;
    actionInterfacesText += curActionInterface;

    // add boilerplate for this action creator function
    let curActionCreatorText;
    const bracketsIfParamIsAnArray = curActionObj.parameter.array ? '[]' : '';
    const paramWithColonIfParamExists = curActionObj.parameter.name
      ? `${curActionObj.parameter.name} : `
      : '';
    if (curActionObj.async) {
      curActionCreatorText = `export const ${actionName} = (${paramWithColonIfParamExists}${curActionObj.parameter.type}${bracketsIfParamIsAnArray}) => {
        return async (dispatch: Dispatch) => {
          // your code here ! add your own payload to the dispatched action.
          dispatch<${actionInterfaceName}>({
            type: ${reducerName}ActionTypes.${actionName}
          });
        };
      };`;
    } else {
      curActionCreatorText = `export const ${actionName} = 
      (${paramWithColonIfParamExists}${curActionObj.parameter.type}${bracketsIfParamIsAnArray}) : 
      ${actionInterfaceName} => {
          // your code here ! add your own payload to the dispatched action.
          return {
            type: ${reducerName}ActionTypes.${actionName}
          };
      };`;
    }

    actionCreatorsText += curActionCreatorText;
  });

  // import all shared interfaces
  const interfacesImportText = `import {${Object.keys(
    storeConfig.interfaces,
  ).toString()}} from '../Interfaces';\n\n`;
  // exoirt an enum with all actions
  const actionTypesEnumText = `export enum ${reducerName}ActionTypes{${actions.toString()}};\n\n`;
  const typeGuardText = `export type ${reducerName}ActionInterfaceUnion = ${actionInterfaceNames.join(
    '|',
  )};\n\n`;
  fs.writeFileSync(
    actionTypesFile,
    format(interfacesImportText + actionInterfacesText + actionTypesEnumText + typeGuardText, {
      parser: 'typescript',
    }),
  );

  // ///// ACTIONS STUFF /////////////////////////////

  const actionsFile: string = `${path}/${appName}/src/actions/${reducerName}Actions.ts`;
  // import dispatch, import the action types enum, and import ALL action interfaces
  const actionsImportText = `import {Dispatch} from 'redux';
  import {${reducerName}ActionTypes, ${actionInterfaceNames.join(',')}} 
  from './${reducerName}ActionTypes'\n`;
  fs.writeFileSync(
    actionsFile,
    format(actionsImportText + interfacesImportText + actionCreatorsText, {
      parser: 'typescript',
    }),
  );
}

function createReducerFiles(path, appName, storeConfig, reducerName) {
  const reducerFile: string = `${path}/${appName}/src/reducers/${reducerName}Reducer.ts`;
  const currentReducerStoreSlice = storeConfig.reducers[reducerName].store;
  let importText = `import {${reducerName}ActionInterfaceUnion, ${reducerName}ActionTypes} from '../actions/${reducerName}ActionTypes'\n`;
  importText += `import {${Object.keys(
    storeConfig.interfaces,
  ).toString()}} from '../Interfaces';\n\n`;

  let storeSliceInterfaceText = `export interface ${reducerName}StoreSliceInterface {`;
  const initialState = {};
  Object.keys(currentReducerStoreSlice).forEach((storeSlicePropertyName) => {
    // build out interfaces for this reducer's store slices first!
    const storeSlicePropObj = currentReducerStoreSlice[storeSlicePropertyName];
    const bracketsIfPropIsAnArray = storeSlicePropObj.array ? '[]' : '';
    storeSliceInterfaceText += `${storeSlicePropertyName}: ${storeSlicePropObj.type}${bracketsIfPropIsAnArray};\n`;
    initialState[storeSlicePropertyName] = storeSlicePropObj.initialValue;
  });
  storeSliceInterfaceText += '};\n\n';
  const initialStateText = `const initialState: ${reducerName}StoreSliceInterface = ${JSON.stringify(
    initialState,
  )}\n\n`;

  let reducerText = `export const ${reducerName}Reducer = 
  (state: ${reducerName}StoreSliceInterface = initialState, action: ${reducerName}ActionInterfaceUnion) => {
    switch(action.type){\n`;

  Object.keys(storeConfig.reducers[reducerName].actions).forEach((actionTypeName) => {
    // need each action name to do cases for each action type
    reducerText += `case ${reducerName}ActionTypes.${actionTypeName}:
    // your logic here!
    return state;\n`;
  });
  reducerText += `default: 
      return state;
    }
  };`;

  fs.writeFileSync(
    reducerFile,
    format(importText + storeSliceInterfaceText + initialStateText + reducerText, {
      parser: 'typescript',
    }),
  );
}

const createActionsAndStoresForEachReducer = (
  // creates an Interfaces.tsx that all other redux files will import from.
  path: string,
  appName: string,
  storeConfig: StoreConfigInterface,
): void => {
  const rootReducerFile: string = `${path}/${appName}/src/reducers/index.ts`;
  let rootReducerImportsText = "import {combineReducers} from 'redux';\n";
  let storeInterfaceText = 'export interface StoreInterface {\n';
  let combineReducersText = 'export const reducers = combineReducers<StoreInterface>({\n';

  const reducerNamesArray = Object.keys(storeConfig.reducers);
  reducerNamesArray.forEach((reducerName) => {
    rootReducerImportsText += `import {${reducerName}Reducer, ${reducerName}StoreSliceInterface } from './${reducerName}Reducer';\n`;
    storeInterfaceText += `${reducerName}: ${reducerName}StoreSliceInterface;\n`;
    combineReducersText += `${reducerName}: ${reducerName}Reducer,\n`;

    createActionFiles(path, appName, storeConfig, reducerName);
    createReducerFiles(path, appName, storeConfig, reducerName);
  });
  rootReducerImportsText += '\n';
  storeInterfaceText += '}\n\n';
  combineReducersText += '});\n';

  fs.writeFileSync(
    rootReducerFile,
    format(rootReducerImportsText + storeInterfaceText + combineReducersText, {
      parser: 'typescript',
    }),
  );
};

export const createReduxFiles = async (
  // CALL THIS FUNCTION FROM OUTSIDE AND IT WILL DO THE WHOLE REDUX SETUP.
  // creates an Interfaces.tsx that all other redux files will import from.
  path: string,
  appName: string,
  storeConfig: StoreConfigInterface,
): Promise<string> => {
  await createSharedInterfaces(path, appName, storeConfig);
  await createActionsAndStoresForEachReducer(path, appName, storeConfig);
  return null;
};
