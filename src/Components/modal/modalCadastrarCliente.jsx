import React, { useState } from 'react';
import axios from 'axios';
import "../../static/css/ModalCadastrarCliente.css";

const ModalCadastrarCliente = ({ closeModal, onClienteCadastrado }) => {
  const [cliente, setCliente] = useState({
    nome: '',
    cpf: '',
    celular: '',
    email: ''
  });

  const [cpfDuplicado, setCpfDuplicado] = useState(false); // Estado para controlar se o CPF está duplicado

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCliente({ ...cliente, [name]: value });
    // Resetar a mensagem de CPF duplicado ao editar o campo CPF
    if (name === 'cpf') {
      setCpfDuplicado(false);
    }
  };

  const handleCadastrarCliente = async () => {
    try {
      const response = await axios.post('http://localhost:8080/clientes', cliente);
      onClienteCadastrado(response.data);
      closeModal();
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data === "CPF já cadastrado") {
        setCpfDuplicado(true); // Define o estado para indicar que o CPF está duplicado
      } else {
        console.error('Erro ao cadastrar cliente:', error);
      }
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <header className="modal-header">
          <h2>Cadastrar cliente</h2>
          <span onClick={closeModal} className="modal-close" id="modalClose">&#10006;</span>
        </header>
        <form className="modal-form">
          <div className="mensage-erro">
            {cpfDuplicado && <p className="error-message">CPF já cadastrado</p>}
          </div>
          <div id="form-group">
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              className="modal-field"
              id="nome"
              name="nome"
              onChange={handleChange}
              placeholder="Nome"
              required
            />
          </div>
          <div id="form-group">
            <label htmlFor="cpf">CPF:</label>
            <input
              type="text"
              maxLength={11}
              inputMode="numeric"
              pattern="[0-9]*"
              className="modal-field"
              id="cpf"
              name="cpf"
              onChange={handleChange}
              placeholder="CPF"
              required
            />
          </div>
          <div id="form-group">
            <label htmlFor="celular">Celular:</label>
            <input
              type="text"
              maxLength={11}
              inputMode="numeric"
              className="modal-field"
              id="celular"
              name="celular"
              onChange={handleChange}
              placeholder="Celular"
              required
            />
          </div>
          <div id="form-group">
            <label htmlFor="email">E-mail:</label>
            <input
              type="email"
              className="modal-field"
              id="email"
              name="email"
              onChange={handleChange}
              placeholder="E-mail"
              required
            />
          </div>
        </form>
        <footer className="modal-footer">
          <button type="submit" className="button blue" id="btnSalvar" onClick={handleCadastrarCliente}>
            Salvar
          </button>
          <button className="button Cancelar" id="btnCancelar" onClick={closeModal}>
            Cancelar
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ModalCadastrarCliente;
