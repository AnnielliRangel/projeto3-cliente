import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { Navigate } from "react-router-dom";

function ProtectRoute({ Component }) {
  const { loggedInUser } = useContext(AuthContext);

  console.log(loggedInUser);

  if (loggedInUser) {
    //mostra o componente
    return <Component />;
  } else {
    //navega o usuário pra página de HOME(que faz o login)
    return <Navigate to="/" />;
  }
}

export default ProtectRoute;
