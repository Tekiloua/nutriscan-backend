const { Aliment } = require("../db/sequelize");

module.exports = (app) => {
  app.get("/aliments", (req, res) => {
    return Aliment.findAll({
      // order: [["createdAt", "DESC"]],
    }).then((data) => {
      const message = `voici la liste de tous les aliments enregistrées scannées`;
      res.json({ message, data });
    });
  });
};
