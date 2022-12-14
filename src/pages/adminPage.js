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
// import toast from "react-hot-toast";

function AdminPage() {
  const [todosUser, setTodosUser] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get("/user/all-users");
        console.log(response.data);
        console.log(setReload);
        setTodosUser(response.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }

    fetchUser();
  }, [reload]);

  return (
    <Container className="container-principal" fluid>
      <Row>
        <Col sm={2}>{<NavBar />}</Col>
        <Col sm={10}>
          <Row>
            <Card className="card-form">
              <Card.Header>Controle de Funcionários Autorizados</Card.Header>
              <Card.Body>
                <Card.Text>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th className="col-center"><h3>FOTO</h3></th>
                        <th><h3>NOME</h3></th>
                        <th><h3>LOGIN</h3></th>
                      </tr>
                    </thead>
                    <tbody>
                      {!isLoading &&
                        todosUser.map((user) => {
                          return (
                            <tr style={{ fontSize: "0.8rem" }} key={user._id}>
                              <td className="col-center">
                                <img
                                  src={user.profilePic}
                                  alt="Foto Usuario"
                                  className="profile-pic"
                                />
                              </td>
                              <td>
                                <Link
                                  className="link-table"
                                  to={`/update-user/${user._id}`}
                                >
                                  {user.name.toUpperCase()}{" "}
                                </Link>
                              </td>
                              <td><p>{user.email}</p></td>
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
            </Card>
          </Row>
          <Row>
            <Card className="card-form">
              <Card.Header>Relatórios Gerenciais</Card.Header>
              <Card.Body>
                <Table>
                  <thead>
                    <tr>
                      <th>Consultar</th>
                      <th>Salvar PDF</th>
                    </tr>
                  </thead>
                  <tbody style={{ fontSize: "0.8rem" }}>
                    <tr>
                      <th>
                        <Link
                          to={"/taxachegada"}
                          style={{
                            textDecoration: "none",
                            color: "white",
                          }}
                        >
                          Taxa média de chegada
                        </Link>
                      </th>
                      <th>
                        <Button>Salvar</Button>
                      </th>
                    </tr>
                    <tr>
                      <th>
                        <Link
                          to={"/taxaatendimento"}
                          style={{
                            textDecoration: "none",
                            color: "white",
                          }}
                        >
                          Taxa média de atendimento
                        </Link>
                      </th>
                      <th>
                        <Button>Salvar</Button>
                      </th>
                    </tr>

                    <tr>
                      <th>
                        <Link
                          to={"/numsis"}
                          style={{
                            textDecoration: "none",
                            color: "white",
                          }}
                        >
                          {" "}
                          Número médio de pessoas no sistema
                        </Link>
                      </th>
                      <th>
                        <Button>Salvar</Button>
                      </th>
                    </tr>

                    <tr>
                      <th>
                        <Link
                          to={"/numfila"}
                          style={{
                            textDecoration: "none",
                            color: "white",
                          }}
                        >
                          Número médio de pessoas na fila de espera
                        </Link>
                      </th>
                      <th>
                        <Button>Salvar</Button>
                      </th>
                    </tr>
                    <tr>
                      <th>
                        <Link
                          to={"/tempopredio"}
                          style={{
                            textDecoration: "none",
                            color: "white",
                          }}
                        >
                          Tempo médio no prédio
                        </Link>
                      </th>
                      <th>
                        <Button>Salvar</Button>
                      </th>
                    </tr>
                    <tr>
                      <th>
                        {" "}
                        <Link
                          to={"/tempofila"}
                          style={{
                            textDecoration: "none",
                            color: "white",
                          }}
                        >
                          Tempo médio de espera na fila
                        </Link>
                      </th>
                      <th>
                        <Button>Salvar</Button>
                      </th>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
export default AdminPage;
