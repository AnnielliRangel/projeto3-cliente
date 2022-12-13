import { Container, Form, Button, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import api from "../api/api";

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

  console.log(services);

  return (
    <div>
      <Container className="border rounded mt-3">
        <Form>
          <Form.Group className="mt-3">
            <Form.Label><h2>Cadastra Serviço Público </h2></Form.Label>
            <Form.Control
              type="text"
              placeholder="Insira o nome do serviço público aqui!"
              name="details"
              value={form.details}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label>Data de Disponibilidade</Form.Label>
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
        </Form>
      </Container>

      <Container className="border rounded mt-3">
        <h3 className="mt-3">Serviços Públicos Disponíveis</h3>
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
                    <option value="disponivel">Disponível</option>
                    <option value="aprovacao">Em Aprovação</option>
                    <option value="descontinuado">Descontinuado</option>
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
    </div>
  );
}

export default ServicesPage;
