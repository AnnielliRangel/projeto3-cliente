import { Container, Form, Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/api";

function ServicesPage() {
  const [form, setForm] = useState({
    details: "",
    dateFin: Date.now,
    localSetor: "",
    unidade: 0,
  });
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
        localSetor: "",
        unidade: "",
      });
    } catch (error) {
      console.log(error);
      alert("Algo deu errado! Serviço já cadastrado");
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
   <div>
      <Container className="border rounded mt-3">
        <Form>
          <Form.Group className="mt-3">
            <Form.Label>
              <h2>Cadastro de Serviço Público </h2>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Insira o nome do serviço público"
              name="details"
              value={form.details}
              onChange={handleChange}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Data de Validade / Disponibilidade do Serviço</Form.Label>
            <Form.Control
              type="date"
              name="dateFin"
              value={form.dateFin}
              onChange={handleChange}
            />
          </Form.Group>
          <Row>

          <Col>
          <Form.Group className="mt-3">
            <Form.Label>Nome da Unidade Prestadora</Form.Label>
            <Form.Control
              type="text"
              placeholder="Insira o nome do setor / local "
              name="localSetor"
              value={form.localSetor}
              onChange={handleChange}
            />
          </Form.Group>
          </Col>
          {/* <Col>
          <Form.Group className="mt-3">
            <Form.Label>Nº da Unidade</Form.Label>
            <Form.Control
              type="number"
              placeholder={form.unidade}
              name="unidade"
              value={form.unidade}
              onChange={handleChange}
            />
          </Form.Group>
          </Col>
          */}

          </Row>
          <Button variant="primary" className="m-3" onClick={handleSubmit}>
            Salvar
          </Button>
          <Link to={"/tabela"}>
            <Button variant="secondary" type="submit">
              Cancelar
            </Button>
          </Link>
        </Form>
      </Container>

      <Container className="border rounded mt-3">
        <h3 className="mt-3">Gestao dos Serviços</h3>
        {services.map((service) => {
          return (
            <Card key={service._id} className="m-4">
              <Card.Body>
                <h4>{service.details} → Local: {service.localSetor}</h4>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-around">
                {service.discontinued ? (
                  <p>
                    {" "}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={(e) => handleDeleteService(e, service._id)}
                    >
                      Excluir Serviço
                    </Button>
                    → Serviço Descontinuado em:{" "}
                    {service.dateFin.slice(0, 10)}
                  </p>
                ) : (
                  <p>
                    <Button                      
                      variant="success"
                      size="sm"
                      onClick={(e) => handleServiceDiscontinued(e, service._id)}
                    >
                    Cessar Serviço
                    </Button>
                    → Serviço Disponível até:{" "}
                    {service.dateFin.slice(0, 10)}
                  </p>
                )}
              </Card.Footer>
            </Card>
          );
        })}
      </Container>
    </div>
  );
}

export default ServicesPage;
