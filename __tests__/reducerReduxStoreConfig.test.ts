import componentReducer from '../src/reducers/componentReducer';
import { initialAppStateMock } from '../__mocks__/appStateMocks';
import * as types from '../src/actionTypes';
import { renameReducer } from '../src/utils/componentReducer.util';

// REDUX STORE CONFIG STUFF
describe('set reducer', () => {
  it('should add a reducer to the store config', () => {
    const storeWithAddedReducer = componentReducer(initialAppStateMock, {
      type: types.SET_REDUCER,
      payload: { test: { store: {}, actions: {} } },
    });
    expect(Object.keys(storeWithAddedReducer.storeConfig.reducers)[0]).toEqual('test');
  });

  xit('should NOT add a reducer to the store config when an empty name is given', () => {
    const reducerOutput = componentReducer(initialAppStateMock, {
      type: types.SET_REDUCER,
      payload: { '': { store: {}, actions: {} } },
    });
    expect(Object.keys(reducerOutput.storeConfig.reducers).length).toEqual(0);
  });

  xit('should strip whitespace, camelcase words separated by whitespace, and strips all non-alpha chars at beginning of input', () => {
    const reducerOutput = componentReducer(initialAppStateMock, {
      type: types.SET_REDUCER,
      payload: { '123test red&ucer na?me_45': { store: {}, actions: {} } },
    });
    expect(Object.keys(reducerOutput.storeConfig.reducers)[0]).toEqual('testReducerName_45');
  });

  xit('validates store field names just like reducer names', () => {
    const reducerOutput = componentReducer(initialAppStateMock, {
      type: types.SET_REDUCER,
      payload: {
        test: {
          store: {
            '123test store field na?me_45': {
              type: 'boolean',
              array: false,
              initialValue: 'False',
            },
          },
          actions: {},
        },
      },
    });
    expect(reducerOutput.storeConfig.reducers.test.store).toHaveProperty('testStoreFieldName_45');
  });

  xit('requires an initial value', () => {
    const reducerOutput = componentReducer(initialAppStateMock, {
      type: types.SET_REDUCER,
      payload: {
        test: {
          store: {
            testStoreFieldName: {
              type: 'boolean',
              array: false,
              initialValue: '',
            },
          },
          actions: {},
        },
      },
    });
    expect(Object.keys(reducerOutput.storeConfig.reducers.test.store).length).toEqual(0);
  });

  xit('requires a type selection', () => {
    const reducerOutput = componentReducer(initialAppStateMock, {
      type: types.SET_REDUCER,
      payload: {
        test: {
          store: {
            testStoreFieldName: {
              type: '',
              array: false,
              initialValue: '1',
            },
          },
          actions: {},
        },
      },
    });
    expect(Object.keys(reducerOutput.storeConfig.reducers.test.store).length).toEqual(0);
  });

  xit('requires store field names', () => {
    const reducerOutput = componentReducer(initialAppStateMock, {
      type: types.SET_REDUCER,
      payload: {
        test: {
          store: {
            '': {
              type: 'boolean',
              array: false,
              initialValue: 'true',
            },
          },
          actions: {},
        },
      },
    });
    expect(Object.keys(reducerOutput.storeConfig.reducers.test.store).length).toEqual(0);
  });
});

describe('set interface', () => {
  it('should add an interface to the storeConfig', () => {
    const reducerOutput = componentReducer(initialAppStateMock, {
      type: types.SET_INTERFACE,
      payload: { test: { testField: 'number', testField2: 'boolean' } },
    });
    expect(Object.keys(reducerOutput.storeConfig.interfaces)[0]).toEqual('test');
  });

  xit('should not allow blank name for interface', () => {
    const reducerOutput = componentReducer(initialAppStateMock, {
      type: types.SET_INTERFACE,
      payload: { '': { testField: 'number', testField2: 'boolean' } },
    });
    expect(Object.keys(reducerOutput.storeConfig.interfaces).length).toEqual(0);
  });

  xit('should not allow blank name for interface field', () => {
    const reducerOutput = componentReducer(initialAppStateMock, {
      type: types.SET_INTERFACE,
      payload: { test: { '': 'number', testField2: 'boolean' } },
    });
    expect(Object.keys(reducerOutput.storeConfig.interfaces).length).toEqual(0);
  });

  xit('should not allow blank type for interface field', () => {
    const reducerOutput = componentReducer(initialAppStateMock, {
      type: types.SET_INTERFACE,
      payload: { test: { testField: '', testField2: 'boolean' } },
    });
    expect(Object.keys(reducerOutput.storeConfig.interfaces).length).toEqual(0);
  });
});

describe('edit/delete interface', () => {
  // ! spec for new action
  const addInterfaceOutput = componentReducer(initialAppStateMock, {
    type: types.SET_INTERFACE,
    payload: { test: { testField: 'number', testField2: 'boolean' } },
  });
  xit('should allow you to edit an interface ', () => {
    const renameInterfaceOutput = componentReducer(addInterfaceOutput, {
      type: types.EDIT_INTERFACE,
      payload: {
        oldName: 'test',
        newName: 'renamed',
        fields: { testField: 'number', testField2: 'boolean', testField3: 'string' },
      },
    });
    expect(renameInterfaceOutput.storeConfig.interfaces.renamed).toEqual({
      testField: 'number',
      testField2: 'boolean',
      testField3: 'string',
    });

    expect(renameInterfaceOutput.storeConfig.interfaces).not.toHaveProperty('test');
  });

  it('should allow you to delete an interface', () => {
    const deleteInterfaceOutput = componentReducer(addInterfaceOutput, {
      type: types.DELETE_INTERFACE,
      payload: 'test',
    });
    expect(Object.keys(deleteInterfaceOutput.storeConfig.interfaces).length).toEqual(0);
  });
});

describe('add a selector to a component', () => {});

describe('delete a selector from a component', () => {});

describe('add an action to a component', () => {
  describe('delete an action from a component', () => {});
});

describe('rename reducer', () => {});
describe('delete reducer', () => {});

describe('set state', () => {
  describe('rename state', () => {});
  describe('delete state', () => {});
});
