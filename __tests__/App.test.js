import React from 'react';
import { shallow } from 'enzyme';
import AppContainer from '../src/containers/AppContainer.tsx';
import { App } from '../src/components/App.tsx';

it('App renders AppContainer as a child', () => {
  // wrapped version of react component
  // component comes with additional functionality
  const wrapped = shallow(<App />);
  // look inside wrapped component and find every instance of commentBox inside of it
  expect(wrapped.find(AppContainer).length).toEqual(1);
});

// const sum = (...a) => a.reduce((acc, val) => acc + val, 0);

// test('basic', () => {
//   expect(sum()).toBe(0);
// });

// test('basic again', () => {
//   expect(sum(1, 2)).toBe(3);
// });
