import React, { Component } from 'react';
import { connect, useSelector } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Checkbox,
} from '@material-ui/core';
import Interfaces from './Interfaces';
import Reducers from './Reducers';

const mapDispatchToProps = (dispatch: any) => ({});

const mapStateToProps = (store: any) => ({});

interface PropsInt {}

class RightPanel extends Component<PropsInt> {
  constructor(props: PropsInt) {
    super(props);

    this.state = {
      interfaces: [],
    };
  }

  render() {
    return (
      <div className="right-panel">
        <Interfaces />
        <Reducers />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RightPanel);
