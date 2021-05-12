module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email_address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user_password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return User;
};