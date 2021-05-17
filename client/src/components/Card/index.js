import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Collapse from '@material-ui/core/Collapse';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  pos: {
    marginBottom: 12,
  },
});

 function ProductCard(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { items } = props;
  console.log(items.MaterialsCosts);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Card className={classes.root} variant="outlined">
      
      <CardContent>
        <Typography variant="h6" component="h6" color="textSecondary" gutterBottom>
          {items.product_description}
        </Typography>
        <Typography variant="h5" component="h2">
          ${items.unit_sales_price}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Sale Price
        </Typography>
        <Typography variant="body2" component="p">
          Unit: {items.unit}
        </Typography>
      </CardContent>
      <List component="nav" className={classes.root} aria-label="mailbox folders">

        <ListItem button>
          <ListItemText primary="SKU" /> {items.SKU}
        </ListItem>
        <Divider />

        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <MoneyOffIcon />
          </ListItemIcon>
          <ListItemText primary="Materials Costs" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {items.MaterialsCosts.map((item, index) => (
              <ListItem key={index} button>
                <ListItemText secondary={item.material_description} /> ($ {item.cost_price})
              </ListItem>
            ))}
          </List>
        </Collapse>

        <Divider />
        <ListItem button>
          <ListItemText primary="Total Material Costs:" /> $100
        </ListItem>


      </List>
      <CardActions>
        <Button variant="outlined" size="small">Edit this Item</Button>
      </CardActions>
    </Card>
  );
}

export default ProductCard