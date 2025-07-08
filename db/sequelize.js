const { Sequelize, DataTypes } = require("sequelize");
const PoidModel = require("../models/Poids");
const AlimentsModel = require("../models/Aliments");
const CanWeighModel = require("../models/CanWeigh");

const sequelize = new Sequelize("esp32db", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  dialectOptions: {
    timezone: "Etc/GMT-2",
  },
  logging: false,
});

const Poids = PoidModel(sequelize, DataTypes);
const Aliment = AlimentsModel(sequelize, DataTypes);
const CanWeigh = CanWeighModel(sequelize, DataTypes);

const initDb = () => {
  return sequelize.sync({ force: true }).then((_) => {
    CanWeigh.create({
      valeur: 0,
    });
    console.log("La base de donnée a bien été initialisée !");
  });
};

module.exports = {
  initDb,
  Poids,
  Aliment,
  CanWeigh,
};
