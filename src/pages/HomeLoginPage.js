import { useState, useContext } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api.js";
import { AuthContext } from "../contexts/authContext";
import Card from "react-bootstrap/Card";

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

      //validar se o usuário confirmou o email dele

      //setItem -> coloca algo dentro do localStorage
      localStorage.setItem("loggedInUser", JSON.stringify(response.data));

      //atualizar o contexto
      setLoggedInUser({ ...response.data });

      /*  if (response.data.user.role === "ADMIN") {
            navigate("/admin")
        } */

      navigate("/profile");
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
      style={{ height: "100vh" }}
      className="d-flex flex-column align-items-center justify-content-center"
    >
      <Card>
        <Card.Title style={{ margin: "10vh" }}>
          Bem Vindo ao Sistema de Controle de Atendimento ao Cidadão e acessos
          ao Serviço Público
        </Card.Title>

        <Card>
          <Card.Title>Login </Card.Title>

          <Form onSubmit={handleSubmit} className="m-5">
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
        </Card>
      </Card>

      <Form.Text>
        Se esse é o seu primeiro acesso,
        <Link
          className="text-warning fw-bold text-decoration-none"
          to="/sign-up"
        >
          {" "}
          Clique aqui
        </Link>
        .
      </Form.Text>
    </Container>
  );
}

export default HomeLoginPage;
