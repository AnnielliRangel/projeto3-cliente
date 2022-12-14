import { Form, Row, Col, Button, Card } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import api from "../api/api.js";
import NavBar from "../components/NavBar.js";

function FormCadastroPessoa() {
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();

  const [img, setImg] = useState();
  const [form, setForm] = useState({
    nome: "",
    dataNasc: "",
    tipoDoc: "",
    numDoc: "",
    acessibilidade: "",
    genero: "",
    acessos: [],
    noLocal: false,
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleImage(e) {
    setImg(e.target.files[0]);
  }

  async function handleUpload(e) {
    try {
      const uploadData = new FormData();
      uploadData.append("picture", img);

      const response = await api.post("/uploadImage/upload", uploadData);

      console.log(uploadData);

      return response.data.url;
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubimit(e) {
    e.preventDefault();
    const imgURL = await handleUpload();

    try {
      await api.post("Cidadao/create-cidadao", { ...form, profilePic: imgURL });
      setForm({
        nome: "",
        dataNasc: "",
        tipoDoc: "",
        numDoc: "",
        acessibilidade: "",
        genero: "",
        acessos: [],
        noLocal: false,
      });
      toast.success("Cadastro realizado com sucesso.");
      setReload(!reload);
      navigate("/tabela");
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado. Tente novamente.");
    }
  }

  return (
    <Container className="container-principal" fluid>
      <Row>
        <Col sm={2}>{<NavBar />}</Col>
        <Col sm={10}>
          <Row>
            <Card className="card-form">
              <Card.Header>Formulário de Cadastro</Card.Header>
              <Card.Body>
                <Card.Text>
                  <Form>
                    <Row className="justify-content-md-center">
                      <Col>
                        <Form.Group className="mb-3" controlId="nome">
                          <Form.Label>Nome</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Nome Completo"
                            name="nome"
                            value={form.nome}
                            onChange={handleChange}
                          />
                          <Form.Text className="text-muted"></Form.Text>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Col>
                          <Form.Group className="mb-3" controlId="dataNasc">
                            <Form.Label>Data de Nascimento</Form.Label>
                            <Form.Control
                              type="date"
                              placeholder="data"
                              name="dataNasc"
                              value={form.dataNasc}
                              onChange={handleChange}
                            />
                            <Form.Text className="text-muted"></Form.Text>
                          </Form.Group>
                        </Col>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label htmlFor="tipoDoc">
                            Tipo de Documento
                          </Form.Label>
                          <Form.Select
                            id="tipoDoc"
                            name="tipoDoc"
                            value={form.tipoDoc}
                            onChange={handleChange}
                          >
                            <option>SELECIONE</option>
                            <option value="cpf">CPF</option>
                            <option value="rg">RG</option>
                            <option value="cnh">CNH</option>
                            <option value="oab">OAB</option>
                            <option value="passaporte">Passaporte</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-3" controlId="numDoc">
                          <Form.Label>Número de documento </Form.Label>
                          <Form.Control
                            type="number"
                            placeholder="somente números"
                            name="numDoc"
                            value={form.numDoc}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label htmlFor="genero">Genero</Form.Label>
                          <Form.Select
                            id="genero"
                            name="genero"
                            value={form.genero}
                            onChange={handleChange}
                          >
                            <option>SELECIONE</option>
                            <option value="feminino">Feminino</option>
                            <option value="masculino">Masculino</option>
                            <option value="outro">Outro</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label htmlFor="acessibilidade">
                            Atendimento Prioritário{" "}
                          </Form.Label>
                          <Form.Select
                            id="acessibilidade"
                            name="acessibilidade"
                            onChange={handleChange}
                            value={form.acessibilidade}
                          >
                            <option>SELECIONE</option>
                            <option value="nenhuma">Nenhuma</option>
                            <option value="prioridade">
                              Prioridade por Lei
                            </option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row style={{ display: "flex", justifyContent: "initial" }}>
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
                <Row>
                  <Col style={{ textAlign: "center" }}>
                    <Button
                      className="text=center"
                      variant="success"
                      type="submit"
                      onClick={handleSubimit}
                    >
                      Cadastrar
                    </Button>
                  </Col>
                  <Col style={{ textAlign: "center" }}>
                    <Link to={"/tabela"}>
                      <Button variant="secondary" type="submit">
                        Cancelar
                      </Button>
                    </Link>
                  </Col>
                </Row>
              </Card.Footer>
            </Card>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default FormCadastroPessoa;
