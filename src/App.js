import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import ErrorPage from "./pages/ErrorPage";
import { AuthContextComponent } from "./contexts/authContext";
import ProtectRoute from "./components/ProtectRoute";
import NotificationPage from "./pages/NotificationPage";
import TabelaCidadao from "./pages/TabelaCidadao";
import FormCadastroPessoa from "./pages/FormCadatroPessoa";
import HomeLoginPage from "./pages/HomeLoginPage";
import FormUpdatePessoa from "./pages/FormUpdatePessoa";
import NovoAcesso from "./pages/NovoAcesso";
import ProfilePage from "./pages/ProfilePage";

import ServicesPage from "./pages/ServicesPage";
//
import { Toaster } from "react-hot-toast";
import AdminPage from "./pages/adminPage";
import RelatorioPage from "./pages/RelatorioPage";

function App() {
  return (
    <div className="App">
      <AuthContextComponent>
        <Toaster />
        {/*<NavBar />*/}
        <Routes>
          <Route path="/" element={<HomeLoginPage />} />

          <Route path="/sign-up" element={<SignUpPage />} />

          <Route
            path="/profile"
            element={<ProtectRoute Component={ProfilePage} />}
          />

          <Route
            path="/tabela"
            element={<ProtectRoute Component={TabelaCidadao} />}
          />
          <Route
            path="/relatorio"
            element={<ProtectRoute Component={RelatorioPage} />}
          />

          <Route
            path="/novocidadao"
            element={<ProtectRoute Component={FormCadastroPessoa} />}
          />

          <Route
            path="/novoacesso/:cidadaoID"
            element={<ProtectRoute Component={NovoAcesso} />}
          />

          <Route
            path="/update-pessoa/:userId"
            element={<ProtectRoute Component={FormUpdatePessoa} />}
          />
          <Route
            path="/notificacoes"
            element={<ProtectRoute Component={NotificationPage} />}
          />
          <Route
            path="/services"
            element={<ProtectRoute Component={ServicesPage} />}
          />
          <Route
            path="/admin"
            element={<ProtectRoute Component={AdminPage} />}
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </AuthContextComponent>
    </div>
  );
}

export default App;
