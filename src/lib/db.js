import { Sequelize, DataTypes } from "sequelize";
import { PoidsModel } from "../models/Poids.js";

export const sequelize = new Sequelize("nutriscandb", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  dialectOptions: {
    timezone: "Etc/GMT-2",
  },
  logging: false,
});

export const Poids = PoidsModel(sequelize, DataTypes)

export const initDb = () => {
  return sequelize.sync({ force: true }).then((_) => {
    console.log("La base de donnée a bien été initialisée !");
  });
};
