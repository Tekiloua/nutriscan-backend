module.exports = (sequelize, DataTypes) => {
  return sequelize.define("CanWeigh", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    valeur: {
      type: DataTypes.INTEGER,
    },
  });
};
