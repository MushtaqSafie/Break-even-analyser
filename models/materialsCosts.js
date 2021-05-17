module.exports = (sequelize, DataTypes) => {
  const MaterialsCosts = sequelize.define("MaterialsCosts", {
    material_description: {
      type: DataTypes.STRING
    },
    cost_price: {
      type: DataTypes.DECIMAL(10, 2)
    },
    product_SKU: {
      type: DataTypes.STRING
    },
  });

  MaterialsCosts.associate = models => {
    MaterialsCosts.belongsTo(models.Products, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return MaterialsCosts;
};