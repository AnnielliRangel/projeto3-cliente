import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api.js";

function SignUpPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  //esse state vai guardar a IMAGEM escolhida pelo usuário
  const [img, setImg] = useState();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleImage(e) {
    //console.log(e.target.files[0]);
    setImg(e.target.files[0]);
  }

  async function handleUpload(e) {
    try {
      const uploadData = new FormData();
      uploadData.append("picture", img);

      const response = await api.post("/uploadImage/upload", uploadData);

      return response.data.url;
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    //conferir se a senhas estão iguais
    if (form.password !== form.confirmPassword) {
      alert("Senhas incompatíveis");
      return;
    }

    //vou chamar a função handleUpload()
    //disparo a requisição de cadastro para o meu servidor
    
    try {
      const imgURL = await handleUpload();
      await api.post("/user/sign-up", { ...form, profilePic: imgURL });
      toast.success("Usuario cadastrado com sucesso")

      navigate("/");
    } catch (error) {
      console.log({ error })
      toast.error({ error })
    }
  }

  return (
    <Container
      className="container-principal" fluid
    >
      <Row className="justify-content-sm-center">
        <Col sm="auto">
          <Card className="card-signup">
            <Card.Header>Formulário de cadastro de Usuário</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nome completo</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Insira um nome para identificação"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Endereço de e-mail</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Insira o seu melhor endereço de e-mail"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Senha</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Insira uma senha válida"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirmar senha</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirme a senha válida criada anteriormente"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Foto de Perfil</Form.Label>
                  <Form.Control type="file" onChange={handleImage} />
                </Form.Group>

              </Form>
            </Card.Body>
            <Card.Footer>
              <Container>
                <Row className="justify-content-sm-center">
                  <Col sm="auto">
                    <Button className="my-3" variant="dark" onClick={handleSubmit}>
                      Cadastrar usuário
                    </Button>
                  </Col>
                  <Col sm="auto">
                    <Link to={"/"}>
                      <Button className="my-3" variant="warning">
                        Voltar
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </Container>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUpPage;
