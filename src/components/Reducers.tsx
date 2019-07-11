import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, FormControlLabel, Select, TextField, Checkbox, IconButton, Input } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import * as actions from '../actions/components';
import { ReducersInterface } from '../utils/interfaces';
import TypeSelect from './TypeSelect';

const mapDispatchToProps = (dispatch: any) => ({
  setReducer: (reducer: ReducersInterface) => dispatch(actions.setReducer(reducer)),
});

const mapStateToProps = (store: any) => ({
  interfaces: store.workspace.storeConfig.interfaces,
  reducers: store.workspace.storeConfig.reducers,
});

interface PropsInt {
  setReducer: any,
  interfaces: any,
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
    document.getElementById('newReducerNameInput').value = '';
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
    reducerEl.querySelector('#storeItemName').value = '';
    this.setState({ ['storeItemType' + reducerName]: '' });
    this.setState({ ['storeItemIsArray' + reducerName]: false });
    reducerEl.querySelector('#storeItemItitialValue').value = '';
  };

  deleteItemFromStore = (reducerName: string, itemName: string) => {
    let newReducers = this.props.reducers;
    delete newReducers[reducerName].store[itemName];
    this.props.setReducer({ [reducerName]: newReducers[reducerName] });
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
                  <div className="property">
                    <ul className="property-info">
                      <li>
                        <div className="info-title">name</div>
                      </li>
                      <li>
                        <div className="info-title">type</div>
                      </li>
                      <li>
                        <div className="info-title">array</div>
                      </li>
                      <li>
                        <div className="info-title">initial</div>
                      </li>
                    </ul>
                  </div>
                  {this.props.reducers[reducer].store && Object.keys(this.props.reducers[reducer].store).map(store => (
                    <div className="property" key={"storeItem" + store}>
                      <ul className="property-info">
                        <li>
                          <div>{store}</div>
                        </li>
                        <li>
                          <div>{this.props.reducers[reducer].store[store].type}</div>
                        </li>
                        <li>
                          <div>{(this.props.reducers[reducer].store[store].array) ? '✓' : '×' }</div>
                        </li>
                        <li>
                          <div className="code">{this.props.reducers[reducer].store[store].initialValue}</div>
                        </li>
                      </ul>
                      <div className="property-controls">
                        <IconButton
                          aria-label={`delete store item "${store}"`}
                          onClick={() => this.deleteItemFromStore(reducer, store)}>
                          <Icon>delete</Icon>
                        </IconButton>
                      </div>
                    </div>
                  ))}
                </div>
                <form className="newStoreItem">
                  <TextField
                    name="storeItemName"
                    id="storeItemName"
                    label="name"
                  />
                  <TypeSelect
                    selectName="storeItemType"
                    outer={reducer}
                    interfaces={this.props.interfaces}
                  />
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
                    onKeyPress={event => {
                      if (event.key === 'Enter') {
                        this.addItemToStore(reducer);
                        event.preventDefault();
                      }
                    }}
                  />
                  <IconButton
                    aria-label="add property to store"
                    onClick={() => this.addItemToStore(reducer)}>
                    <Icon>add</Icon>
                  </IconButton>
                </form>
              </div>
              <div id="actions">
                <h4>Actions</h4>
                <div className="actionItems">
                  <div className="property">
                    <ul className="property-info">
                      <li>
                        <div className="info-title">name</div>
                      </li>
                      <li>
                        <div className="info-title">param</div>
                      </li>
                      <li>
                        <div className="info-title">prm type</div>
                      </li>
                      <li>
                        <div className="info-title">prm arr</div>
                      </li>
                      <li>
                        <div className="info-title">pyld type</div>
                      </li>
                      <li>
                        <div className="info-title">pyld arr</div>
                      </li>
                      <li>
                        <div className="info-title">async</div>
                      </li>
                    </ul>
                  </div>
                  {this.props.reducers[reducer].actions && Object.keys(this.props.reducers[reducer].actions).map(action => (
                    <div className="property" key={"action" + action}>
                      <ul className="property-info">
                        <li>
                          <div>{action}</div>
                        </li>
                        <li>
                          <div>{this.props.reducers[reducer].actions[action].parameter.name}</div>
                        </li>
                        <li>
                          <div>{this.props.reducers[reducer].actions[action].parameter.type}</div>
                        </li>
                        <li>
                          <div>{(this.props.reducers[reducer].actions[action].parameter.array) ? '✓' : '×' }</div>
                        </li>
                        <li>
                          <div>{this.props.reducers[reducer].actions[action].payload.type}</div>
                        </li>
                        <li>
                          <div>{(this.props.reducers[reducer].actions[action].payload.array) ? '✓' : '×' }</div>
                        </li>
                        <li>
                          <div>{(this.props.reducers[reducer].actions[action].async) ? '✓' : '×' }</div>
                        </li>
                      </ul>
                      <div className="property-controls">
                        <IconButton
                          aria-label={`delete action "${action}"`}
                          onClick={() => this.deleteItemFromActions(reducer, action)}>
                          <Icon>delete</Icon>
                        </IconButton>
                      </div>
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
                    <TypeSelect
                      selectName="actionItemParameterType"
                      outer={reducer}
                      interfaces={this.props.interfaces}
                    />
                    <FormControlLabel
                      control = {
                        <Checkbox
                          name={'actionItemParameterIsArray' + reducer}
                          id={'actionItemParameterIsArray' + reducer}
                          checked={this.state['actionItemParameterIsArray' + reducer] || false}
                          onChange={this.handleCheckboxChange} />
                      }
                      label="parameter array"
                    />
                  </div>
                  <div className="newActionItemPayloadFields">
                    <TypeSelect
                      selectName="actionItemPayloadType"
                      outer={reducer}
                      interfaces={this.props.interfaces}
                    />
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
                  <IconButton
                    aria-label="add action"
                    onClick={() => this.addItemToActions(reducer)}>
                    <Icon>add</Icon>
                  </IconButton>
                </form>
              </div>
            </div>
          ))}
        </div>
        <form id="newReducer">
          <TextField
            id="newReducerNameInput"
            label="new reducer"
            onKeyPress={event => {
              if (event.key === 'Enter') {
                this.createNewReducer();
                event.preventDefault();
              }
            }}
          />
          <IconButton
            aria-label="create reducer"
            onClick={this.createNewReducer}>
            <Icon>add</Icon>
          </IconButton>
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