import { Col, Container, Nav, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import {
  ShieldLockFill,
  PersonPlusFill,
  Hammer,
  DoorOpenFill,
  HouseDoorFill,
  FilePersonFill,
} from "react-bootstrap-icons";

function NavBar() {
  //const { loggedInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { setLoggedInUser } = useContext(AuthContext);

  const handleSelect = (eventKey) => {
    switch (eventKey) {
      case "link-1":
        navigate("/tabela");
        break;
      case "link-2":
        navigate("/novocidadao");
        break;
      case "link-3":
        navigate("/services");
        break;
      case "link-4":
        navigate("/profile");
        break;
      case "link-5":
        signOut();
        break;

      default:
        navigate("/tabela");
    }
  };

  function signOut() {
    //removendo o loggedInUser do localStorage
    localStorage.removeItem("loggedInUser");

    //atualizar o meu context
    setLoggedInUser(null);

    navigate("/");
  }

  return (
    <Nav
      defaultActiveKey="/home"
      className="flex-sm-column"
      onSelect={handleSelect}
    >
      <Container className="brand-nav">
        <Row>
          <Col className="logo" sm='auto'>
            <ShieldLockFill color="royalblue" size={50}/>
          </Col>
          <Col sm='auto'>
            <h3 className="brand-title">GateControl</h3>
          </Col>
        </Row>
      </Container>

      <Container className="nav-item">
        <Row>
            <Col lg='auto' className="menu-ico">
              <HouseDoorFill size={30} />
            </Col>
            <Col lg='auto' className="menu-text">
              <Nav.Link className="text-item" eventKey="link-1">
                Home
              </Nav.Link>
            </Col>
        </Row>
      </Container>

      <Container className="nav-item">
        <Row>
            <Col lg='auto' className="menu-ico">
              <PersonPlusFill size={30} />
            </Col>
            <Col lg='auto' className="menu-text">
              <Nav.Link className="text-item" eventKey="link-2">
                Cadastrar Pessoas
              </Nav.Link>
            </Col>
        </Row>
      </Container>

      <Container className="nav-item">
        <Row>
            <Col lg='auto' className="menu-ico">
              <Hammer size={30} />
            </Col>
            <Col lg='auto' className="menu-text">
              <Nav.Link className="text-item" eventKey="link-3">
                Cadastrar Serviços
              </Nav.Link>
            </Col>
        </Row>
      </Container>

      <Container className="nav-item">
        <Row>
            <Col lg='auto' className="menu-ico">
              <FilePersonFill size={30} />
            </Col>
            <Col lg='auto' className="menu-text">
              <Nav.Link className="text-item" eventKey="link-4">
                Ver meu perfil
              </Nav.Link>
            </Col>
        </Row>
      </Container>

      <Container className="nav-item">
        <Row>
            <Col lg='auto' className="menu-ico">
              <DoorOpenFill size={30} />
            </Col>
            <Col lg='auto' className="menu-text">
              <Nav.Link className="text-item" eventKey="link-5">
                Logout
              </Nav.Link>
            </Col>
        </Row>
      </Container>
    </Nav>
  );
}

export default NavBar;
