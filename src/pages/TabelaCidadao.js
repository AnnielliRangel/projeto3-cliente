import { useEffect, useState } from 'react';
import {
  Button,
  Table,
  Spinner,
  Form,
  InputGroup,
  Container,
  Row,
  Col,
  Card,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar.js';
//
import toast from 'react-hot-toast';
//
// ? import { AuthContext } from '../contexts/authContext';
// no lugar do axios:
import api from '../api/api';
//! no app.js front
/* 
<Route
            path="/tabelaCidadao"
            element={<ProtectRoute Component={TabelaCidadao} />}
          />
           */
//
function TabelaCidadao() {
  //
  // ? botão logout? -> set loggedInUser... func signOut + button
  //
  const [listaGeral, setListaGeral] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [search, setSearch] = useState('');
  const [filtraNoLocal, setFiltraNoLocal] = useState(false);
  // endereço da nossa coleção

  // ! var collectionAdress = 'https://ironrest.cyclic.app/AcessCidadao/';

  // var collectionAdress = 'http://localhost:8080/cidadao/all-cidadaos/';

  // buscando a lista de cidadaos - GET
  useEffect(() => {
    async function getListaCidadaos() {
      const response = await api.get('/cidadao/all-cidadaos/');
      //console.log(response.data);

      // ! atenção, se quebrar, retirar o sort!!
      const clone = [...response.data];
      await clone.sort((a, b) => {
        return a.updatedAt - b.updatedAt;
      });
      await setListaGeral(
        clone.sort((a, b) => {
          return b.noLocal - a.noLocal;
        })
      );

      // ! sort nao funciona!
      /* 
      function teste(a, b) {
        return a.acessos[0].protocolo - b.acessos[0].protocolo > 0 ? 1 : 0;
      }
      setListaGeral(response.data.sort(teste)); */

      setIsLoading(false);
    }

    getListaCidadaos();
  }, [reload]);
  //

  //horas
  function dataHora() {
    let agora = new Date();
    let hora =
      agora.getDate() +
      '/' +
      (1 + Number.parseInt(agora.getMonth())).toString() +
      '/' +
      agora.getFullYear() +
      ' ' +
      agora.getHours() +
      'h' +
      agora.getMinutes() +
      'm';

    return hora;
  }
  // Botão registrar saida - handle
  async function handleSaida(cidadao) {
    //
    //console.log(cidadao, 'cidadao a ser apagado');
    //e.preventDefault();
    try {
      //clonando o form para que possamos fazer as alterações necessárias

      //cidadao.acessos[0];
      //let clone = { ...cidadao }; //array da saida sempre no acessos[0] , na criação é sempre usado o unshift()
      //delete clone._id;
      // se pessoa esta saindo anotar que não está mais no local
      //clone.noLocal = false;
      //clone.acessos[0].saida = dataHora();
      //console.log(clone, 'clone da saida');
      //! teste
      const clone2 = { saida: dataHora() };
      //
      // ! end anterior: https://ironrest.cyclic.app/AcessCidadao/
      await api.put(`/registro/status/${cidadao._id}`, clone2);
      let mensagem = 'Atualizando Status...';
      //console.log("'Atualizando Status...'");
      if (cidadao.status === 'aguardando') {
        mensagem = `iniciando atendimento prot ${cidadao.acessos[0].protocolo}`;
      }
      if (cidadao.status === 'atendimento') {
        mensagem = `finalizando prot ${cidadao.acessos[0].protocolo} / saida`;
      }
      toast.success(mensagem);
      setReload(!reload);
    } catch (error) {
      console.log(error);
      //! toast.error('Algo deu errado. Tente novamente.');
    }
    //
  }

  // search bar
  function handleChange(e) {
    setSearch(e.target.value);
  }

  // filtrando o map com o search
  function filtrar(cidadao, search) {
    //console.log(cidadao, search, 'variaveis do search');
    return (
      cidadao.nome.toLowerCase().includes(search.toLowerCase()) ||
      cidadao.numDoc
        .toLowerCase()
        .replaceAll('-', '')
        .replaceAll('.', '')
        .replaceAll('/', '')
        .includes(
          search
            .toLowerCase()
            .replaceAll('-', '')
            .replaceAll('.', '')
            .replaceAll('/', '')
        )
    );
  }
  //
  //-------------------------------//
  //
  return (
    <Container className="container-principal" fluid>
      <Row>
        <Col sm={2}>{<NavBar />}</Col>
        <Col sm={10}>
          <Container className="container-main">
            <div className="row">
              <div className="col-sm-3">
                {/* <Button
                  variant="primary"
                  size="md"
                  onClick={() => {
                    setReload(!reload);
                    //toast.success('Página atualizada');
                  }}
                >
                  Reload
                </Button> */}
              </div>
              <div className="mt-2 col-sm-3">
                <Form.Group>
                  <Form.Check
                    type="checkbox"
                    label="pendentes"
                    name="active"
                    checked={filtraNoLocal}
                    onChange={() => {
                      setFiltraNoLocal(!filtraNoLocal);
                    }}
                  />
                </Form.Group>
              </div>
              <div className="col-sm-6">
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Procura por Nome, Documento"
                    onChange={handleChange}
                    value={search}
                  />
                </InputGroup>
              </div>
            </div>
          </Container>
          <Card className="card-form">
            <Card.Header>
              Listagem de pessoas cadastradas
            </Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th className="col-center"><h3>FOTO PERFIL</h3></th>
                    <th><h3>NOME COMPLETO</h3></th>
                    {/* <th>Documento</th> */}
                    {/* <th> 👩‍🦯 👨‍🦽 </th> */}
                    <th className="col-center"><h3>INICIAR VISITA</h3></th>
                    <th className="col-center"><h3>STATUS</h3></th>
                    <th><h3>MAIS INFORMAÇÕES</h3></th>
                  </tr>
                </thead>
                <tbody>
                  {!isLoading &&
                    listaGeral
                      .filter((cidadao) => filtrar(cidadao, search))
                      .filter((cidadao) =>
                        filtraNoLocal ? cidadao.noLocal === filtraNoLocal : true
                      )
                      .map((cidadao) => {
                        return (
                          <tr style={{ fontSize: '0.8rem' }} key={cidadao._id}>
                            <td className="col-center">
                              <img
                                src={cidadao.profilePic}
                                alt="foto cidadao"
                                className="profile-pic"
                              />
                            </td>
                            <td>
                              <Link
                                className="link-table"
                                to={`/update-pessoa/${cidadao._id}`}
                              >
                                <p>{cidadao.nome.toUpperCase()}</p>
                                <p>
                                  {cidadao.tipoDoc.toUpperCase()} {cidadao.numDoc}
                                </p>
                              </Link>
                            </td>
                            {/* <td>
                          {cidadao.numDoc} {cidadao.numtipoDoc}
                        </td> */}
                            {/* <td
                          style={
                            cidadao.acessibilidade === 'nenhuma'
                              ? {}
                              : { color: 'red' }
                          }
                        >
                          {cidadao.acessibilidade}
                        </td> */}
                            <td className="col-center">
                              {!cidadao.noLocal ? (
                                <Link to={`/novoacesso/${cidadao._id}`}>
                                  <Button variant="success">Novo Registro</Button>
                                </Link>
                              ) : (
                                <p>{cidadao.acessos[0].entrada}</p>
                              )}
                            </td>

                            <td className="col-center">
                              {cidadao.noLocal ? (
                                <Button
                                  variant={
                                    cidadao.status === 'aguardando'
                                      ? 'danger'
                                      : 'warning'
                                  }
                                  size="sm"
                                  onClick={() => {
                                    handleSaida(cidadao);
                                  }}
                                >
                                  {cidadao.status}{' '}
                                  <span className="badge bg-secondary">
                                    {cidadao.acessos[0].protocolo}
                                  </span>
                                </Button>
                              ) : (
                                ''
                              )}
                            </td>

                            <td>
                              {cidadao.noLocal ? <p>{cidadao.acessos[0].local}</p> : ''}{' '}
                              <br />{' '}
                              {cidadao.noLocal
                                ? <p>{`obs: ${cidadao.acessos[0].obs}`}</p>
                                : ''}
                            </td>
                          </tr>
                        );
                      })}
                </tbody>
              </Table>
              {isLoading && <Spinner animation="border" variant="warning" />}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default TabelaCidadao;