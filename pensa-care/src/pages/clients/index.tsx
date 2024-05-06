import { Box, Flex } from '@mantine/core';
import axios from 'axios';
import { Header } from '../../components/header';
import { TableClients } from '../../components/tables';

import { useEffect, useState } from 'react';


// Create an axios instance
const api = axios.create({
  baseURL: 'http://localhost:8080',
});

export function ClientsPage() {
  const [data, setData] = useState([]); // State para armazenar os dados
  const [totalElements, setTotalElements] = useState(0); // State para armazenar total_elements
  useEffect(() => {

  // Função para buscar os dados da API
  const fetchData = async () => {
    const result = await api.get('/api/v1/clients'); // Substitua 'URL_DA_API' pela URL da sua API
    setData(result.data);
    setTotalElements(result.data.total_elements); // Definindo o estado de totalElements

  };

  fetchData();
  }, []); // O array vazio como segundo argumento faz com que o useEffect seja executado apenas uma vez, quando o componente é montado


  return (
    <Box mx={24}>
      <Header title="Clientes" />
      <Flex direction="column" gap={24}>
        <TableClients
          title="Todos os seus clientes"
          result={totalElements} 
          data={data} 
          searchPlaceholder={''}       
        />
      </Flex>
    </Box>
  );
}
