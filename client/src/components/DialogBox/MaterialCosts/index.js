import React, { useRef } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useStoreContext } from "../../../utils/GlobalState";
import { ADD_MATERIALCOST } from "../../../utils/actions";
import API from "../../../utils/API"
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

function MaterialDialog(props) {
  const { handleClose, open } = props;
  const itemRef = useRef();
  const priceRef = useRef();
  const SKURef = useRef();
  const [state, dispatch] = useStoreContext();

  const handleSubmit = () => {
    const newItem = {
      material_description: itemRef.current.value,
      cost_price: priceRef.current.value,
      product_SKU: SKURef.current.value,
    }
    API.getProducts()
    .then(res => {
      res.data.forEach(item => {
        // eslint-disable-next-line eqeqeq
        if (item.SKU == SKURef.current.value) {
          newItem.ProductId = item.id;
        }
      });
      API.newMaterialCost(newItem)
      .then(res => {
        let i = res.data
        let data = {
          id: i.id,
          name: i.material_description,
          costPrice: i.cost_price,
          SKU: i.product_SKU,
        }
        dispatch({ 
          type: ADD_MATERIALCOST,
          materialCost: data
        })
      })
      .catch(err => console.log(err));
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
            To add new material cost, please enter the following information.
          </DialogContentText>
          <TextField
            required
            margin="dense"
            id="name"
            label="Material Description"
            fullWidth
            inputRef={itemRef}
          />
          <TextField
            margin="dense"
            id="SKU"
            label="SKU"
            fullWidth
            inputRef={SKURef}
          />

          <FormControl fullWidth >
            <InputLabel htmlFor="standard-adornment-amount">Cost Price</InputLabel>
            <Input
              id="costPrice"
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

export default MaterialDialog;