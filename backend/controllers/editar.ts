import { getBuiltinModule } from "process";
import prisma from "../db";
import { Request, Response } from "express";
import { Produtos } from "@prisma/client";
type Update = Partial<
  Omit<Produtos, "id">
>;

async function editar(req: Request, res:Response) {
    const numero = parseInt(req.params.id)
    const quantidade = req.body.quantidade ? parseInt(req.body.quantidade) : undefined
    const valor = req.body.valor ? parseInt(req.body.valor) : undefined
    const data: Update = {nome:req.body.nome,quantidade:quantidade,valor:valor}
    const resposta = await prisma.produtos.update({
    where:{
        id: numero
    }, 
    data  
    }
    )
    res.status(201).json({mensagem:"Produto editado com sucesso.", resposta})
}

export default editar;