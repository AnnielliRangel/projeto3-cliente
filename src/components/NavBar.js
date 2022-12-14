import { Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/concierge-32330_960_720.png";
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
  const { loggedInUser } = useContext(AuthContext);
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
      <ShieldLockFill color="royalblue" size={50} />
      <h3>GateControl</h3>

      <Nav.Link eventKey="link-1">
        <HouseDoorFill size={25} />
        Home
      </Nav.Link>
      <Nav.Link eventKey="link-2">
        <PersonPlusFill size={25} />
        Cadastrar Pessoa
      </Nav.Link>
      <Nav.Link eventKey="link-3">
        <Hammer size={25} />
        Cadastrar Serviços
      </Nav.Link>
      <Nav.Link eventKey="link-4">
        <FilePersonFill size={25} />
        Ver meu Perfil
      </Nav.Link>
      <Nav.Link eventKey="link-5">
        <DoorOpenFill size={25} />
        Logout
      </Nav.Link>
      {/* <Nav.Link eventKey="disabled" disabled>
        Disabled
      </Nav.Link> */}
    </Nav>
  );
}

export default NavBar;
