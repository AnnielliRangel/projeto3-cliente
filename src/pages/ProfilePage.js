import { Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";

function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [form, setForm] = useState({
    name: "",
  });
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
        const response = await api.get("/user/oneUser/");
        setUser(response.data);
        setForm({ name: response.data.name });
      } catch (error) {
        console.log(error);
      }
    }

    fetchUser();
  }, []);

  return (

    <Card className="card-form">
      <Container fluid>
        <Card.Header>Perfil do usuário</Card.Header>
        <Card.Body>
          <img src="{user.profilePic}"/>
        </Card.Body>
      </Container>
    </Card>
  );
}

export default ProfilePage;
