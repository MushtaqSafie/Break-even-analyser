module.exports = (sequelize, DataTypes) => {
  const LabourCosts = sequelize.define("LabourCosts", {
    product_SKU: {
      type: DataTypes.STRING
    },
    // labour cost per unit
    labour_cost: {
      type: DataTypes.DECIMAL(10, 2)
    },

  });

  return LabourCosts;
};