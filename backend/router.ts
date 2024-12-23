import express ,{Router} from "express";
import listar from "./controllers/listar";
import deletar from "./controllers/deletar";
import cadastro from "./controllers/cadastro";
import editar from "./controllers/editar";

const routes = Router()

routes.get("/listar", listar)
routes.delete("/deletar/:id", deletar)
routes.post("/cadastro", cadastro)
routes.put("/editar/:id", editar)


export default routes