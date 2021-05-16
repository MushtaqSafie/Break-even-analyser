import React, { useEffect } from 'react';
import { CssBaseline, Box, Container, Grid, makeStyles } from '@material-ui/core';

import GithubLink from "../components/GithubLink"
import NavBar from "../components/NavBar"

import TableBody from '../components/TableBody';
import TypographyTitle from "../components/TypographyTitle";

import { useStoreContext } from "../utils/GlobalState";
import { GET_MATERIALCOST } from "../utils/actions";
import API from "../utils/API"

import MaterialDialog from "../components/DialogBox/MaterialCosts"

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Material Description' },
  { id: 'qty', numeric: true, disablePadding: false, label: 'Quantity' },
  { id: 'costPrice', numeric: true, disablePadding: false, label: 'Cost Price' },
  { id: 'SKU', numeric: true, disablePadding: false, label: 'SKU' },
];


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },

}));

const MaterialCosts = () => {
  const classes = useStyles();
  
  const [state, dispatch] = useStoreContext();
  const [open, setOpen] = React.useState(false);

  const addNewHandler = () => {
    if (open) {
      setOpen(false)
    } else {
      setOpen(true);
    }
  }
  
  useEffect(() => {
    API.getMaterialCost()
      .then(res => {
        let data = []
        res.data.forEach(i => {
          let obj = {
            name: i.material_description,
            qty: i.quantity,
            costPrice: i.cost_price,
            SKU: i.product_SKU,
            id: i.id
          }
          data.push(obj);
        });
        dispatch({ 
          type: GET_MATERIALCOST,
          materialCosts: data
        })
      })
      .catch(err => console.log(err));
  }, [])

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar/>
      
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TypographyTitle 
                title={"Bill of Materials"} 
              />
              <TableBody headCells={headCells} rows={state.materialCosts}  addNewHandler={addNewHandler}/>
            </Grid>
          </Grid>
          <Box pt={4}>
            <GithubLink />
          </Box>
          <MaterialDialog handleClose={addNewHandler} open={open} />
        </Container>
      </main>
    </div>
  );
};

export default MaterialCosts;
