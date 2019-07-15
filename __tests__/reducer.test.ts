import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import componentReducer from '../src/reducers/componentReducer';
import initialAppStateMock from './initialAppStateMock';
import localStorageMock from './localStorageMock';

describe('load init data', () => {
  it('should return the initial state', () => {
    expect(componentReducer(undefined, {})).toEqual(initialAppStateMock);
  });
});
