// Records.jsx
import React from 'react';
import axios from 'axios';
import "../../static/css/Records.css";

const Records = ({ cliente, onClienteRemovido }) => {
  const handleDeleteClick = async () => {
    try {
      await axios.delete(`http://localhost:8080/cliente/${cliente.cpf}`);
      onClienteRemovido(cliente.cpf);
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
    }
  };


  return (
    <tr key={cliente.cpf}>
      <td>{cliente.cpf}</td>
      <td>{cliente.nome}</td>
      <td>{cliente.celular}</td>
      <td>{cliente.email}</td>
      <td className="action-cell" onClick={(e) => e.stopPropagation()}>
        <button
          title="Excluir"
          type="button"
          className="button red"
          style={{ fontSize: '20px' }}
          onClick={handleDeleteClick}
        >
          <i className="bi bi-trash"></i>
        </button>
      </td>
    </tr>
  );
};

export default Records;
