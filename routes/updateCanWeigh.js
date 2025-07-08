const { CanWeigh } = require("../db/sequelize");

module.exports = (app) => {
  app.post("/can-weigh", async (req, res) => {
    await CanWeigh.update(req.body, {
      where: {
        id: 1,
      },
    }).then((_) => {
      res.send("changement de canweigh en " + req.body.valeur);
    });
  });
};
