const { CanWeigh } = require("../db/sequelize");

module.exports = (app) => {
  app.get("/can-weigh", (req, res) => {
    return CanWeigh.findByPk(1).then((data) => {
      const message = `Données dans CanWeigh`;
      res.json({ message, data });
    });
  });
};
