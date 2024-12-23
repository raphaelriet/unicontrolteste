import prisma from "../db";
import { Request, Response } from "express";

async function listar(req: Request, res:Response) {
    const resposta = await prisma.produtos.findMany()
    res.status(201).json({mensagem:"Produtos listados com sucesso.", resposta})
}

export default listar;