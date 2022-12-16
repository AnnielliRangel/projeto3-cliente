import {
  Button,
  Card,
  Row,
  Col,
  Table,
  Container,
  Spinner,
} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import api from "../api/api";

import NavBar from "../components/NavBar";
// import toast from "react-hot-toast";

function AdminPage() {
  const navigate = useNavigate();
  const { idUser } = useParams();

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

  async function handleDeleteUser() {
    try {
      await api.delete(`/user/delete/${idUser}`);
      return navigate("/admin");
    } catch (error) {
      console.log(error);
      alert("Algo deu errado no delete do user");
    }
  }
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
                  <Table>
                    <thead>
                      <tr>
                        <th className="col-center">Foto</th>
                        <th>Nome</th>
                        <th>Login</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!isLoading &&
                        todosUser.map((user) => {
                          return (
                            <tr style={{ fontSize: "0.8rem" }} key={user._id}>
                              <td>
                                <img
                                  src={user.profilePic}
                                  alt="Foto Usuario"
                                  style={{ width: "50px" }}
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
                              <td>{user.email}</td>
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
                        <Link to={"/taxachegada"}>Taxa média de chegada</Link>
                      </th>
                      <th>
                        <Button>Salvar</Button>
                      </th>
                    </tr>
                    <tr>
                      <th>
                        <Link to={"/taxaatendimento"}>
                          Taxa média de atendimento
                        </Link>
                      </th>
                      <th>
                        <Button>Salvar</Button>
                      </th>
                    </tr>

                    <tr>
                      <th>
                        <Link to={"/numsis"}>
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
                        <Link to={"/numfila"}>
                          Número médio de pessoas na fila de espera
                        </Link>
                      </th>
                      <th>
                        <Button>Salvar</Button>
                      </th>
                    </tr>
                    <tr>
                      <th>
                        <Link to={"/tempopredio"}>Tempo médio no prédio</Link>
                      </th>
                      <th>
                        <Button>Salvar</Button>
                      </th>
                    </tr>
                    <tr>
                      <th>
                        {" "}
                        <Link to={"/tempofila"}>
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
