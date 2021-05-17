import React, { useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  listTitle: {
    backgroundColor: "#7986cb",
    color: "#fff",
  },
  listItem: {
    height: "40px"
  },

}));

export default function SalesMixCard(props) {
  const classes = useStyles();
  const { items } = props;

  const [name, setName] = React.useState('Cat in the Hat');
  const handleChange = (event) => {
    setName(event.target.value);
  };

  useEffect(() => {
    setName(items.salesMix)
  }, [])

  return (
      <List component="nav">
        <ListItem className={classes.listTitle}>
          <ListItemText primary={items.SKU} />
        </ListItem>
        <Divider />
        <TextField variant="outlined" type="number" value={name} onChange={handleChange} autoFocus/>
        <Divider />
        <TextField variant="outlined"  type="number" value={name} onChange={handleChange} autoFocus/>
      </List>

  );
}
