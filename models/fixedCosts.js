module.exports = (sequelize, DataTypes) => {
  const FixedCosts = sequelize.define("fixedCosts", {
    fixed_cost_item: {
      type: DataTypes.STRING
    },
    date: {
      type: DataTypes.DATE
    },
    description: {
      type: DataTypes.STRING
    },
    Amount: {
      type: DataTypes.DECIMAL(10, 2)
    },

  });

  return FixedCosts;
};