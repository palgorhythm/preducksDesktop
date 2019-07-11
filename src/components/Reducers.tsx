import React, { Component } from 'react';
import { connect, useSelector } from 'react-redux';
import { Button, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField, Checkbox, Input } from '@material-ui/core';
import * as actions from '../actions/components';
import { ReducersInterface } from '../utils/interfaces';

const mapDispatchToProps = (dispatch: any) => ({
  setReducer: (reducer: ReducersInterface) => dispatch(actions.setReducer(reducer)),
});

const mapStateToProps = (store: any) => ({
  reducers: store.workspace.storeConfig.reducers,
});

interface PropsInt {
  setReducer: any,
  reducers: any,
}

class Reducers extends Component<PropsInt> {
  constructor(props: PropsInt) {
    super(props);
    this.state = {};
  }

  createNewReducer = () => {
    let newReducers = this.props.reducers;
    const newReducerName = document.getElementById('newReducerNameInput').value;
    newReducers[newReducerName] = { store: {}, actions: {} };
    this.props.setReducer({ [newReducerName]: { store: {}, actions: {} } });
    // this.setState({ reducers: newReducers });
    document.getElementById('newReducerNameInput').value = '';
  };

  handleSelectChange = (event: Event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleCheckboxChange = (event: Event) => {
    const flippedBool = (this.state[event.target.name]) ? false : true;
    this.setState({ [event.target.name]: flippedBool });
  };

  addItemToStore = (reducerName: string) => {
    let newReducers = this.props.reducers;
    const reducerEl = document.getElementById('reducer' + reducerName);
    const storeItemName = reducerEl.querySelector('#storeItemName').value;
    const storeItemType = reducerEl.querySelector('#storeItemType' + reducerName).value;
    const storeItemIsArray = reducerEl.querySelector('#storeItemIsArray' + reducerName).checked;
    const storeItemItitialValue = reducerEl.querySelector('#storeItemItitialValue').value;
    newReducers[reducerName].store[storeItemName] = {
      type: storeItemType,
      array: storeItemIsArray,
      initialValue: storeItemItitialValue
    };
    this.props.setReducer({ [reducerName]: newReducers[reducerName] });
    // this.setState({ reducers: newReducers });
    reducerEl.querySelector('#storeItemName').value = '';
    this.setState({ ['storeItemType' + reducerName]: '' });
    this.setState({ ['storeItemIsArray' + reducerName]: false });
    reducerEl.querySelector('#storeItemItitialValue').value = '';
  };

  deleteItemFromStore = (reducerName: string, itemName: string) => {
    let newReducers = this.props.reducers;
    delete newReducers[reducerName].store[itemName];
    this.props.setReducer({ [reducerName]: newReducers[reducerName] });
    // this.setState({ reducers: newReducers });
  };

  addItemToActions = (reducerName: string) => {
    let newReducers = this.props.reducers;
    const reducerEl = document.getElementById('reducer' + reducerName);
    const actionItemName = reducerEl.querySelector('#actionItemName').value;
    const actionItemParameterName = reducerEl.querySelector('#actionItemParameterName').value;
    const actionItemParameterType = reducerEl.querySelector('#actionItemParameterType' + reducerName).value;
    const actionItemParameterIsArray = reducerEl.querySelector('#actionItemParameterIsArray' + reducerName).checked;
    const actionItemPayloadType = reducerEl.querySelector('#actionItemPayloadType' + reducerName).value;
    const actionItemPayloadIsArray = reducerEl.querySelector('#actionItemPayloadIsArray' + reducerName).checked;
    const actionItemIsAsync = reducerEl.querySelector('#actionItemIsAsync' + reducerName).checked;
    newReducers[reducerName].actions[actionItemName] = {
      parameter: { name: actionItemParameterName, type: actionItemParameterType, array: actionItemParameterIsArray },
      payload: { type: actionItemPayloadType, array: actionItemPayloadIsArray },
      async: actionItemIsAsync,
    };
    this.props.setReducer({ [reducerName]: newReducers[reducerName] });
    // this.setState({ reducers: newReducers });
    reducerEl.querySelector('#actionItemName').value = '';
    reducerEl.querySelector('#actionItemParameterName').value = '';
    this.setState({ ['actionItemParameterType' + reducerName]: '' });
    this.setState({ ['actionItemParameterIsArray' + reducerName]: false });
    this.setState({ ['actionItemPayloadType' + reducerName]: '' });
    this.setState({ ['actionItemPayloadIsArray' + reducerName]: false });
    this.setState({ ['actionItemIsAsync' + reducerName]: false });    
  };

  deleteItemFromActions = (reducerName: string, itemName: string) => {
    let newReducers = this.props.reducers;
    delete newReducers[reducerName].actions[itemName];
    this.props.setReducer({ [reducerName]: newReducers[reducerName] });
    // this.setState({ reducers: newReducers });
  };

  render() {
    return (
      <section id="reducersOuter">
        <h2>Reducers</h2>
        <div id="reducers">
          {this.props.reducers && Object.keys(this.props.reducers).map(reducer => (
            <div className="reducer" id={'reducer' + reducer} key={'reducer' + reducer}>
              <h3>{reducer}</h3>
              <div id="store">
                <h4>Store</h4>
                <div className="storeItems">
                  {this.props.reducers[reducer].store && Object.keys(this.props.reducers[reducer].store).map(store => (
                    <div className="storeItem" key={"storeItem" + store}>
                      <span>{store}</span>
                      <span>{this.props.reducers[reducer].store[store].type}</span>
                      <span>{(this.props.reducers[reducer].store[store].array) ? '✓' : '×' }</span>
                      <span>{this.props.reducers[reducer].store[store].initialValue}</span>
                      <Button onClick={() => this.deleteItemFromStore(reducer, store)} variant="outlined">Delete</Button>
                    </div>
                  ))}
                </div>
                <form className="newStoreItem">
                  <TextField
                    name="storeItemName"
                    id="storeItemName"
                    label="name"
                  />
                  <FormControl>
                    <InputLabel htmlFor={"storeItemType" + reducer}>type</InputLabel>
                    <Select
                      name={"storeItemType" + reducer}
                      id={"storeItemType" + reducer}
                      value={this.state['storeItemType' + reducer] || ''}
                      onChange={this.handleSelectChange}
                    >
                      <MenuItem value="boolean">boolean</MenuItem>
                      <MenuItem value="number">number</MenuItem>
                      <MenuItem value="string">string</MenuItem>
                      <MenuItem value="any">any</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControlLabel
                    control = {
                      <Checkbox
                        name={"storeItemIsArray" + reducer}
                        id={"storeItemIsArray" + reducer}
                        checked={this.state['storeItemIsArray' + reducer] || false}
                        onChange={this.handleCheckboxChange}
                        />
                    }
                    label="array"
                  />
                  <TextField
                    name="storeItemItitialValue"
                    id="storeItemItitialValue"
                    label="initial value"
                  />
                  <Button
                    variant="outlined"
                    onClick={() => this.addItemToStore(reducer)}
                    >
                    +
                  </Button>
                </form>
              </div>
              <div id="actions">
                <h4>Actions</h4>
                <div className="actionItems">
                  {this.props.reducers[reducer].actions && Object.keys(this.props.reducers[reducer].actions).map(action => (
                    <div className="actionItem" key={"action" + action}>
                      <span>{action}</span>
                      <span>{this.props.reducers[reducer].actions[action].parameter.name}</span>
                      <span>{this.props.reducers[reducer].actions[action].parameter.type}</span>
                      <span>{(this.props.reducers[reducer].actions[action].parameter.array) ? '✓' : '×' }</span>
                      <span>{this.props.reducers[reducer].actions[action].payload.type}</span>
                      <span>{(this.props.reducers[reducer].actions[action].payload.array) ? '✓' : '×' }</span>
                      <span>{(this.props.reducers[reducer].actions[action].async) ? '✓' : '×' }</span>
                      <Button onClick={() => this.deleteItemFromActions(reducer, action)} variant="outlined">Delete</Button>
                    </div>
                  ))}
                </div>
                <form className="newActionItem">
                  <TextField
                    name="actionItemName"
                    id="actionItemName"
                    label="name"
                  />
                  <div className="newActionItemParameterFields">
                    <TextField
                      name="actionItemParameterName"
                      id="actionItemParameterName"
                      label="parameter name"
                    />
                    <FormControl>
                      <InputLabel htmlFor="actionItemParameterType">parameter type</InputLabel>
                      <Select
                        name={"actionItemParameterType" + reducer}
                        id={"actionItemParameterType" + reducer}
                        value={this.state['actionItemParameterType' + reducer] || ''}
                        onChange={this.handleSelectChange}
                      >
                        <MenuItem value="boolean">boolean</MenuItem>
                        <MenuItem value="number">number</MenuItem>
                        <MenuItem value="string">string</MenuItem>
                        <MenuItem value="any">any</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControlLabel
                      control = {
                        <Checkbox
                          name={'actionItemParameterIsArray' + reducer}
                          id={'actionItemParameterIsArray' + reducer}
                          checked={this.state['actionItemParameterIsArray' + reducer] || false}
                          onChange={this.handleCheckboxChange}
                          />
                      }
                      label="parameter array"
                    />
                  </div>
                  <div className="newActionItemPayloadFields">
                    <FormControl>
                      <InputLabel htmlFor="actionItemPayloadType">payload type</InputLabel>
                      <Select
                        name={"actionItemPayloadType" + reducer}
                        id={"actionItemPayloadType" + reducer}
                        value={this.state['actionItemPayloadType' + reducer] || ''}
                        onChange={this.handleSelectChange}
                      >
                        <MenuItem value="boolean">boolean</MenuItem>
                        <MenuItem value="number">number</MenuItem>
                        <MenuItem value="string">string</MenuItem>
                        <MenuItem value="any">any</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControlLabel
                      control = {
                        <Checkbox
                          name={"actionItemPayloadIsArray" + reducer}
                          id={"actionItemPayloadIsArray" + reducer}
                          checked={this.state['actionItemPayloadIsArray' + reducer] || false}
                          onChange={this.handleCheckboxChange}
                          />
                      }
                      label="payload array"
                    />
                    <FormControlLabel
                      control = {
                        <Checkbox
                          name={"actionItemIsAsync" + reducer}
                          id={"actionItemIsAsync" + reducer}
                          checked={this.state['actionItemIsAsync' + reducer] || false}
                          onChange={this.handleCheckboxChange}
                          />
                      }
                      label="async"
                    />
                  </div>
                  <Button
                    variant="outlined"
                    onClick={() => this.addItemToActions(reducer)}
                    >
                    +
                  </Button>
                </form>
              </div>
            </div>
          ))}
        </div>
        <form id="newReducer">
          <TextField
            id="newReducerNameInput"
            label="New Reducer"
          />
          <Button onClick={() => { this.createNewReducer(); }} variant="outlined">+</Button>
        </form>
      </section>
    );
  };
}

export default 
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )
(Reducers);