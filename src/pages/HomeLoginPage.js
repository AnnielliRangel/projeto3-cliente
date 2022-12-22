import { useState, useContext } from "react";
import { Button, Container, Form, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../api/api.js";
import { AuthContext } from "../contexts/authContext";
import brasao from "../assets/brasaooficialcolorido.png";

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
      if (error) {
        alert("Por favor, ative seu email antes do login");
        return;
      }
    }
  }

  function btnSignup() {
    navigate("/sign-up");
  }

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center">
      <Card className="card-login">
        <Card.Header>
          <Row className="justify-content-center">
            <img
              className="brasao"
              src={brasao}
              alt="Brasão da República"
            ></img>
          </Row>
          <Row className="text-sm-center">
            <h3 className="mt-3 mb-3">
              Bem Vindo ao Sistema de Controle de Acessos
            </h3>
          </Row>
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
          </Form>
        </Card.Body>
        <Card.Footer>
          <Container fluid="sm">
            <Row className="justify-content-sm-center">
              <Col sm="auto">
                <Button onClick={handleSubmit} variant="success" type="submit">
                  Entrar
                </Button>
              </Col>
              <Col sm="auto">
                <Button
                  onClick={btnSignup}
                  variant="outline-warning"
                  type="submit"
                >
                  Cadastre-se
                </Button>
              </Col>
            </Row>
            <Row>
              <Card.Footer className="mt-3">
                <p>
                  By Ironhack/Enap WDFT92: Annielli, Anderson, Bruno & Sérgio
                </p>
              </Card.Footer>
            </Row>
          </Container>
        </Card.Footer>
      </Card>
    </Container>
  );
}

export default HomeLoginPage;
