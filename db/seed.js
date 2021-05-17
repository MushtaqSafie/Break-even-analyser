// const fs = require("fs");
const db = require("../models");

const users = [
  {
    first_name: "Mushtaq",
    last_name: "Safie",
    email_address: "mushtaq@gmail.com",
    user_password: "XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=",
  },
];

const products = [
  {
    product_description: "Kettle",
    unit: "Each",
    unit_sales_price: 39.89,
    SKU: "KE_001",
    product_url: "/url"
  },
  {
    product_description: "Kettle Model 2",
    unit: "Each",
    unit_sales_price: 39.89,
    SKU: "KE_002",
    product_url: "/url"
  }
]

const fixedCosts = [
  {
    fixed_cost_item: "Salary",
    date: new Date(),
    description: "Marketing Team",
    Amount: 10000
  }
]

const materialsCosts = [
  {
    product_SKU: "KE_001",
    material_description: "Iron",
    quantity: 1,
    cost_price: 3,
    ProductId: 1
  },
  {
    product_SKU: "KE_001",
    material_description: "Iron",
    quantity: 1,
    cost_price: 4,
    ProductId: 1
  },
  {
    product_SKU: "KE_002",
    material_description: "Iron",
    quantity: 1,
    cost_price: 4,
    ProductId: 2
  },

]

users.forEach(currentItem => {
  db.User.create(currentItem).then(result => console.log(result));
});

products.forEach(currentItem => {
  db.Products.create(currentItem).then(result => console.log(result));
});

fixedCosts.forEach(currentItem => {
  db.FixedCosts.create(currentItem).then(result => console.log(result));
});

materialsCosts.forEach(currentItem => {
  db.MaterialsCosts.create(currentItem).then(result => console.log(result));
});