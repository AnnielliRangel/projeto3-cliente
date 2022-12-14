import { Container, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";
import NavBar from "../components/NavBar.js";

function ProfilePage() {
  const navigate = useNavigate();
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

  // async function handleSubmit(e) {
  //   e.preventDefault();

  //   const imgURL = await handleUpload();
  //   //disparo a requisição de cadastro para o meu servidor
  //   try {
  //     await api.post("/user/profile", { ...form, profilePic: imgURL });

  //     navigate("/profile");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

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
    console.log(user);
  }, []);

  return (
    <Container className="container-principal" fluid>
      <Row>
        <Col sm={2}>
          {<NavBar />}
        </Col>
        <Col sm={10}>
          <Card className="card-user">
            <Card.Img onClick={handleImage} variant="top" src={user.profilePic} />
            <Card.Body>
              <Card.Text>Usuário: {user.name}</Card.Text>
              <Card.Text>E-mail: {user.email}</Card.Text>
              <Card.Text>
                Tipo de usuário:{" "}
                {user.role === "USER" ? "Usuário Padrão" : "Administrador"}
              </Card.Text>
              <Card.Text>
                Status do usuário: {user.active === true ? "Ativo" : "Desativado"}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfilePage;
