const { Poids } = require("../db/sequelize");

module.exports = (app) => {
  app.post("/poids", (req, res) => {
    Poids.create(req.body).then((poids) => {
      res.json({ message: "création réussie", data: poids });
    });
  });
};
