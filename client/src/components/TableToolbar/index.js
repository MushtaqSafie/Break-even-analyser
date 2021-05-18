import React from 'react';
import clsx from 'clsx';
import { 
  lighten,
  makeStyles,
  Toolbar,
  Typography,
  Tooltip ,
  Button
} from '@material-ui/core';

import AddCircleIcon from '@material-ui/icons/AddCircle';

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const TableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, addNewHandler } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          {/* Nutrition */}
        </Typography>
        <Tooltip title="Filter list">
          <Button variant="outlined" color="primary" endIcon={<AddCircleIcon />} onClick={addNewHandler}>
            Add&nbsp;New
          </Button>
        </Tooltip>
    </Toolbar>
  );
};


export default TableToolbar