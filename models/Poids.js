module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Poids", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    valeur: {
      type: DataTypes.FLOAT,
    },
  });
};
