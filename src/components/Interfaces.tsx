import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Input,
} from '@material-ui/core';
import * as actions from '../actions/components';
import { InterfacesInterface } from '../utils/interfaces';

const mapDispatchToProps = (dispatch: any) => ({
  setInterface: (myInterface: InterfacesInterface) => dispatch(actions.setInterface(myInterface)),
  deleteInterface: (interfaceName: string) => dispatch(actions.deleteInterface(interfaceName)),
});

const mapStateToProps = (store: any) => ({
  interfaces: store.workspace.storeConfig.interfaces,
});

interface PropsInt {
  setInterface: any;
  deleteInterface: any;
  interfaces: any;
  classes: any;
}

class Interfaces extends Component<PropsInt> {
  constructor(props: PropsInt) {
    super(props);
    this.state = {};
  }

  handleSelectChange = (event: Event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  createNewInterface = () => {
    const newInterfaces = this.props.interfaces;
    const newInterfaceName = document.getElementById('newInterfaceNameInput').value;
    newInterfaces[newInterfaceName] = {};
    this.props.setInterface({ [newInterfaceName]: {} });
    document.getElementById('newInterfaceNameInput').value = '';
  };

  addFieldToInterface = (interfaceName: string) => {
    const newInterfaces = this.props.interfaces;
    const interfaceEl = document.getElementById(interfaceName);
    const interfaceFieldName = interfaceEl.querySelector('#interfaceFieldName').value;
    const interfaceFieldType = interfaceEl.querySelector(`#interfaceFieldType${interfaceName}`)
      .value;
    newInterfaces[interfaceName][interfaceFieldName] = interfaceFieldType;
    this.props.setInterface({ [interfaceName]: newInterfaces[interfaceName] });
    interfaceEl.querySelector('#interfaceFieldName').value = '';
    this.setState({ [`interfaceFieldType${interfaceName}`]: '' });
  };

  deleteFieldFromInterface = (interfaceName: string, fieldName: string) => {
    const newInterfaces = this.props.interfaces;
    delete newInterfaces[interfaceName][fieldName];
    this.props.setInterface({ [interfaceName]: newInterfaces[interfaceName] });
  };

  render() {
    return (
      <section id="interfacesOuter">
        <h2>Interfaces</h2>
        <div id="interfaces">
          {this.props.interfaces
            && Object.keys(this.props.interfaces).map(elInterface => (
              <div className="interface" id={elInterface} key={`interface${elInterface}`}>
                <h3>{elInterface}</h3>
                <div className="interfaceFields">
                  {this.props.interfaces[elInterface]
                    && Object.keys(this.props.interfaces[elInterface]).map(interfaceField => (
                      <div className="interfaceField" id={interfaceField} key={interfaceField}>
                        <span>{interfaceField}</span>
                        <span>{this.props.interfaces[elInterface][interfaceField]}</span>
                        <Button
                          variant="outlined"
                          className={this.props.classes.button}
                          onClick={() => this.deleteFieldFromInterface(elInterface, interfaceField)
                          }>
                          Delete
                        </Button>
                      </div>
                    ))}
                </div>
                <form className="newInterfaceField">
                  <TextField name="interfaceFieldName" id="interfaceFieldName" label="name" />
                  <FormControl>
                    <InputLabel htmlFor={`interfaceFieldType${elInterface}`}>type</InputLabel>
                    <Select
                      name={`interfaceFieldType${elInterface}`}
                      id={`interfaceFieldType${elInterface}`}
                      value={this.state[`interfaceFieldType${elInterface}`] || ''}
                      onChange={this.handleSelectChange}
                      input={
                        <Input
                          name={`interfaceFieldType${elInterface}`}
                          id={`interfaceFieldType${elInterface}`}
                        />
                      }>
                      <MenuItem value="boolean">boolean</MenuItem>
                      <MenuItem value="number">number</MenuItem>
                      <MenuItem value="string">string</MenuItem>
                      <MenuItem value="any">any</MenuItem>
                    </Select>
                  </FormControl>
                  <Button variant="outlined" onClick={() => this.addFieldToInterface(elInterface)}>
                    +
                  </Button>
                </form>
              </div>
            ))}
        </div>
        <form id="newInterface">
          <TextField id="newInterfaceNameInput" label="New Interface" />
          <Button
            onClick={() => {
              this.createNewInterface();
            }}
            variant="outlined">
            +
          </Button>
        </form>
      </section>
    );
  }
}

function styles(): any {
  return {
    cssLabel: {
      color: 'white',

      '&$cssFocused': {
        color: 'green',
      },
    },
    cssFocused: {},
    input: {
      color: '#fff',
      opacity: '0.7',
      marginBottom: '10px',
    },
    underline: {
      color: 'white',
      '&::before': {
        color: 'white',
      },
    },
    button: {
      color: '#fff',

      '&:disabled': {
        color: 'grey',
      },
    },
    clearButton: {
      top: '96%',
      position: 'sticky!important',
      zIndex: '1',

      '&:disabled': {
        color: 'grey',
        backgroundColor: '#424242',
      },
    },
  };
}

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Interfaces);
