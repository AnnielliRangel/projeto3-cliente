import NavBar from "../components/NavBar";

function AdminPage() {
  return (
    <div>
      {<NavBar />}
      Informações do ADMIN
      <p>ver todos os perfis. get(/all-users)</p>
      <p>editar e excluir perfil</p>
      <p>ver as notificações</p>
      <p> ver os logs</p>
    </div>
  );
}
export default AdminPage;
