import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import ErrorPage from "./pages/ErrorPage";
import { AuthContextComponent } from "./contexts/authContext";
import ProtectRoute from "./components/ProtectRoute";
import NavBar from "./components/NavBar";
import NotificationPage from "./pages/NotificationPage";
import TabelaCidadao from "./pages/TabelaCidadao";
import FormCadastroPessoa from "./pages/FormCadatroPessoa";
import HomeLoginPage from "./pages/HomeLoginPage";

function App() {
  return (
    <div className="App">
      <AuthContextComponent>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomeLoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          //Essas rotas está aqui desprotegidas, para editar
          <Route path="/tabela" element={<TabelaCidadao />} />
          <Route path="/novocidadao" element={<FormCadastroPessoa />} />
          <Route
            path="/tabela"
            element={<ProtectRoute Component={TabelaCidadao} />}
          />
          <Route
            path="/novocidadao"
            element={<ProtectRoute Component={FormCadastroPessoa} />}
          />
          <Route
            path="/notificacoes"
            element={<ProtectRoute Component={NotificationPage} />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AuthContextComponent>
    </div>
  );
}

export default App;
