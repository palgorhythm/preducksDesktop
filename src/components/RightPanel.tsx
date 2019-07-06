import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, FormControl, FormControlLabel, InputLabel, MenuItem, Select, TextField, Checkbox } from '@material-ui/core';

// const IPC = require('electron').ipcRenderer;

const mapDispatchToProps = (dispatch: any) => ({

});

const mapStateToProps = (store: any) => ({

});

interface PropsInt {

}

class BottomPanel extends Component<PropsInt> {
  render() {
    return (
      <div className="right-panel">
        <section id="interfacesOuter">
          <h2>Interfaces</h2>
          <div id="interfaces">
            <div className="interface" id="myInterface">
              <h3>myInterface</h3>
              <div className="interfaceFields">
                <span>exName</span>
                <span>boolean</span>
                <Button variant="outlined">Delete</Button>
              </div>
              <form className="newInterfaceField">
                <TextField
                  name="interfaceFieldName"
                  label="name"
                />
                <FormControl>
                  <InputLabel htmlFor="interfaceFieldType">type</InputLabel>
                  <Select
                    name="interfaceFieldType"
                    value=""
                  >
                    <MenuItem value="boolean">boolean</MenuItem>
                    <MenuItem value="number">number</MenuItem>
                    <MenuItem value="string">string</MenuItem>
                    <MenuItem value="any">any</MenuItem>
                  </Select>
                </FormControl>
                <Button variant="outlined">+</Button>
              </form>
            </div>
          </div>
          <form id="newInterface">
            <TextField
              id="newInterfaceNameInput"
              label="New Interface"
            />
            <Button variant="outlined">+</Button>
          </form>
        </section>
        <hr />
        <section id="reducersOuter">
          <h2>Reducers</h2>
          <div id="reducers">
            <div className="reducer" id="myReducer">
              <h3>myReducer</h3>
              <div id="store">
                <h4>Store</h4>
                <div className="storeItems">
                  <span>exName</span>
                  <span>boolean</span>
                  <span>✓</span>
                  <span>"..."</span>
                  <Button variant="outlined">Delete</Button>
                </div>
                <form className="newStoreItem">
                  <TextField
                    name="storeItemName"
                    label="name"
                  />
                  <FormControl>
                    <InputLabel htmlFor="storeItemType">type</InputLabel>
                    <Select
                      name="storeItemType"
                      value=""
                    >
                      <MenuItem value="boolean">boolean</MenuItem>
                      <MenuItem value="number">number</MenuItem>
                      <MenuItem value="string">string</MenuItem>
                      <MenuItem value="any">any</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControlLabel
                    control = {
                      <Checkbox name="storeItemIsArray" />
                    }
                    label="array"
                  />
                  <TextField
                    name="storeItemItitialValue"
                    label="initial value"
                  />
                  <Button variant="outlined">+</Button>
                </form>
              </div>
              <div id="actions">
                <h4>Actions</h4>
                <div className="actionItems">
                  <span>myAction</span>
                  <span>paramName</span>
                  <span>paramType</span>
                  <span>✓</span>
                  <span>payloadType</span>
                  <span>✓</span>
                  <span>✓</span>
                  <Button variant="outlined">Delete</Button>
                </div>
                <form className="newActionItem">
                  <TextField
                    name="actionItemName"
                    label="name"
                  />
                  <div className="newActionItemParameterFields">
                    <TextField
                      name="actionItemParameterName"
                      label="parameter name"
                    />
                    <FormControl>
                      <InputLabel htmlFor="actionItemParameterType">parameter type</InputLabel>
                      <Select
                        name="actionItemParameterType"
                        value=""
                      >
                        <MenuItem value="boolean">boolean</MenuItem>
                        <MenuItem value="number">number</MenuItem>
                        <MenuItem value="string">string</MenuItem>
                        <MenuItem value="any">any</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControlLabel
                      control = {
                        <Checkbox name="storeItemParameterIsArray" />
                      }
                      label="parameter array"
                    />
                  </div>
                  <div className="newActionItemPayloadFields">
                    <FormControl>
                      <InputLabel htmlFor="actionItemPayloadType">payload type</InputLabel>
                      <Select
                        name="actionItemPayloadType"
                        value=""
                      >
                        <MenuItem value="boolean">boolean</MenuItem>
                        <MenuItem value="number">number</MenuItem>
                        <MenuItem value="string">string</MenuItem>
                        <MenuItem value="any">any</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControlLabel
                      control = {
                        <Checkbox name="storeItemPayloadIsArray" />
                      }
                      label="payload array"
                    />
                    <FormControlLabel
                      control = {
                        <Checkbox name="storeItemIsAsync" />
                      }
                      label="async"
                    />
                  </div>
                  <Button variant="outlined">+</Button>
                </form>
              </div>
            </div>
          </div>
          <form id="newReducer">
            <TextField
              id="newReducerNameInput"
              label="New Reducer"
            />
            <Button variant="outlined">+</Button>
          </form>
        </section>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BottomPanel);
