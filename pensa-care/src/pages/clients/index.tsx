import { Box, Flex } from '@mantine/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../../components/header';
import { TableClients } from '../../components/tables';

const token = localStorage.getItem('access_token');

// Create an axios instance
const api = axios.create({
  baseURL: 'http://localhost:8080',
});

export function ClientsPage() {
  const [data, setData] = useState([]); 
  const [clients, setClients] = useState([]);
  const [totalElements, setTotalElements] = useState(0);
  //const [currentPage, setCurrentPage] = useState(1);
  //const [searchTerm, setSearchTerm] = useState('');
  const [sortName] = useState('name'); 

  useEffect(() => {

  //const clientsPerPage = 15;
  
  const fetchClients = async () => {
    /*const result = await api.get('/api/v1/clients', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });*/
    setData(result.data);
    setTotalElements(result.data.total_elements);

  };

  fetchClients();
  }, []);


  return (
    <Box mx={24}>
      <Header title="Clientes" />
      <Flex direction="column" gap={24}>
        <TableClients
          title="Todos os seus clientes"
          result={totalElements} 
          data={data} 
          searchPlaceholder={''}       
          clients={clients}
          setClients={setClients}
        />
      </Flex>
    </Box>
  );
}