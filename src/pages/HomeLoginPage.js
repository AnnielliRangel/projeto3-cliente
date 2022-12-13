import { useState, useContext } from "react";
import { Button, Container, Form, Card, Row, Col, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api.js";
import { AuthContext } from "../contexts/authContext";

function HomeLoginPage() {
  const navigate = useNavigate();

  const { setLoggedInUser } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await api.post("/user/login", form);

      localStorage.setItem("loggedInUser", JSON.stringify(response.data));

      setLoggedInUser({ ...response.data });

      if (response.data.user.role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/tabela");
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        alert("Por favor, ative seu email antes do login");
        return;
      }
    }
  }

  return (
    <Container
      className="d-flex flex-column align-items-center justify-content-center"
    >
        <Card className="card-login">
          <Card.Header>
            Bem Vindo ao Sistema de Controle de Acessos
          </Card.Header>
          <Card.Body>
          
            <Card.Title>Faça seu Login</Card.Title>

            <Form onSubmit={handleSubmit} className="m-3">
              <Form.Group className="mb-3">
                <Form.Label>Endereço de e-mail</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Insira o endereço de e-mail cadastrado"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Insira a senha cadastrada"
                />
              </Form.Group>
              
              <Button className="my-3" variant="success" type="submit">
                Entrar
              </Button>
            </Form>
          </Card.Body>
      </Card>

      <Alert variant='warning'>
        Se esse é o seu primeiro acesso,{' '}
        <Alert.Link to="/sign-up">Clique aqui</Alert.Link>
      </Alert>
    </Container>
  );
}

export default HomeLoginPage;
