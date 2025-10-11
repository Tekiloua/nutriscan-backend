export const PoidsModel = (sequelize, DataTypes) => {
  return sequelize.define("poids", {
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
