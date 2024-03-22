// Componente Home.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ModalCadastrarCliente from '../../Components/modal/modalCadastrarCliente';
import Records from '../../Components/Records/Records';
import "../../static/css/Home.css";
import "../../static/css/Table.css";
import "../../static/css/button.css";
import "../../static/css/ModalCadastrarCliente.css";

const Home = () => {
  const [clientes, setClientes] = useState([]);
  const [isModalCadastrarClienteOpen, setIsModalCadastrarClienteOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [clienteNaoEncontrado, setClienteNaoEncontrado] = useState(false);

  useEffect(() => {
    setClienteNaoEncontrado(false); // Reseta o estado ao iniciar uma nova busca
  }, [searchTerm]);

  const fetchClientesPorCPF = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/cliente/buscar?cpf=${searchTerm}`);
      if (response.status === 200) {
        setClientes([response.data]);
      }
    } catch (error) {
      if (error.response.status === 404) {
        window.alert('Nenhum cliente encontrado com o CPF informado.');
        setClienteNaoEncontrado(true);
      } else {
        console.error('Erro ao buscar cliente por CPF:', error);
      }
    }
  };

  const fetchTodosClientes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/cliente');
      setClientes(response.data);
    } catch (error) {
      console.error('Erro ao buscar todos os clientes:', error);
    }
  };

  const handleSearch = () => {
    fetchClientesPorCPF();
  };

  const handleVerTodosClientes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/cliente');
      const clientesRecebidos = response.data;
      
      if (clientesRecebidos.length === 0) {
        alert("Não há clientes cadastrados. Cadastre um cliente. ");
      } else {
        setClientes(clientesRecebidos);
      }
      
      setSearchTerm(''); // Limpa o termo de busca
    } catch (error) {
      console.error('Erro ao buscar todos os clientes:', error);
    }
  };

  const handleClearSearchAndHide = () => {
    setSearchTerm('');
    setClientes([]);
  };

  const handleClienteCadastrado = (cliente) => {
    setClientes([cliente, ...clientes]);
    window.alert('Cliente cadastrado com sucesso.');
  };

  const handleClienteRemovido = (cpf) => {
    setClientes(clientes.filter((cliente) => cliente.cpf !== cpf));
    window.alert('Cliente removido com sucesso.');
  };

  const openModalCadastrarCliente = () => {
    setIsModalCadastrarClienteOpen(true);
  };

  const closeModal = () => {
    setIsModalCadastrarClienteOpen(false);
  };

  return (
    <div className="home">
      <div className="header-controls">
        <div className="header">
          <div className="title">
            <h2>Supermercado Grupo 34</h2>
          </div>
          <div className="navigation">
            <a href="" className="Home">Home</a>
            <a href="" className="Clientes">Clientes</a>
            <a href="" className="Produtos">Produtos</a>
          </div>
        </div>
        <div className="busca">
          <label htmlFor="buscaCliente">Buscar cliente por CPF:</label>
          <input 
            type="text" 
            inputMode="numeric"
            id="buscaCliente"
            maxLength={11}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => {
              const isNumber = /[0-9]/.test(e.key);
              if (!isNumber) {
                e.preventDefault();
              }
            }}
          />
          <button className="pesquisarCliente" onClick={handleSearch}>
            Pesquisar
          </button>
          <button className="limparPesquisa" onClick={handleClearSearchAndHide}>
            Limpar pesquisa
          </button>
          <button className="verTodosClientes" onClick={handleVerTodosClientes}>
            Ver todos os clientes
          </button>
          
          <button className="cadastrarCliente" onClick={openModalCadastrarCliente}>
            Cadastrar cliente
          </button>
        </div>
        {clienteNaoEncontrado && (
          null // Removendo a mensagem aqui, pois será exibida pelo alerta
        )}
      </div>
      <main>
        <div className="table">
          <table className="records">
            <thead>
              <tr className='header-line'>
                <th>Nome</th>
                <th>CPF</th>
                <th>Celular</th>
                <th>E-mail</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <Records
                  key={cliente.cpf}
                  cliente={cliente}
                  onClienteRemovido={handleClienteRemovido} // Passa a função como propriedade
                />
              ))}
            </tbody>
          </table>
        </div>
      </main>
      {isModalCadastrarClienteOpen && (
        <div className="modal">
          <ModalCadastrarCliente
            closeModal={closeModal}
            onClienteCadastrado={handleClienteCadastrado}
          />
        </div>
      )}
      <footer>
        Desenvolvido pelo Grupo 34.
      </footer>
    </div>
  );
};

export default Home;
