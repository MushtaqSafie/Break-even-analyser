module.exports = (sequelize, DataTypes) => {
  const MaterialsCosts = sequelize.define("MaterialsCosts", {
    material_description: {
      type: DataTypes.STRING
    },
    quantity: {
      type: DataTypes.INTEGER
    },
    cost_price: {
      type: DataTypes.DECIMAL(10, 2)
    },
    product_SKU: {
      type: DataTypes.STRING
    },
  });

  return MaterialsCosts;
};