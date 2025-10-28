export const AlimentModel = (sequelize, DataTypes) => {
  return sequelize.define("aliments", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
    },
    glucide: {
      type: DataTypes.INTEGER,
    },
    protide: {
      type: DataTypes.INTEGER,
    },
    magnesium: {
      type: DataTypes.INTEGER,
    },
    water: {
      type: DataTypes.INTEGER,
    },
    others: {
      type: DataTypes.INTEGER,
    },
  });
};
