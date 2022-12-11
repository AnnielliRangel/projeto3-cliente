import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/concierge-32330_960_720.png";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

function NavBar() {
  const { loggedInUser } = useContext(AuthContext);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand>
          <img
            alt="atendimento vetor"
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top "
          />{" "}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Se o usuário estiver logado */}
            {loggedInUser && (
              <>
                <Link className="nav-link" to="/profile">
                  Perfil
                </Link>
                <Link className="nav-link" to="/tasks">
                  Minhas Tarefas
                </Link>
                <Link className="nav-link" to="/notificacoes">
                  Notificações
                </Link>
              </>
            )}
            {/* Não está logado */}
            {!loggedInUser && (
              <>
                <Link className="nav-link" to="/">
                  Controle de Atendimento ao Cidadão e acessos ao Serviço
                  Público
                </Link>
                <Link className="nav-link" to="/sign-up">
                  Cadastre-se
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
