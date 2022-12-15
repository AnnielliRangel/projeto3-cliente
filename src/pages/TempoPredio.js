import {
  Button,
  Card,
  Row,
  Col,
  Table,
  Container,
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";
import NavBar from "../components/NavBar";

function TempoPredio() {
  const [listService, setlistService] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function fetchService() {
      try {
        const response = await api.get("/service/my-services");
        console.log(setReload);
        setlistService(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }

    fetchService();
  }, [reload]);

  return (
    <Container className="container-principal" fluid>
      <Row>
        <Col sm={2}>{<NavBar />}</Col>
        <Col sm={10}>
          <Row>
            <Card className="card-form">
              <Card.Header>Tempo médio de permanência no Prédio</Card.Header>
              <Card.Body>
                <Card.Text>
                  <Table>
                    <thead>
                      <tr>
                        <th>Setor</th>
                        <th>Serviço</th>

                        <th>Tempo Médio no Prédio</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!isLoading &&
                        listService.map((service) => {
                          return (
                            <tr
                              style={{ fontSize: "0.8rem" }}
                              key={service._id}
                            >
                              <td>{service.localSetor.toUpperCase()}</td>
                              <td>{service.details.toUpperCase()}</td>

                              <td>
                                {" "}
                                Uma pessoa gasta, em média,{" "}
                                {Math.floor(Math.random() * 100) + 1} minutos no
                                local{" "}
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                  {isLoading && (
                    <Spinner animation="border" variant="warning" />
                  )}
                </Card.Text>
              </Card.Body>
              <Row>
                <Link
                  to={"/admin"}
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Button variant="secondary" type="submit">
                    Voltar
                  </Button>
                </Link>
              </Row>
            </Card>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
export default TempoPredio;
