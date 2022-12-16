import { Container, Card, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import api from "../api/api";
import NavBar from "../components/NavBar.js";

function ProfilePage() {
  // const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [img, setImg] = useState()

  function handleImage(e) {
    setImg(e.target.files[0]);
  }

  async function handleUpload(e) {
    try {
      const uploadData = new FormData();
      uploadData.append("picture", img);

      const response = await api.post("/uploadImage/upload", uploadData);

      return response.data.url;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function fetchUser() {
      try {
        const userLogged = localStorage.getItem("loggedInUser");
        const user = JSON.parse(userLogged);
        const userId = user.user._id;

        const response = await api.get(`/user/oneUser/${userId}`);
        setUser(response.data);
        //setForm({ name: response.data.name });
      } catch (error) {
        console.log(error);
      }
    }

    fetchUser();
  }, []);

  return (
    <Container className="container-principal" fluid>
      <Row className="justify-content-sm-center">
        <Col sm={2}>
          {<NavBar />}
        </Col>
        <Col sm={10}>
          <Card className="card-user">
            <Card.Img onClick={handleImage} variant="top" src={user.profilePic} />
            <Card.Body>
              <Card.Text>
                <h3>Usuário: {user.name}</h3>
                <h3>E-mail: {user.email}</h3>
                <h3>Tipo de usuário:{" "}{user.role === "USER" ? "Usuário Padrão" : "Administrador"}</h3>
                <h3>Status do usuário: {user.active === true ? "Ativo" : "Desativado"}</h3>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfilePage;
