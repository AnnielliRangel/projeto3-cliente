import { useEffect, useState } from 'react';
import { Button, Table, Spinner, Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
//
// ! import toast from 'react-hot-toast';
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
  const [listaGeral, setListaGeral] = useState({});
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
      clone.sort((a, b) => {
        return a.updatedAt - b.updatedAt;
      });
      setListaGeral(
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
  }, [reload, listaGeral]);
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

      //console.log("'Atualizando Status...'");
      //! toast.success('Atualizando Status...');
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
      (cidadao.noLocal &&
        cidadao.acessos[0].local
          .toLowerCase()
          .includes(search.toLowerCase())) ||
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
    <div className="mx-2">
      <div className="container my-3 max-width">
        <div className="row">
          <div className="col-sm-3">
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                setReload(!reload);
                //toast.success('Página atualizada');
              }}
            >
              Reload
            </Button>
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
                placeholder="Procura por Nome, Local, Documento"
                onChange={handleChange}
                value={search}
              />
            </InputGroup>
          </div>
        </div>
      </div>
      <div className="mx-0">
        <Table striped bordered hover responsive size="sm">
          <thead>
            <tr>
              <th>Foto</th>
              <th>Nome</th>
              <th>Documento</th>
              <th> 👩‍🦯 👨‍🦽 </th>
              <th>acesso</th>
              <th>status</th>
              <th>info</th>
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
                      <td>
                        <img
                          src={cidadao.profilePic}
                          alt="foto cidadao"
                          style={{ width: '50px' }}
                        />
                      </td>
                      <td>
                        <Link to={`/usuario/${cidadao._id}`}>
                          {cidadao.nome}
                        </Link>
                      </td>
                      <td>
                        {cidadao.numDoc} {cidadao.numtipoDoc}
                      </td>
                      <td
                        style={
                          cidadao.acessibilidade === 'nenhuma'
                            ? {}
                            : { color: 'red' }
                        }
                      >
                        {cidadao.acessibilidade}
                      </td>
                      <td>
                        {!cidadao.noLocal ? (
                          <Link to={`/NovoAcesso/${cidadao._id}`}>
                            <Button variant="success" size="sm">
                              Novo Registro
                            </Button>
                          </Link>
                        ) : (
                          cidadao.acessos[0].entrada
                        )}
                      </td>

                      <td>
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
                        {cidadao.noLocal ? cidadao.acessos[0].local : ''} <br />{' '}
                        {cidadao.noLocal
                          ? `obs: ${cidadao.acessos[0].obs}`
                          : ''}
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </Table>
        {isLoading && <Spinner animation="border" variant="warning" />}
      </div>
    </div>
  );
}

export default TabelaCidadao;
