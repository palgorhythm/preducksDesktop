import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { addChild, deleteChild } from '../actions/components';
// import { StoreInterface, StoreConfigInterface } from '../utils/Interfaces';

const HtmlChild: React.FC = (props: any): JSX.Element => {
  const { classes } = props;

  // const deleteButton = (
  //   <Fragment>
  //     {/* shows the delete button */}
  //     <Button
  //       variant="text"
  //       size="small"
  //       color="default"
  //       aria-label="Delete"
  //       className={classes.margin}
  //       onClick={() => deleteComponent({
  //         componentId: id,
  //         stateComponents: components,
  //       })
  //       }
  //       style={{
  //         color: '#D3D3D3',
  //         marginBottom: '10px',
  //         marginTop: '0px',
  //         marginLeft: '11px',
  //         padding: '0px',
  //       }}>
  //       <DeleteIcon style={{ color: '#D3D3D3' }} />
  //       Delete Component
  //     </Button>
  //   </Fragment>
  // );

  return (
    <ListItem button onClick={() => {}}>
      <ListItemText
        disableTypography
        className={classes.light}
        primary={
          <Typography
            type="body3"
            style={{
              textAlign: 'center',
              borderRadius: '10px',
              border: '1px solid white',
              color: '#FFFFFF',
            }}>
            {props.componentName.toLowerCase()}
          </Typography>
        }
      />
    </ListItem>
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

export default withStyles(styles)(HtmlChild);
