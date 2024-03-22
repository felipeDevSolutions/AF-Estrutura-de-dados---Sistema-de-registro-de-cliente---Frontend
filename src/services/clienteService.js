import axios from 'axios';

const buscarClientePorCPF = async (cpf) => {
  try {
    const response = await axios.get(`http://localhost:8080/cliente/buscar?cpf=${cpf}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar cliente:', error);
    return null;
  }
};

export { buscarClientePorCPF };
