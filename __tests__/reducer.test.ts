// import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import componentReducer from '../src/reducers/componentReducer';
import initialAppStateMock from './initialAppStateMock';
import localStorageMock from './localStorageMock';
import * as types from '../src/actionTypes';

describe('load init data', () => {
  it('should return the initial state', () => {
    expect(componentReducer(undefined, {})).toEqual(initialAppStateMock);
  });
});

describe('addComponent', () => {
  it('should handle addComponent', () => {
    const addComponentResult = componentReducer(initialAppStateMock, {
      type: types.ADD_COMPONENT,
      payload: { title: 'Test' },
    });
    expect(addComponentResult.totalComponents).toEqual(2);
    expect(addComponentResult.nextId).toEqual(3);
    expect(addComponentResult.totalComponents).toEqual(2);
  });
});
