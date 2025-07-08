const { initDb } = require("../db/sequelize");
module.exports = (app) => {
  app.delete("/delete-all", (req, res) => {
    initDb()
      .then(() => {
        res.json({ message: "Base de données réinitialisée" });
      })
      .catch((error) => {
        res
          .status(500)
          .json({
            message: "Erreur lors de la réinitialisation de la base de données",
            error,
          });
      });
  });
};
