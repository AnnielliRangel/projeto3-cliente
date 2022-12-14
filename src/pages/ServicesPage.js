import { Container, Form, Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/api";
import NavBar from "../components/NavBar";

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
    <Container className="container-principal" fluid>
      <Row>
        <Col sm={2}>
          <NavBar/>
        </Col>
        <Col sm={10}>
          <Container>
            <Form>
        
           <Form.Group className="mt-3">
            <Form.Label>Nome do Serviço</Form.Label>
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
            <Form.Label>Validade / Disponibilidade do Serviço</Form.Label>
            <Form.Control
              type="date"
              name="dateFin"
              value={form.dateFin}
              onChange={handleChange}
            />
          
           </Form.Group>
           <Form.Group className="mt-3">
            <Form.Label>Unidade Prestadora</Form.Label>
            <Form.Control
              type="text"
              placeholder="Insira o nome do setor / local "
              name="localSetor"
              value={form.localSetor}
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
   </Col>
   </Row>
   </Container>
  );
}

export default ServicesPage;
