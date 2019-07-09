import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import uuid from 'uuid';
import HtmlChild from './HtmlChild';
// import { ComponentInt, ComponentsInt, ChildInt } from '../utils/interfaces';

const LeftColExpansionPanel = (props: any) => {
  const {
    classes,
    focusComponent,
    component,
    addChild,
    changeFocusComponent,
    selectableChildren,
    components,
    deleteComponent,
  } = props;
  const { title, id, color } = component;
  console.log(title, components);
  // goal: render this array as subcomponents
  // under each component in the list.

  function isFocused() {
    return focusComponent.id === id ? 'focused' : '';
  }

  const focusedStyle = {
    boxShadow: '2px 2px rgba(255,255,255,0.2)',
    background: 'rgba(0,50,255,0.2)',
  };

  // console.log('hoot hoot', HtmlChildren);
  const componentTitleDisplay = (
    <Grid item xs={12}>
      <List>
        <ListItem
          button
          onClick={() => {
            changeFocusComponent({ title });
          }}>
          <ListItemText
            disableTypography
            className={classes.light}
            primary={
              <Typography type="body2" style={{ color }}>
                {title}
              </Typography>
            }
          />
        </ListItem>
      </List>
    </Grid>
  );

  const deleteButton = (
    <Fragment>
      {/* shows the delete button */}
      <Button
        variant="text"
        size="small"
        color="default"
        aria-label="Delete"
        className={classes.margin}
        onClick={() => deleteComponent({
          componentId: id,
          stateComponents: components,
        })
        }
        style={{
          color: '#D3D3D3',
          marginBottom: '10px',
          marginTop: '0px',
          marginLeft: '11px',
          padding: '0px',
        }}>
        <DeleteIcon style={{ color: '#D3D3D3' }} />
        Delete Component
      </Button>
    </Fragment>
  );

  const addAsChildButton = (
    <Tooltip title="add as child" aria-label="add as child" placement="left">
      <IconButton
        aria-label="Add"
        onClick={() => {
          addChild({ title, childType: 'COMP' });
        }}>
        <AddIcon style={{ color, float: 'right' }} />
      </IconButton>
    </Tooltip>
  );

  const HtmlChildrenOfFocusComponent = focusComponent.childrenArray
    .filter(child => child.childType === 'HTML')
    .map(htmlChild => (
      <HtmlChild
        key={uuid()}
        HTMLInfo={htmlChild.HTMLInfo}
        componentName={htmlChild.componentName}
      />
    ));

  return (
    <Grid container spacing={16} direction="row" justify="flex-start" alignItems="center">
      <Grid item xs={9}>
        <div className={classes.root} style={!isFocused() ? {} : focusedStyle}>
          {componentTitleDisplay}
          <Grid item xs={12} style={{ alignSelf: 'center' }}>
            <List>{isFocused() ? HtmlChildrenOfFocusComponent : <div />}</List>
          </Grid>
          {id !== 1 && isFocused() ? deleteButton : <div />}
        </div>
      </Grid>
      <Grid item xs={3}>
        {id !== 1 && !isFocused() && selectableChildren.includes(id) ? addAsChildButton : <div />}
      </Grid>
    </Grid>
  );
};

function styles(): any {
  return {
    root: {
      width: '100%',
      height: '100%',
      marginTop: 10,
      backgroundColor: '#333333',
    },
    light: {
      color: '#eee',
      '&:hover': {
        color: '#1de9b6',
      },
    },
  };
}

export default withStyles(styles)(LeftColExpansionPanel);
