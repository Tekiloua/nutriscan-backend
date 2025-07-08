const { Poids } = require("../db/sequelize");

module.exports = (app) => {
  app.get("/poids", (req, res) => {
    return Poids.findAll({
      // order: [["createdAt", "DESC"]],
    }).then((data) => {
      const message = `voici la liste de tous les poids enregistrées`;
      res.json({ message, data });
    });
  });
};
