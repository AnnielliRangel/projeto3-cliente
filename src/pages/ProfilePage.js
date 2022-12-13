import { Button, Col, Container, Card, Row, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";
import EditUser from "../components/EditUser";

function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [form, setForm] = useState({
    name: "",
  });
  const [reload, setReload] = useState(false);
  const [img, setImg] = useState();
  function handleImage(e) {
    //console.log(e.target.files[0]);
    setImg(e.target.files[0]);
  }
  async function handleUpload(e) {
    try {
      const uploadData = new FormData();
      uploadData.append("picture", img);

      const response = await api.post("/uploadImage/upload", uploadData);

      console.log(uploadData);

      return response.data.url;
    } catch (error) {
      console.log(error);
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();

    const imgURL = await handleUpload();
    //disparo a requisição de cadastro para o meu servidor
    try {
      await api.post("/user/profile", { ...form, profilePic: imgURL });

      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await api.get("/user/profile");
        setUser(response.data);
        setForm({ name: response.data.name });
      } catch (error) {
        console.log(error);
      }
    }

    fetchUser();
  }, [reload]);

  return (
    <div>
      <Container className="mt-5">
        <Row className="align-items-center mb-5">
          <Col>
            <img
              src={user.profilePic}
              alt="profile Pic"
              className="rounded"
              style={{ width: "100px", borderRadius: "50px" }}
            />
            <Form className="w-50" onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Atualizar Foto de Perfil</Form.Label>
                <Form.Control type="file" onChange={handleImage} />
              </Form.Group>
            </Form>
          </Col>
          <Col>
            <Card>
              <h2>{user.name} </h2>
              <p>{user.email}</p>
              <EditUser
                form={form}
                setForm={setForm}
                setReload={setReload}
                reload={reload}
              />
              <Row></Row>
            </Card>
          </Col>

          <Col>
            <Link to="/notificacoes">
              <Button variant="secondary">Notificações</Button>
            </Link>
          </Col>
        </Row>
      </Container>
      <Row>
        <Col style={{ textAlign: "center" }}>
          <Link to={"/tabela"}>
            <Button variant="secondary" type="submit">
              Voltar
            </Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
}

export default ProfilePage;
