import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/Form";
import Grid from "./components/Grid";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import logo from './assets/logo.png';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background: linear-gradient(to right, #1e3c72, #2a5298);
`;

const Title = styled.h2`
  color: white;
`;

const Img = styled.img`
  width: 300px;
`;

function App() {
  const [products, setProducts] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/listar");
      setProducts(res.data.resposta.sort((a, b) => (a.nome > b.nome ? 1 : -1))); 
      console.log(res.data)
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [setProducts]);


  return (
    <>
    <ToastContainer position="bottom-right" autoClose={1000}></ToastContainer>
    <Container>
    <Img src={logo} alt="logo" />
    <Title>ESTOQUE</Title>
    <Form onEdit={onEdit} setOnEdit={setOnEdit} getProducts={getProducts} />
    <Grid products={products} setProducts={setProducts} setOnEdit={setOnEdit} />
    </Container>
    <GlobalStyle />
    </>
  );
}

export default App;
