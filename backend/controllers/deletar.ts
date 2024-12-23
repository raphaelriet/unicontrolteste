import { getBuiltinModule } from "process";
import prisma from "../db";
import { Request, Response } from "express";

async function deletar(req: Request, res:Response) {
    const numero = parseInt(req.params.id)
    const resposta = await prisma.produtos.delete({
        where: {
            id: numero
        }
    })
    res.status(201).json({mensagem:"Produto deletado com sucesso.", resposta})
}

export default deletar;