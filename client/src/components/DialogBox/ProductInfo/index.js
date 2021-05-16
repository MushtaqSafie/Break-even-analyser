import React, { useRef } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


import { useStoreContext } from "../../../utils/GlobalState";
import { ADD_PRODUCTS } from "../../../utils/actions";
import API from "../../../utils/API"


import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

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
            pb={3}
          />
          <TextField
            margin="dense"
            id="SKU"
            label="SKU"
            fullWidth
            inputRef={SKURef}
          />

          <FormControl fullWidth >
            <InputLabel htmlFor="standard-adornment-amount">Unit Sales Price</InputLabel>
            <Input
              id="salesPrice"
              type="number"
              inputRef={priceRef}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
            />
          </FormControl>

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

export default ProductDialog;