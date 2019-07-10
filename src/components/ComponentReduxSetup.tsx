import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import {
  addSelector,
  deleteSelector,
  addActionToComponent,
  deleteActionFromComponent,
  setState,
  deleteState,
} from '../actions/components';
import DataTable from './DataTable';
import { StoreInterface, StoreConfigInterface } from '../utils/Interfaces';

const convertToOptions = choices => [
  <option value="" key="" />,
  choices.map(choice => (
    <option value={choice} key={choice} style={{ color: '#000' }}>
      {choice}
    </option>
  )),
];

const ComponentReduxSetup: React.FC = (props: any): JSX.Element => {
  const [chosenAction, setChosenAction] = useState('');
  const [chosenSelector, setChosenSelector] = useState('');
  const [enteredName, setEnteredName] = useState('');
  const [enteredType, setEnteredType] = useState('');
  const [enteredValue, setEnteredValue] = useState('');
  const storeConfig = useSelector(store => store.workspace.storeConfig);
  const { focusComponent, classes } = props;
  const dispatch = useDispatch();
  const rowHeader = ['Actions', 'Store Selections'];
  let selectorOptions = [];
  let actionOptions = [];
  Object.keys(storeConfig.reducers).forEach((reducerName) => {
    Object.keys(storeConfig.reducers[reducerName].store).forEach((storePieceName) => {
      selectorOptions.push(`${reducerName}.${storePieceName}`);
    });
    Object.keys(storeConfig.reducers[reducerName].actions).forEach((actionName) => {
      actionOptions.push(`${reducerName}.${actionName}`);
    });
  });

  selectorOptions = convertToOptions(selectorOptions);
  actionOptions = convertToOptions(actionOptions);

  const handleChange = cb => e => cb(e.target.value);

  const handleStoreSubmit = (cb, value) => {
    const callback = cb;
    return (e) => {
      e.preventDefault();
      console.log(value);
      return dispatch(callback(value));
    };
  };

  const handleLocalStateSubmit = (e) => {
    e.preventDefault();
    return dispatch(setState({ name: enteredName, type: enteredType, initialValue: enteredValue }));
  };

  const submitValueUsingAction = (title, value, onChange, onSubmit, choices) => (
    <Grid item xs={3}>
      <form className="props-input" onSubmit={handleStoreSubmit(onSubmit, value)}>
        <Grid container spacing={8}>
          <Grid item xs={6}>
            <FormControl required>
              <InputLabel className={classes.light} htmlFor="propType">
                {`add ${title} !`}
              </InputLabel>
              <Select
                native
                className={classes.light}
                id="propType"
                placeholder="title"
                onChange={handleChange(onChange)}
                value={value}
                required>
                {choices}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            <Button color="primary" aria-label="Add" type="submit" variant="contained" size="large">
              {`submit ${title} selection`}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
  return (
    <div className={'htmlattr'}>
      {' '}
      {Object.keys(focusComponent).length < 1 ? (
        <div style={{ marginTop: '20px', width: '90%' }}>Click a component to view its props.</div>
      ) : (
        <div className="props-container" style={{ marginTop: '20px', width: '90%', height: '80%' }}>
          <Grid container spacing={8}>
            {submitValueUsingAction(
              'store selection',
              chosenSelector,
              setChosenSelector,
              addSelector,
              selectorOptions,
            )}
            {submitValueUsingAction(
              'action',
              chosenAction,
              setChosenAction,
              addActionToComponent,
              actionOptions,
            )}
            <Grid item xs={8}>
              <DataTable
                rowHeader={['Store Selections']}
                rowData={focusComponent.selectors}
                deletePropHandler={name => dispatch(deleteSelector(name))}
              />
              <DataTable
                rowHeader={['Actions']}
                rowData={focusComponent.actions}
                deletePropHandler={name => dispatch(deleteActionFromComponent(name))}
              />
            </Grid>
            <Grid item xs={1} />
          </Grid>
          <Grid container spacing={8} direction="row">
            <form onSubmit={e => handleLocalStateSubmit(e)}>
              <h3>Add local state to component</h3>
              <FormControl required>
                <InputLabel className={classes.light} htmlFor="localstate-name">
                  Name:
                </InputLabel>
                <Input
                  className={classes.light}
                  id="localstate-name"
                  onChange={handleChange(setEnteredName)}></Input>
              </FormControl>
              <FormControl required>
                <InputLabel className={classes.light} htmlFor="localstate-type">
                  Type:
                </InputLabel>
                <Select
                  native
                  className={classes.light}
                  id="localstate-type"
                  placeholder="Type"
                  onChange={handleChange(setEnteredType)}
                  value={enteredType}
                  required>
                  {convertToOptions([
                    'number',
                    'string',
                    'boolean',
                    'any',
                    ...Object.keys(storeConfig.interfaces),
                  ])}
                </Select>
              </FormControl>
              <FormControl required>
                <InputLabel className={classes.light} htmlFor="localstate-value">
                  Value:
                </InputLabel>
                <Input
                  className={classes.light}
                  id="localstate-value"
                  onChange={handleChange(setEnteredValue)}></Input>
              </FormControl>
              <Button
                color="primary"
                aria-label="Add"
                type="submit"
                variant="contained"
                size="large">
                {'submit local state'}
              </Button>
            </form>
            <DataTable
              rowHeader={['Local State on Component']}
              rowData={focusComponent.componentState.map(state => JSON.stringify(state))}
              deletePropHandler={name => dispatch(deleteState(JSON.parse(name).name))}
            />
          </Grid>
        </div>
      )}
    </div>
  );
};

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    color: '#eee',
    backgroundColor: '#333333',
  },
  column: {
    display: 'inline-flex',
    alignItems: 'baseline',
  },
  icon: {
    fontSize: '20px',
    color: '#eee',
    opacity: '0.7',
    transition: 'all .2s ease',

    '&:hover': {
      color: 'red',
    },
  },
  cssLabel: {
    color: 'white',

    '&$cssFocused': {
      color: 'green',
    },
  },
  cssFocused: {},
  input: {
    color: '#eee',
    marginBottom: '30px',
    width: '50%',
    textAlign: 'center',
  },
  light: {
    color: '#eee',
  },
  avatar: {
    color: '#eee',
    fontSize: '10px',
  },
});

// const Placeholder: React.FC = (props): JSX.Element => <div>HI</div>;
export default withStyles(styles)(ComponentReduxSetup);
