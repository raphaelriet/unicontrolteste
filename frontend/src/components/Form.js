import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify"


const FormContainer = styled.form`
    display: flex;
    align-items: flex-end;
    gap: 10px;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    `;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    width: 120px;
    padding: 0 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
    padding: 10px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
    background-color: #2c73d2;
    color: white;
    height: 42px;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
        background-color: #27ae60; 
        transform: scale(1.1); 
    }
`;

const Form = ({ getProducts, onEdit, setOnEdit }) => {
    const ref = useRef();
    
        useEffect(() => {
            if (onEdit) {
                const product = ref.current;

                product.nome.value = onEdit.nome;
                product.quantidade.value = onEdit.quantidade;
                product.valor.value = onEdit.valor;

            }
        }, [onEdit]);

        const handleSubmit = async (e) => {
            e.preventDefault();
        const product = ref.current;

        if (
            !product.nome.value ||
            !product.quantidade.value ||
            !product.valor.value 
        ) {
            return toast.warn("Preencha todos os campos!");
        }

        if (onEdit) {
            console.log(product)
            await axios
            .put("http://localhost:3000/editar/" + onEdit.id, {
                nome: product.nome.value,
                quantidade: product.quantidade.value,
                valor: product.valor.value,
            })
            .then(({ data }) => toast.success(data.mensagem))
            .catch(({ data }) => toast.error(data.mensagem));
        } else {
            await axios
            .post("http://localhost:3000/cadastro/", {
                nome: product.nome.value,
                quantidade: product.quantidade.value,
                valor: product.valor.value,
            })
            .then(({ data }) => {
                toast.success(data.mensagem)}
            )
            .catch(({ data }) => toast.error(data.mensagem));
        }

        product.nome.value = "";
        product.quantidade.value = "";
        product.valor.value = "";

        setOnEdit(null);
        getProducts();
      };

    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>   
        <InputArea>
        <Label>Nome</Label>
        <Input name="nome"/>
        </InputArea>
        <InputArea>
        <Label>Quantidade</Label>
        <Input name="quantidade" type="number"/>
        </InputArea>
        <InputArea>
        <Label>Valor</Label>
        <Input name="valor" type="number"/>
        </InputArea>

        <Button type="submit">Cadastrar</Button>
        </FormContainer>

    );
};

export default Form;