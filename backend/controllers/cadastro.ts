import prisma from "../db";
import { Request, Response } from "express";

async function cadastro(req: Request, res:Response) {
    const {nome,quantidade,valor} = req.body;
    const resposta = await prisma.produtos.create({
        data: {
            nome,
            quantidade: parseInt(quantidade),
            valor: parseInt(valor)
        }
    })
    res.status(201).json({mensagem: "Produto criado com sucesso!", resposta})
}

export default cadastro;