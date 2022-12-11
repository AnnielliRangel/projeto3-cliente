import { Form, Row, Col, Button, Card } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import api from "../api/api.js";

function FormCadastroPessoa() {
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();
  //esse state vai guardar a IMAGEM escolhida pelo usuário
  const [img, setImg] = useState();
  const [form, setForm] = useState({
    nome: "",
    dataNasc: "",
    tipoDoc: "",
    numDoc: "",
    acessibilidade: "",
    genero: "",
    img: "",
    acessos: [],
    noLocal: false,
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubimit(e) {
    e.preventDefault();
    try {
      await api.post("Cidadao/create-cidadao", form);
      setForm({
        nome: "",
        dataNasc: "",
        tipoDoc: "",
        numDoc: "",
        acessibilidade: "",
        genero: "",
        img: "",
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

  function handleImage(e) {
    //console.log(e.target.files[0]);
    setImg(e.target.files[0]);
  }
  console.log(img);
  /*async function handleUpload(e) {
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
  vou chamar a função handleUpload()

  const imgURL = await handleUpload();
  disparo a requisição de cadastro para o meu servidor
  try {
    await api.post("/user/sign-up", { ...form, profilePic: imgURL });

  navigate("/tabela");
  } catch (error) {
  console.log(error);
  } */

  return (
    <div>
      <h1 style={{ textAlign: "center", padding: "50px" }}>
        {" "}
        FORMULÁRIO DE CADASTRO{" "}
      </h1>

      <Container>
        <Row className="justify-content-md-center">
          <Card
            border="primary"
            key="primary"
            text="dark"
            style={{ width: "70rem", marginTop: "50px" }}
            className="mb-2"
          >
            <Row style={{ display: "flex", justifyContent: "center" }}>
              <Card.Img
                variant="top"
                src={form.img}
                style={{
                  borderRadius: "20%",
                  width: "15rem",
                  marginTop: "50px",
                }}
              />
            </Row>
            <Card.Body>
              <Card.Text>
                <Form>
                  <Row>
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
                        <Form.Label>Foto de Perfil</Form.Label>
                        <Form.Control type="file" onChange={handleImage} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row style={{ display: "flex", justifyContent: "initial" }}>
                    <Col>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                        <Form.Check
                          htmlFor="acessibilidade"
                          type="checkbox"
                          label="ATENDIMENTO PRIORITÁRIO"
                          value={form.acessibilidade}
                          id="acessibilidade"
                          name="acessibilidade"
                        />
                      </Form.Group>
                    </Col>
                    <Col></Col>
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
      </Container>
    </div>
  );
}

export default FormCadastroPessoa;
