import {
  Button,
  Card,
  Row,
  Col,
  Table,
  Container,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import api from "../api/api";

import NavBar from "../components/NavBar";
// import toast from "react-hot-toast";

function AdminPage() {
  const navigate = useNavigate();

  const { setLoggedInUser } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [todosUser, setTodosUser] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);
  console.table(user, setReload);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get("/user/all-users");
        console.log(response.data);

        setTodosUser(response.data);

        console.log(setTodosUser);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    }

    fetchUser();
  }, [reload]);

  async function handleDeleteUser() {
    try {
      await api.delete("/user/delete");
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
                        <th>Atividades</th>
                        <th>Excluir</th>
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
                              <td>{user.name.toUpperCase()}</td>
                              <td>{user.email}</td>
                              <td>
                                <Button variant="warning">Registros</Button>
                              </td>
                              <td>
                                <Button
                                  variant="danger"
                                  onClick={handleDeleteUser}
                                >
                                  Excluir perfil
                                </Button>
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
                      <th>Taxa média de chegada</th>
                      <th>
                        <Button>Salvar</Button>
                      </th>
                    </tr>
                    <tr>
                      <th>Taxa média de atendimento</th>
                      <th>
                        <Button>Salvar</Button>
                      </th>
                    </tr>
                    <tr>
                      <th>Número médio de pessoas no sistema</th>
                      <th>
                        <Button>Salvar</Button>
                      </th>
                    </tr>
                    <tr>
                      <th>Número médio de pessoas aguardando atendimento</th>
                      <th>
                        <Button>Salvar</Button>
                      </th>
                    </tr>
                    <tr>
                      <th>Número médio de pessoas na fila de espera</th>
                      <th>
                        <Button>Salvar</Button>
                      </th>
                    </tr>
                    <tr>
                      <th>Tempo médio no prédio</th>
                      <th>
                        <Button>Salvar</Button>
                      </th>
                    </tr>
                    <tr>
                      <th>Tempo médio de espera na fila</th>
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
