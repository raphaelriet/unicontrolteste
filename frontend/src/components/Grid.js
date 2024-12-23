import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
    width: 100%;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    max-width: 800px;
    margin: 20px auto;
    word-break: break-all;
`;

const EmptyText = styled.h4`
    text-align: center;
    color: white;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
    text-align: start;
    border-bottom: inset;
    padding-bottom: 5px;

    @media (max-width: 500px) {
    }
`;

export const Td = styled.td`
    padding-top: 15px;
    text-align: ${(props) => (props.alignCenter ? "center" : "start")};
    width: ${(props) => (props.width ? props.width : "auto")};

    @media (max-width: 500px) {
    }

`;

const Grid = ({ products, setProducts, setOnEdit }) => {

    const handleEdit = (item) => {
        setOnEdit(item);
    };

    const handleDelete = async (id) => {
        await axios
        .delete("http://localhost:3000/deletar/" + id)
        .then(({ data }) => {
            const newArray = products.filter((product) => product.id !== id);

            setProducts(newArray);
            toast.success(data.mensagem);
        })
        .catch(({ data }) => toast.error(data.mensagem));

        setOnEdit(null);

    };

    if(products.length == 0) {
        return (<EmptyText>Não há produtos cadastrados.</EmptyText>)
    } else {
        return (
        <Table>
            <Thead> 
                <Tr>
                    <Th>Nome</Th>
                    <Th>Quantidade</Th>
                    <Th>Valor</Th>
                    <Th></Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {
                 products.map((item, i) => (
                    <Tr key={i}>
                        <Td width="30%">{item.nome}</Td>
                        <Td width="30%">{item.quantidade}</Td>
                        <Td width="20%">{item.valor}</Td>
                        <Td alignCenter width="5%"> 
                            <FaEdit onClick={() => handleEdit(item)} />
                        </Td>
                        <Td alignCenter width="5%">
                            <FaTrash color="red" onClick={() => handleDelete(item.id)} />
                        </Td>
                    </Tr>
                ))
            }
            </Tbody>
        </Table>
        )
    }
};

export default Grid;