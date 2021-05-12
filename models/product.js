module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define("products", {
    product_description: {
      type: DataTypes.STRING
    },
    unit: {
      type: DataTypes.STRING
    },
    unit_sales_price: {
      type: DataTypes.DECIMAL(10, 2)
    },
    SKU: {
      type: DataTypes.DECIMAL(10, 2)
    },
    product_image: {
      type: DataTypes.BLOB("long")
    },
    product_url: {
      type: DataTypes.STRING
    }
  });

  return Products;
};