import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Select,
  TextField,
  IconButton,
  Input,
} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import * as actions from '../actions/components';
import { InterfacesInterface } from '../utils/interfaces';
import TypeSelect from './TypeSelect';

const mapDispatchToProps = (dispatch: any) => ({
  setInterface: (myInterface: InterfacesInterface) => dispatch(actions.setInterface(myInterface)),
  deleteInterface: (interfaceName: string) => dispatch(actions.deleteInterface(interfaceName)),
});

const mapStateToProps = (store: any) => ({
  interfaces: store.workspace.storeConfig.interfaces,
});

interface PropsInt {
  setInterface?: any;
  deleteInterface?: any;
  interfaces?: any;
  classes?: any;
}

class Interfaces extends Component<PropsInt> {
  constructor(props: PropsInt) {
    super(props);
    this.state = {};
  }

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
    const interfaceFieldType = interfaceEl.querySelector(`#interfaceFieldType${interfaceName}`).value;
    newInterfaces[interfaceName][interfaceFieldName] = interfaceFieldType;
    this.props.setInterface({ [interfaceName]: newInterfaces[interfaceName] });
    interfaceEl.querySelector('#interfaceFieldName').value = '';
    // this.setState({ [`interfaceFieldType${interfaceName}`]: '' });
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
                  {this.props.interfaces[elInterface] && Object.keys(this.props.interfaces[elInterface]).map(interfaceField => (
                      <div className="property" id={interfaceField} key={interfaceField}>
                        <ul className="property-info">
                          <li>
                            <div className="info-title">name</div><div>{interfaceField}</div>
                          </li>
                          <li>
                            <div className="info-title">type</div><div>{this.props.interfaces[elInterface][interfaceField]}</div>
                          </li>
                        </ul>
                        <div className="property-controls">
                          <IconButton
                            aria-label={`delete property "${interfaceField}"`}
                            onClick={() => this.deleteFieldFromInterface(elInterface, interfaceField)}>
                            <Icon>delete</Icon>
                          </IconButton>
                        </div>
                      </div>
                    ))}
                </div>
                <form className="newInterfaceField">
                  <TextField
                    name="interfaceFieldName"
                    id="interfaceFieldName"
                    label="property name"
                    onKeyPress={event => {
                      if (event.key === 'Enter')
                        event.preventDefault();
                    }}
                    />
                  <TypeSelect
                    selectName="interfaceFieldType"
                    outer={elInterface}
                    interfaces={this.props.interfaces}
                  />
                  <IconButton
                    aria-label="add property"
                    onClick={() => this.addFieldToInterface(elInterface)}>
                    <Icon>add</Icon>
                  </IconButton>
                </form>
              </div>
            ))}
        </div>
        <form id="newInterface">
          <TextField
            id="newInterfaceNameInput"
            label="new interface"
            onKeyPress={event => {
              if (event.key === 'Enter') {
                this.createNewInterface();
                event.preventDefault();
              }
            }}
            />
          <IconButton
            aria-label="create interface"
            onClick={this.createNewInterface}>
            <Icon>add</Icon>
          </IconButton>
        </form>
      </section>
    );
  }
}

export default
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )
(Interfaces);
