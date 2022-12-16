import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Figure,
} from "react-bootstrap";
import toast from "react-hot-toast";
import setores from "../Setores.json";
// import servicos from "../Servicos.json";
import obsMotivos from "../Motivos.json";

// Instead of axios - api.js
import api from "../api/api.js";
// import { Cpu } from "react-bootstrap-icons";
import NavBar from "../components/NavBar";

//<Route
//             path="/novoacesso/:userId"
//             element={<ProtectRoute Component={novoAcesso} />}
//           />

export default function NovoAcesso() {
  const listSetores = setores;

  const listMotivos = obsMotivos;

  //Pegando o userID definido como parametro em <Route> do (registro.routes.js backend)
  const { cidadaoID } = useParams();

  //Instanciando o useNavigate() na constante navigate
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [cidadao, setCidadao] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const [form, setForm] = useState({
    saida: "",
    servicoPublico: "",
    local: "",
    obs: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const [reload, setReload] = useState(false);

  //
  useEffect(() => {
    async function getCidadao() {
      const response = await api.get(`/cidadao/oneCidadao/${cidadaoID}`);
      setCidadao(response.data);
      setIsLoading(false);
    }
    getCidadao();

    async function fetchServices() {
      try {
        const response = await api.get("/service/my-services");
        setServices(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchServices();
  }, [reload, cidadaoID]);

  async function handleEntrance(e) {
    e.preventDefault();

    try {
      function dataHora() {
        let agora = new Date();
        let hora =
          agora.getDate() +
          "/" +
          (1 + Number.parseInt(agora.getMonth())).toString() +
          "/" +
          agora.getFullYear() +
          " " +
          agora.getHours() +
          "h" +
          agora.getMinutes() +
          "m";

        return hora;
      }

      const novoAcesso = {
        entrada: dataHora(),
        saida: form.saida,
        servicoPublico: form.servicoPublico,
        local: form.local,
        obs: form.obs,
      };

      await api.post(`/registro/create-registro/${cidadaoID}`, novoAcesso);

      toast.success(
        `Acesso de ${cidadao.nome.toUpperCase()}! Foi registrado com sucesso ;)!`
      );
      setReload(!reload);
      navigate("/tabela");
    } catch (error) {
      toast.error("Algo deu errado! Tente novamente...");
    }
  }

  return (
    <Container className="container-principal" fluid>
      <Row>
        <Col sm={3}>{<NavBar />}</Col>
        <Col sm={9}>
          <Row>
            {!isLoading && (
              <Card className="card-form">
                <Card.Header>Registro → Novo Acesso do Cidadão</Card.Header>

                <Card.Body>
                  <Form>
                    <Row>
                      <Col>
                        <Card.Title className="mt-3">
                          <h2>{cidadao.nome.toUpperCase()} </h2>
                          <Col sm="auto">
                            <Form.Group className="mb-3 ta-center">
                              <Figure.Image
                                width={200}
                                height={180}
                                alt="foto"
                                src={cidadao.profilePic}
                              />
                            </Form.Group>
                          </Col>
                          {/* <img className="ta-center"
                            style={{ width: "200px", borderRadius: "8%" }}
                            src={cidadao.profilePic}
                            alt="foto cidadao"
                          /> */}
                          <p className="mt-4">
                            {` ${cidadao.tipoDoc.toUpperCase()} Nº →  ${
                              cidadao.numDoc
                            } `}
                          </p>
                        </Card.Title>
                      </Col>

                      <Col sm="auto">
                        <Form.Group className="mt-3">
                          <Form.Label>
                            <legend>Local de destino</legend>
                          </Form.Label>
                          <Form.Select
                            name="local"
                            defaultValue={form.local}
                            onChange={handleChange}
                            autoFocus
                          >
                            <option>Selecione Destino</option>
                            {listSetores.map((setor) => {
                              return (
                                <option key={setor.label} value={setor.label}>
                                  {setor.label}
                                </option>
                              );
                            })}
                          </Form.Select>
                        </Form.Group>
                        {/* </Col>
                      <Col> */}
                        <Form.Group className="mb-3">
                          <Form.Label>
                            <legend>Serviço público</legend>
                          </Form.Label>
                          <Form.Select
                            name="servicoPublico"
                            defaultValue={form.servicoPublico}
                            onChange={handleChange}
                          >
                            <option>Selecione Serviço</option>
                            {services.map((service) => {
                              return (
                                <option
                                  key={service.details}
                                  value={service.details}
                                >
                                  {service.details}
                                </option>
                              );
                            })}
                          </Form.Select>
                        </Form.Group>
                        {/* </Col>
                      <Col> */}
                        <Form.Group className="mb-3">
                          <Form.Label htmlFor="obs">
                            <legend>Observação</legend>
                          </Form.Label>
                          <Form.Select
                            id="obs"
                            name="obs"
                            onChange={handleChange}
                            defaultValue={form.obs}
                          >
                            <option>Selecione Motivo</option>
                            {listMotivos.map((obs) => {
                              return (
                                <option key={obs.label} value={obs.label}>
                                  {obs.label}
                                </option>
                              );
                            })}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Form>
                </Card.Body>

                <Card.Footer className="d-flex justify-content-around">
                  <Button
                    variant="success"
                    type="submit"
                    onClick={(e) => handleEntrance(e)}
                  >
                    Salvar
                  </Button>
                  <Link to={"/tabela"}>
                    <Button variant="secondary" type="submit">
                      Cancelar
                    </Button>
                  </Link>
                </Card.Footer>
              </Card>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
