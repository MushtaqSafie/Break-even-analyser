module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define("Products", {
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
      type: DataTypes.STRING
    },
    product_image: {
      type: DataTypes.BLOB("long")
    },
    product_url: {
      type: DataTypes.STRING
    }
  });

  Products.associate = models => {
    Products.hasMany(models.MaterialsCosts, { onDelete: "CASCADE", hooks: true });
  };

  return Products;
};