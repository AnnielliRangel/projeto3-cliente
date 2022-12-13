import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/concierge-32330_960_720.png";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";

function NavBar() {
  const { loggedInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { setLoggedInUser } = useContext(AuthContext);
  function signOut() {
    //removendo o loggedInUser do localStorage
    localStorage.removeItem("loggedInUser");

    //atualizar o meu context
    setLoggedInUser(null);

    navigate("/");
  }

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
            {/* falta fazer: SE é ADMIM
          {loggedInUser && LOGGEDINADMIN(
              <>
                <Link className="nav-link" to="/profile">
                  TODOS OS PERFIS
                </Link>
                {loggedInUser && (
              <>
                <Link className="nav-link" to="/notificacoes">
                  NOTIFICAÇÕES
                </Link>

          
          */}
            {/* Se o usuário estiver logado */}
            {loggedInUser && (
              <>
                <Link className="nav-link" to="/profile">
                  Perfil
                </Link>

                <Link className="nav-link" to="/novocidadao">
                  Cadastra Novo Cidadão
                </Link>

                <Link className="nav-link" to="/tabela">
                  Tabela
                </Link>

                <Link className="nav-link" to="/services">
                  Serviços
                </Link>

                <Link className="nav-link" to="/" onClick={signOut}>
                  Logout
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
