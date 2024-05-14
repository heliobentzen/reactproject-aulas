import { Box, Flex } from '@mantine/core';
import axios from 'axios';
import { useState } from 'react';
import { Header } from '../../components/header';
import { TableClients } from '../../components/tables';

const token = localStorage.getItem('access_token');

// Create an axios instance
const api = axios.create({
  baseURL: 'http://localhost:8080',
});

export function ClientsPage() {
  const [data, setData] = useState([]); 

  
  return (
    <Box mx={24}>
      <Header title="Clientes" />
      <Flex direction="column" gap={24}>
        <TableClients
          title="Todos os seus clientes"
          data={data}
          searchPlaceholder={''}
        />
      </Flex>
    </Box>
  );
}