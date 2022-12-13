import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import toast from "react-hot-toast";
import setores from "../Setores.json";
import servicos from "../Servicos.json";

// Instead of axios - api.js
import api from '../api/api.js' 

//<Route
//             path="/novoacesso/:userId"
//             element={<ProtectRoute Component={novoAcesso} />}
//           />

export default function NovoAcesso() {
  const listSetores = setores;
  const listServices = servicos;

  //Pegando o userID definido como parametro em <Route> do (registro.routes.js backend)
  const { cidadaoID } = useParams();
  console.log(cidadaoID)

  //Instanciando o useNavigate() na constante navigate
  const navigate = useNavigate();

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
      /* console.log(response.data); */
      setCidadao(response.data);
      setIsLoading(false);
    }
    getCidadao();
  }, [reload, cidadaoID]);

  async function handleEntrance(cidadao) {
    cidadao.preventDefault();
    
    try {
      function dataHora() {
        let agora = new Date();
        let hora = agora.getDate() +
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
      const clone = { ...cidadao };
      delete clone._id;

      clone.noLocal = true;

      const novoAcesso = {
        entrada: dataHora(),
        saida: form.saida,
        servicoPublico: form.servicoPublico,
        local: form.local,
        obs: form.obs,
      };
      clone.acessos.unshift(novoAcesso);
      /*  console.log(clone); */

      await api.put(`/registro/create-registro/${cidadaoID}`, clone);

      toast.success(`Acesso de ${cidadao} registrado com sucesso!`);
      setReload(!reload);
      navigate("/tabela");
    } catch (error) {
      toast.error("Algo deu errado! Tente novamente...");
    }
  }

  return (
    <Container className="my-4">
      <fieldset>
        {!isLoading && (
          <Card className="text-center" bg="light">
            <Card.Header>
              <Card.Title>
                <legend> NOVO ACESSO</legend>
                <h1>⧉{cidadao.nome} </h1>
                <img
                  src={cidadao.profilePic}
                  alt="foto cidadao"
                  style={{ width: "190px" }}
                />
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                <legend>Documento: {cidadao.tipoDoc.toUpperCase()}</legend>
                <legend> Nº. {cidadao.numDoc} Emissor: {cidadao.emissor}</legend>
              </Card.Subtitle>
            </Card.Header>

            <Card.Body>
              <Form>
                <Row>
                  <Col>
                    <Form.Group className="mb-3">
                    <Form.Label>
                        <legend>Local de Destino</legend>
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
                  </Col>
                  <Col>
                  <Form.Group className="mb-3">
                      <Form.Label>
                        <legend>Serviço Público</legend>
                      </Form.Label>
                      <Form.Select
                        name="servicoPublico"
                        defaultValue={form.servicoPublico}
                        onChange={handleChange}
                      >
                        <option>Selecione Serviço</option>
                        {listServices.map((service) => {
                          return (
                            <option key={service.label} value={service.label}>
                              {service.label}
                            </option>
                          );
                        })}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-3">
                      <Form.Label htmlFor="obs">
                        <legend>Observação → motivo</legend>
                      </Form.Label>
                      <Form.Select
                        id="obs"
                        name="obs"
                        onChange={handleChange}
                        defaultValue={form.obs}
                      >
                        <option>
                          <legend>Selecione Motivo</legend>
                        </option>
                        <option value="audiencia">Audiência</option>
                        <option value="Reunião">Reunião</option>
                        <option value="correios">Correio</option>
                        <option value="entrega">Entrega</option>
                        <option value="licitacao">Licitação</option>
                        <option value="conciliacao">Conciliação</option>
                        <option value="almoco">Almoço</option>
                        <option value="trabalho">Trabalho</option>
                        <option value="visita">Visita</option>
                        <option value="outros">Outros</option>
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
                onClick={() => handleEntrance(e, cidadao)}
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
      </fieldset>
    </Container>
  );
}
