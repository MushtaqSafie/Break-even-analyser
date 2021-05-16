import React, { useEffect, useRef } from 'react';
import { CssBaseline, Box, Container, Grid, makeStyles } from '@material-ui/core';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import GithubLink from "../components/GithubLink"
import NavBar from "../components/NavBar"

import TableBody from '../components/TableBody';
import TypographyTitle from "../components/TypographyTitle";

import { useStoreContext } from "../utils/GlobalState";
import { GET_PRODUCTS, ADD_PRODUCTS } from "../utils/actions";
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


function ProductDialog(props) {
  const { handleClose, open } = props;
  const productRef = useRef();
  const unitRef = useRef();
  const priceRef = useRef();
  const SKURef = useRef();

  const [state, dispatch] = useStoreContext();

  const handleSubmit = () => {
    const newProduct = {
      product_description: productRef.current.value,
      unit: unitRef.current.value,
      unit_sales_price: priceRef.current.value,
      SKU: SKURef.current.value
    }
    API.createProduct(newProduct)
      .then(res => {
        let i = res.data
        let data = {
          name: i.product_description,
          unit: i.unit,
          salesPrice: i.unit_sales_price,
          SKU: i.SKU,
          id: i.id
        }
        dispatch({ 
          type: ADD_PRODUCTS,
          product: data
        })
      })
      .catch(err => console.log(err));
    handleClose();
  }
  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">ADD NEW</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add new product, please enter the following information.
          </DialogContentText>
          <TextField
            required
            margin="dense"
            id="name"
            label="Product Description"
            fullWidth
            inputRef={productRef}
          />
          <TextField
            margin="dense"
            id="unit"
            label="Unit"
            fullWidth
            inputRef={unitRef}
          />
          <TextField
            margin="dense"
            id="salesPrice"
            label="Unit Sales Price"
            fullWidth
            inputRef={priceRef}
          />
          <TextField
            margin="dense"
            id="SKU"
            label="SKU"
            fullWidth
            inputRef={SKURef}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add Item
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ProductInformation;
