module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Aliments", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nom: {
      type: DataTypes.STRING,
    },
    categorie:{
      type:DataTypes.STRING
    },
    fraicheur: {
      type: DataTypes.INTEGER,
    },
    glucide: {
      type: DataTypes.INTEGER,
    },
    protide: {
      type: DataTypes.INTEGER,
    },
    eau: {
      type: DataTypes.INTEGER,
    },
    vitamine_A: {
      type: DataTypes.INTEGER,
    },
    vitamine_B: {
      type: DataTypes.INTEGER,
    },
    vitamine_C: {
      type: DataTypes.INTEGER,
    },
  });
};
