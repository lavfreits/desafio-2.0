import express from "express";
import routes from "../../index.js";
import db from "./db.js";


db.on("error", (erro) => {
  console.error("erro de conexao com banco de dados", erro);
});

db.once("open", () => {
  console.log("conexao com banco feita com sucesso");
});

const app = express();
app.db = db;
routes(app);

export default app;