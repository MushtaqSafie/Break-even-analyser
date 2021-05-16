import React, { useEffect } from 'react';
import { CssBaseline, Box, Container, Grid, makeStyles } from '@material-ui/core';

import GithubLink from "../components/GithubLink"
import NavBar from "../components/NavBar"

import TableBody from '../components/TableBody';
import TypographyTitle from "../components/TypographyTitle";

import ProductDialog from "../components/DialogBox/ProductInfo"

import { useStoreContext } from "../utils/GlobalState";
import { GET_PRODUCTS } from "../utils/actions";
import API from "../utils/API"

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Product Description' },
  { id: 'unit', numeric: true, disablePadding: false, label: 'Unit' },
  { id: 'salesPrice', numeric: true, disablePadding: false, label: 'Unit Sales Price' },
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



const ProductInformation = () => {
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
    API.getProducts()
      .then(res => {
        let data = []
        res.data.forEach(i => {
          let obj = {
            name: i.product_description,
            unit: i.unit,
            salesPrice: i.unit_sales_price,
            SKU: i.SKU,
            id: i.id
          }
          data.push(obj);
        });
        dispatch({ 
          type: GET_PRODUCTS,
          products: data
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
                title={"Product Information"} 
              />
              <TableBody headCells={headCells} rows={state.productsInfo} addNewHandler={addNewHandler} />
            </Grid>
          </Grid>
          <Box pt={4}>
            <GithubLink />
          </Box>
          <ProductDialog handleClose={addNewHandler} open={open} />
        </Container>
      </main>
    </div>
  );
};

export default ProductInformation;
