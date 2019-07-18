import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import AppContainer from '../containers/AppContainer.tsx';
import { App } from '../components/App.tsx';
// add braces around LeftContainer to import the non HOC version (WARNING: SHALLOW RENDER IS ALWAYS UNDEFINED)
import LeftContainer from '../containers/LeftContainer.tsx';
import {Provider} from 'react-redux';
import LeftColExpansionPanel from '../components/LeftColExpansionPanel';

configure({
  adapter: new EnzymeAdapter(),
  disableLifecycleMethods: true
});

describe('App', () => {
  it('App renders AppContainer as a child', () => {
    const wrapped = shallow(<App />);
    expect(wrapped.find(AppContainer).length).toEqual(1);
  });
});

describe('LeftContainer', () => {
  let component;

  // these are the props on the component which console.log'ed
  const props = {"components":[{"id":1,"stateful":false,"componentState":[],"title":"App","color":"#FF6D00","props":[],"nextPropId":1,"position":{"x":25,"y":25,"width":600,"height":400},"childrenArray":[],"nextChildId":1,"focusChildId":0,"selectors":[],"actions":[]},{"id":3,"stateful":false,"componentState":[],"title":"TestComponent","color":"#5AB9EA","props":[],"nextPropId":1,"position":{"x":25,"y":25,"width":800,"height":550},"childrenArray":[],"nextChildId":1,"focusChildId":0,"selectors":[],"actions":[]},{"id":5,"stateful":false,"componentState":[],"title":"TestComponentTwo","color":"#7395AE","props":[],"nextPropId":1,"position":{"x":25,"y":25,"width":800,"height":550},"childrenArray":[],"nextChildId":1,"focusChildId":0,"selectors":[],"actions":[]}],"totalComponents":3,"focusComponent":{"id":1,"stateful":false,"componentState":[],"title":"App","color":"#FF6D00","props":[],"nextPropId":1,"position":{"x":25,"y":25,"width":600,"height":400},"childrenArray":[],"nextChildId":1,"focusChildId":0,"selectors":[],"actions":[]},"selectableChildren":[3,5],"classes":{"cssLabel":"Connect-LeftContainer--cssLabel-1","cssFocused":"Connect-LeftContainer--cssFocused-2","input":"Connect-LeftContainer--input-3","underline":"Connect-LeftContainer--underline-4","button":"Connect-LeftContainer--button-5","clearButton":"Connect-LeftContainer--clearButton-6"},"storeConfig":{"interfaces":{},"reducers":{}}}


  beforeEach(() => {
    // doesn't render LeftContainer itself, renders a HOC that wraps it
    // methods like .dive() and .childAt() haven't helped when i tried them
    // try wrapping in redux <Provider> and use a mock store (redux-mock-store i think is the library)
    // the challenge is to figure out how to get to the LeftContainer through the HOC
    // also look into mount() rather than shallow()
    component = shallow(<LeftContainer {...props}/>);
  });

  xit('Should add a component to the list when a new one is added', () => {

  });

  it('There should be as many list items as there are elements in its component array prop', () => {
    const leftColExpansions = component.find(LeftColExpansionPanel);
    expect(LeftColExpansionPanel).toEqual(component.prop('components').length);
  });
});


