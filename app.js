const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { initDb } = require("./db/sequelize");
const insertPoids = require("./routes/insertPoids");
const insertAliment = require("./routes/insertAliment");
const findAllPoids = require("./routes/findAllPoids");
const findAllAliments = require("./routes/findAllAliments");
const getCanWeigh = require("./routes/getCanWeigh");
const updateCanWeigh = require("./routes/updateCanWeigh");
const cors = require("cors");
const morgan = require("morgan");
const deleteAll = require("./routes/deleteAll");

app.use(morgan("dev"));

app.use(bodyParser.json());

// Autorise toutes les origines (en dev)
app.use(cors());
// initDb();

getCanWeigh(app);
updateCanWeigh(app);
insertPoids(app);
insertAliment(app);
findAllPoids(app);
findAllAliments(app);
deleteAll(app);

app.listen(3001, () => {
  console.log("le démarrer sur le port 3001");
});
