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
  });
};
