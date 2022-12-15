import { Container, Form, Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/api";
import NavBar from "../components/NavBar";
import setores from "../Setores.json";

function ServicesPage() {
  const [form, setForm] = useState({
    details: "",
    status: "",
    dateFin: Date.now,
    localSetor: "",
    unidade: 0,
  });
  const listSetores = setores;
  const [services, setServices] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function fetchServices() {
      try {
        const response = await api.get("/service/my-services");
        setServices(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchServices();
  }, [reload]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post("/service/create-service", form);
      setReload(!reload);
      setForm({
        details: "",
        dateFin: "",
        status: "",
        localSetor: "",
        unidade: "",
      });
    } catch (error) {
      console.log(error);
      alert("Já cadastrado ou campos * sem preenchimento!! Tente novamente!");
    }
  }

  // async function handleSelect(e, idService) {
  //   await api.put(`/service/edit/${idService}`, { status: e.target.value });
  // }

  async function handleDeleteService(e, idService) {
    await api.delete(`/service/delete/${idService}`);
    setReload(!reload);
  }

  async function handleServiceDiscontinued(e, idService) {
    await api.put(`/service/discontinued/${idService}`);
    setReload(!reload);
  }

  // console.log(services);
  return (
    <Container className="container-principal" fluid>
      <Row>
        <Col sm={2}>
          <NavBar />
        </Col>
        <Col sm={10}>
          <Row>
            <Card className="card-form">
              <Card.Header>Formulário de Cadastro de Serviço </Card.Header>
              <Card.Body>
                <Card.Text>
                  <Form>
                    <Row>
                      <Col>
                        <Form.Group className="mt-3">
                          <Form.Label>Serviço *</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Insira o nome do serviço prestado..."
                            name="details"
                            value={form.details}
                            onChange={handleChange}
                            autoFocus
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mt-3">
                          <Form.Label htmlFor="status">Situação *</Form.Label>
                          <Form.Select
                            id="status"
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                          >
                            <option>Selecione</option>
                            <option value="Disponivel">Aprovado</option>
                            <option value="Em Aprovação">Em Aprovação</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <Form.Group className="mt-3">
                          <Form.Label>Vigência *</Form.Label>
                          <Form.Control
                            type="date"
                            name="dateFin"
                            value={form.dateFin}
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group className="mt-3">
                          <Form.Label htmlFor="localSetor">
                            Unidade Administrativa {"(UA) *"}
                          </Form.Label>
                          <Form.Select
                            id="localSetor"
                            name="localSetor"
                            value={form.localSetor}
                            onChange={handleChange}
                            autofocus
                          >
                            <option>Selecione</option>
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
                    </Row>

                    <Button
                      variant="primary"
                      className="m-3"
                      onClick={handleSubmit}
                    >
                      Salvar
                    </Button>
                    <Link to={"/tabela"}>
                      <Button variant="secondary" type="submit">
                        Cancelar
                      </Button>
                    </Link>
                  </Form>
                </Card.Text>
              </Card.Body>
            </Card>
          </Row>
          <Row>
            <Card className="card-form">
              <Card.Header>Formulário de Gestão de Serviço</Card.Header>
              <Card.Body>
                <Card.Text>
                  <Form>
                    <Row className="justify-content-md-center">
                      <Col>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            {" Serviço ⟷ Unidade Administrativa / Setor"}
                          </Form.Label>

                          {services.map((service) => {
                            return (
                              <Card key={service._id} className="m-4">
                                <Card.Body>
                                  <h4>{`|→  ${service.details} | (UA): ${service.localSetor}`}</h4>
                                </Card.Body>
                                <Card.Footer className="d-flex justify-content-around">
                                  {service.discontinued ? (
                                    <p>
                                      <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={(e) =>
                                          handleDeleteService(e, service._id)
                                        }
                                      >
                                        Excluir Serviço
                                      </Button>
                                      {`→ Serviço Descontinuado em: ${service.dateFin.slice(
                                        0,
                                        10
                                      )}`}
                                    </p>
                                  ) : (
                                    <p>
                                      <Button
                                        variant="success"
                                        size="sm"
                                        onClick={(e) =>
                                          handleServiceDiscontinued(
                                            e,
                                            service._id
                                          )
                                        }
                                      >
                                        Cessar Serviço
                                      </Button>
                                      {`→ Serviço Disponível até: ${service.dateFin.slice(
                                        0,
                                        10
                                      )}`}
                                    </p>
                                  )}
                                </Card.Footer>
                              </Card>
                            );
                          })}
                        </Form.Group>
                      </Col>
                    </Row>
                  </Form>
                </Card.Text>
              </Card.Body>
            </Card>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default ServicesPage;
