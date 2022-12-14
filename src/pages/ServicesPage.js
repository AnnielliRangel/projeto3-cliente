import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/api";
import NavBar from "../components/NavBar";

function ServicesPage() {
  const [form, setForm] = useState({
    details: "",
    dateFin: "",
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
      });
    } catch (error) {
      console.log(error);
      alert("Algo deu errado na criação do serviço");
    }
  }

  async function handleSelect(e, idService) {
    await api.put(`/service/edit/${idService}`, { status: e.target.value });
  }

  async function handleDeleteService(e, idService) {
    await api.delete(`/service/delete/${idService}`);
    setReload(!reload);
  }

  async function handleServiceComplete(e, idService) {
    await api.put(`/service/complete/${idService}`);
    setReload(!reload);
  }

  return (
    <Container fluid>
      <Row>
        <Col sm={2}>
          <NavBar/>
        </Col>
        <Col sm={10}>
          <Container>
            <Form>
              <Form.Group className="mt-3">
                <Form.Label><h2>Cadastro de Serviço Público </h2></Form.Label>
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
                <Form.Label>Data da Disponibildade / Descontinuidade</Form.Label>
                <Form.Control
                  type="date"
                  name="dateFin"
                  value={form.dateFin}
                  onChange={handleChange}
                />
              </Form.Group>
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

          <Container>
            <h3 className="mt-3">Lista de serviços públicos</h3>
            {services.map((service) => {
              return (
                <Card key={service._id} className="m-4">
                  <Card.Body>
                    <h4>{service.details}</h4>

                    {!service.complete && (
                      <Form.Select
                        defaultValue={form.status}
                        onChange={(e) => handleSelect(e, service._id)}
                      >
                        <option value="Disponivel">Disponível</option>
                        <option value="Descontinuado">Descontinuado</option>
                        <option value="Suspenso">Suspenso</option>
                        <option value="Em Aprovação">Em Aprovação</option>
                        
                      </Form.Select>
                    )}
                  </Card.Body>
                  <Card.Footer className="d-flex justify-content-around">
                    {service.complete ? (
                      <p>Serviço Indisponível desde: {service.dateFin.slice(0, 10)}</p>
                    ) : (
                      <p>Disponível Somente Até: {service.dateFin.slice(0, 10)}</p>
                    )}

                    <Button
                      variant="danger"
                      size="sm"
                      onClick={(e) => handleDeleteService(e, service._id)}
                    >
                      Excluir Serviço
                    </Button>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={(e) => handleServiceComplete(e, service._id)}
                    >
                      Descontinuar Serviço
                    </Button>
                  
                  </Card.Footer>
                </Card>
              );
            })}
          </Container>

        </Col>
      </Row>
    </Container>
  );
}

export default ServicesPage;
