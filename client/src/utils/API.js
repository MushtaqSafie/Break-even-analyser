import axios from "axios";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  registerUser: function(userData) {
    return axios.post("/api/user/register/", userData);
  },
  getProducts: function() {
    return axios.get("/api/table/productInfo")
  },
  createProduct: function(productData) {
    return axios.post("/api/table/productInfo", productData);
  },
  getFixedCost: function() {
    return axios.get("/api/table/fixedCosts")
  },
  newFixedCost: function(fixedCostData) {
    return axios.post("/api/table/fixedCosts", fixedCostData);
  },
  getMaterialCost: function() {
    return axios.get("/api/table/materialsCosts")
  },
  newMaterialCost: function(materialCostData) {
    return axios.post("/api/table/materialsCosts", materialCostData);
  }
};