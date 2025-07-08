const { Aliment } = require("../db/sequelize");

module.exports = (app) => {
  app.post("/aliment", (req, res) => {
    Aliment.create(req.body).then((poids) => {
      res.json({ message: "création réussie", data: poids });
    });
  });
};
