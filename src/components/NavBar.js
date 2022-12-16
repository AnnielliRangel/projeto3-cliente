import { Col, Container, Nav, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import {
  ShieldLockFill,
  PersonPlusFill,
  Hammer,
  DoorOpenFill,
  HouseDoorFill,
  FilePersonFill,
  UnlockFill,
} from "react-bootstrap-icons";

function NavBar() {
  //const { loggedInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { setLoggedInUser } = useContext(AuthContext);
  const [user, setUser] = useState("")

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
        navigate("/admin");
        break;
      case "link-6":
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

  useEffect(() => {
    async function fetchUser() {
      try {
        const userLogged = localStorage.getItem("loggedInUser");
        const user = JSON.parse(userLogged);
        setUser(user.user.role);

        //console.log(userRole)
      } catch (error) {
        console.log(error)
      }
    }

    fetchUser();
  }, [])

  return (
    <Nav
      defaultActiveKey="/home"
      className="menu-bar flex-lg-column"
      onSelect={handleSelect}
    >
      <Container className="brand-nav">
        <Row>
          <Col className="logo" sm='auto'>
            <ShieldLockFill color="royalblue" size={50}/>
          </Col>
          <Col sm='auto'>
            <h3 className="brand-title">Gate Control</h3>
          </Col>
        </Row>
      </Container>

      <Container className="menu-item">
        <Row className="nav-item">
            <Col lg={2} className="menu-ico">
              <HouseDoorFill size={30} />
            </Col>
            <Col lg={10} className="menu-text">
              <Nav.Link className="text-item" eventKey="link-1">
                Home
              </Nav.Link>
            </Col>
        </Row>
      </Container>

      <Container className="menu-item">
        <Row className="nav-item">
            <Col lg={2} className="menu-ico">
              <PersonPlusFill size={30} />
            </Col>
            <Col lg={10} className="menu-text">
              <Nav.Link className="text-item" eventKey="link-2">
                Cadastrar Pessoas
              </Nav.Link>
            </Col>
        </Row>
      </Container>

      <Container className="menu-item">
        <Row className="nav-item">
            <Col lg={2} className="menu-ico">
              <Hammer size={30} />
            </Col>
            <Col lg={10} className="menu-text">
              <Nav.Link className="text-item" eventKey="link-3">
                Cadastrar Serviços
              </Nav.Link>
            </Col>
        </Row>
      </Container>

      <Container className="menu-item">
        <Row className="nav-item">
            <Col lg={2} className="menu-ico">
              <FilePersonFill size={30} />
            </Col>
            <Col lg={10} className="menu-text">
              <Nav.Link className="text-item" eventKey="link-4">
                Ver meu perfil
              </Nav.Link>
            </Col>
        </Row>
      </Container>

      {user === "ADMIN" ? 
        <Container className="menu-item">
          <Row className="nav-item">
              <Col lg={2} className="menu-ico">
                <UnlockFill size={30} />
              </Col>
              <Col lg={10} className="menu-text">
                <Nav.Link className="text-item" eventKey="link-5">
                  Admin
                </Nav.Link>
              </Col>
          </Row>
        </Container> : ""
      }

      <Container className="menu-item">
        <Row className="nav-item">
            <Col lg={2} className="menu-ico">
              <DoorOpenFill size={30} />
            </Col>
            <Col lg={10} className="menu-text">
              <Nav.Link className="text-item" eventKey="link-6">
                Logout
              </Nav.Link>
            </Col>
        </Row>
      </Container>
    </Nav>
  );
}

export default NavBar;
