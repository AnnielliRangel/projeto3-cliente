import { useEffect, useState } from "react";
import api from "../api/api.js";

import NavBar from "../components/NavBar.js";

import {
  Col,
  Container,
  Form,
  Row,
  Button,
  Card,
  Figure,
} from "react-bootstrap";

import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function FormUpdateUser() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [profile, setProfilePic] = useState();

  const [form, setForm] = useState({
    name: "",
    role: "",
    active: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // const [reload, setReload] = useState(false);

  useEffect(() => {
    async function getUser() {
      const response = await api.get(`/user/oneUser/${userId}`);
      setForm(response.data);
    }
    getUser();
  }, [userId]);

  async function handleDelete(e) {
    // console.log("Teste")
    await api.delete(`/user/delete/${userId}`);
    // console.log(e);
    toast.success("Usuário deletado com sucesso!");
    navigate("/admin");
  }

  async function handleUpload(e) {
    try {
      const uploadData = new FormData();
      uploadData.append("picture", profile);

      const response = await api.post("/uploadImage/upload", uploadData);

      return response.data.url;
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado. Tente novamente.");
    }
  }

  async function handleSubimit(e) {
    e.preventDefault();

    try {
      const imgURL = await handleUpload();
      const clone = { ...form };

      delete clone._id;
      delete clone.acessos;

      await api.put(`/user/edit/${userId}`, {
        ...clone,
        profilePic: imgURL,
      });

      navigate("/admin");

      toast.success("As atualizações foram salvas.");
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado. Tente novamente.");
    }
  }

  function handleImage(e) {
    setProfilePic(e.target.files[0]);
  }

  return (
    <Container className="container-principal" fluid>
      <Row className="justify-content-sm-center">
        <Col sm={2}>{<NavBar />}</Col>
        <Col sm={10}>
          <Row>
            <Card className="card-form">
              <Card.Header>Formulário de Atualização de Usuário</Card.Header>
              <Card.Body>
                <Card.Text>
                  <Form>
                    <Row className="justify-content-sm-center">
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label>Nome</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Nome Completo"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            autofocus
                          />
                          <Form.Text className="text-muted"></Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Tipo de Usuário</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Digite o tipo de acesso"
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                          />
                          <Form.Text className="text-muted"></Form.Text>
                        </Form.Group>
                      </Col>
                      <Col sm="auto">
                        <Form.Group className="mb-3">
                          <Figure.Image
                            width={171}
                            height={180}
                            alt="foto"
                            src={form.profilePic}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="justify-content-sm-center">
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label htmlFor="tipoDoc">Situação</Form.Label>
                          <Form.Select
                            id="active"
                            name="active"
                            value={form.active}
                            onChange={handleChange}
                          >
                            <option>SELECIONE</option>
                            <option value="true">Ativo</option>
                            <option value="false">Inativo</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="justify-content-sm-center">
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label>Foto de Perfil</Form.Label>
                          <Form.Control type="file" onChange={handleImage} />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Form>
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <Container>
                  <Row className="justify-content-sm-center">
                    <Col sm="auto">
                      <Button
                        style={{ marginRight: "25px" }}
                        variant="success"
                        type="submit"
                        onClick={handleSubimit}
                      >
                        Salvar
                      </Button>
                      <Link to={"/admin"}>
                        <Button
                          variant="warning"
                          style={{ marginRight: "25px" }}
                        >
                          Cancelar
                        </Button>
                      </Link>
                      <Button variant="danger" onClick={handleDelete}>
                        Delete
                      </Button>
                    </Col>
                  </Row>
                </Container>
              </Card.Footer>
            </Card>
          </Row>
          <Row>
            <Card className="card-form">
              <Card.Header>Histórico de Registros</Card.Header>
              <Card.Body></Card.Body>
            </Card>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
