import axios from "axios";
import { useEffect, useState } from "react";
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
import ListAcessos from "../components/listAcessos";

export default function FormUpdatePessoa() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [img, setImg] = useState();

  const [form, setForm] = useState({
    nome: "",
    dataNasc: "",
    numDoc: "",
    tipoDoc: "",
    profissao: "",
    acessibilidade: "",
    genero: "",
    img: "",
    acessos: [],
    noLocal: false,
  });

  useEffect(() => {
    async function getPessoa() {
      const response = await axios.get(
        `https://ironrest.cyclic.app/AcessCidadao/${userId}`,
      );
      setForm(response.data);
    }
    getPessoa();
  }, [userId]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleDelete(e) {
    await axios.delete(`https://ironrest.cyclic.app/AcessCidadao/${userId}`);
    navigate("/");
  }

  async function handleSubimit(e) {
    e.preventDefault();
    try {
      const clone = { ...form };

      delete clone._id;

      await axios.put(
        `https://ironrest.cyclic.app/AcessCidadao/${userId}`,
        clone,
      );

      navigate("/");

      toast.success("Cadastro atualizado com sucesso.");
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
    <Container>
      <Row className="justify-content-md-center">
        <Card
          border="primary"
          key="primary"
          text="dark"
          style={{ width: "70rem", marginTop: "30px" }}
          className="mb-2"
        >
          <Card.Header>Formulário de atualização</Card.Header>
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

                    <Form.Group className="mb-3" controlId="dataNasc">
                      <Form.Label>Data Nasc.</Form.Label>
                      <Form.Control
                        type="date"
                        placeholder="Data Nascimento"
                        name="dataNasc"
                        value={form.dataNasc}
                        onChange={handleChange}
                      />
                      <Form.Text className="text-muted"></Form.Text>
                    </Form.Group>
                  </Col>
                  <Col md="auto">
                    <Form.Group className="mb-3" controlId="foto">
                      <Figure.Image
                        width={171}
                        height={180}
                        alt="foto"
                        src={form.img}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="justify-content-md-center">
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Tipo de Documento</Form.Label>
                      <Form.Select
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

                <Row className="justify-content-md-center">
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label>Foto de Perfil</Form.Label>
                      <Form.Control type="file" onChange={handleImage} />
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
                        <option value="prioridade">Prioridade por Lei</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="justify-content-md-center">
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="genero">Genero</Form.Label>
                      <Form.Select
                        name="genero"
                        value={form.genero}
                        onChange={handleChange}
                      >
                        <option>Selecione</option>
                        <option value="feminino">Feminino</option>
                        <option value="masculino">Masculino</option>
                        <option value="outro">Outro</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3" controlId="foto">
                      <Form.Label>Foto</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="link para foto"
                        name="img"
                        value={form.img}
                        onChange={handleChange}
                      />
                      <Form.Text className="text-muted"></Form.Text>
                    </Form.Group>
                  </Col>
                </Row>

                <Container>
                  <Row>
                    <Col md={{ span: 4, offset: 4 }}>
                      <Button
                        style={{ marginRight: "25px" }}
                        variant="success"
                        type="submit"
                        onClick={handleSubimit}
                      >
                        Salvar
                      </Button>
                      <Link to={"/"}>
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
              </Form>
            </Card.Text>
          </Card.Body>
        </Card>
      </Row>
      <Row className="justify-content-md-center">
        <Card
          border="primary"
          key="primary"
          text="dark"
          style={{ width: "70rem" }}
          className="mb-2"
        >
          <Card.Header>Histórico de visitas</Card.Header>
          <Card.Body>
            <ListAcessos acessos={form.acessos} />
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
}