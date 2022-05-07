import "reflect-Metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";

import { router } from "./routes";
import "./database";

const app = express();

app.use(express.json());

app.use(router);

app.use(
  (err: Error,  request: Request, response: Response, next: NextFunction) => {

  if(err instanceof Error) {
    return response.status(400).json({
      error: err.message
    });
  }
  return response.status(500).json({
    status: "error",
    message: "Internal Server Error",
  })
})




// METODOS ---->>
// GET  =>> Busca uma informação dentro da aplicação(api)
// POST =>> Inserir (criar) uma infromção dentro da aplicação(api)
// PUT  =>> Alterar uma informação dentro da aplicação (api)

// Request -> tudo que esta entrado
// Respons -> tudo que esta saindo

// Parametros para requisição(tipos)
// Routes Params --> Paramentros que fazem parte da rota(ex.: http://localhost:3000/servicos/23475854125)
// Query Params  --> Parametros que fazem parte de uma Query, são parametros não obrigatórios(ex.: usa quando quero fazer um filtro, http://localhost:3000/servicos?name=entrega&nome=envio&decription=envionormal)
// Body Params   --> parametros que vão vir no corpo da requisição

// Adicionando typeon reflect-metadata sqlite3 --> (yarn add typeorm reflect-metadata sqlite3) a dependecia chama-se sqlite3

app.listen(3000, () => console.log("Server is running"));