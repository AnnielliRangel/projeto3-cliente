import { Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import api from "../api/api";
//import EditUser from "../components/EditUser";

import NavBar from "../components/NavBar";
// import toast from "react-hot-toast";

function AdminPage() {
  const navigate = useNavigate();

  const { setLoggedInUser } = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [form, setForm] = useState({
    name: "",
  });
  const [reload, setReload] = useState(false);
  console.log(user, form, setReload);

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

  function signOut() {
    //removendo o loggedInUser do localStorage
    localStorage.removeItem("loggedInUser");

    //atualizar o meu context
    setLoggedInUser(null);

    navigate("/");
  }

  async function handleDeleteUser() {
    try {
      await api.delete("/user/delete");
      signOut();
    } catch (error) {
      console.log(error);
      alert("Algo deu errado no delete do user");
    }
  }
  return (
    <div>
      {<NavBar />}
      Informações do ADMIN
      <p>ver todos os perfis. get(/all-users)</p>
      <p>editar e excluir perfil</p>
      <p>ver as notificações</p>
      <p> ver os logs</p>
      <Col>
        <Button variant="danger" onClick={handleDeleteUser}>
          Excluir perfil
        </Button>
      </Col>
    </div>
  );
}
export default AdminPage;
