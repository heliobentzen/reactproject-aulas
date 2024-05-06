import { Box, Button, Flex, Loader, Table } from '@mantine/core';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import {
  Client,
  Park,
  PreventiveDate,
  Status,
  TableHeader
} from '../components';

import { IClient } from '../../../interfaces/table/IClient';
import { ITableHeader } from '../../../interfaces/table/IHeader';

// Create an axios instance
const api = axios.create({
  baseURL: 'http://localhost:8080',
});

interface ITableComponent extends ITableHeader {
  data: IClient[];
}

const token = localStorage.getItem('access_token');
//if (token) {
//  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//}

export function TableClients({ result, title }: ITableComponent) {
  const weightRegular = { fontWeight: 400 };
  const [clients, setClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortName] = useState('name'); 
  const [sortOrder, setSortOrder] = useState('asc'); 
  const [loading, setLoading] = useState(false);

  const clientsPerPage = 3;
  
  const fetchClients = useCallback(async (page: number, size: number) => {
    setLoading(true);
    const response = await api.get('/api/v1/clients', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
      page: currentPage - 1,
      size: clientsPerPage,
      sort: sortName,
      name: searchTerm,
    },
  });
  setLoading(false);
  return response.data;
  
}, [currentPage, searchTerm, sortName]);

useEffect(() => {
  const fetchAndSetClients = async () => {
    const newClients = await fetchClients(currentPage - 1, clientsPerPage);
    setClients(newClients.content);
  };
  
  fetchAndSetClients();
}, []);

useEffect(() => {
  if(currentPage<2) return;
  const fetchAndSetClients = async () => {
    const newClients = await fetchClients(currentPage - 1, clientsPerPage);
    setClients(prevClients => [...prevClients, ...newClients.content]);
  };
  fetchAndSetClients();
}, [currentPage]);

const handleSortChange = (selectedOption) => {
  const sortValue = selectedOption.value;
  setSortOrder(sortValue); 
}

  const handleClick = () => {
    setCurrentPage(prevPage => prevPage + 1); 
  };


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };


  return (
    <Box pb={24} bg="white" style={{ borderRadius: '10px' }} px={24}>
      <TableHeader
        title={title}
        result={result}
        searchPlaceholder="Pesquisar por Nome/CNPJ"
        onSearchChange={handleSearchChange} 
        onSortChange={handleSortChange}
        clients={clients}
        setClients={setClients}
      />
      <Table mt={16}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={weightRegular}>Cliente/CNPJ</Table.Th>
            <Table.Th style={weightRegular}>Próx. preventiva</Table.Th>
            <Table.Th style={weightRegular}>Parque Instalado</Table.Th>            
            <Table.Th pl={40} style={weightRegular}>
              Status
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {clients.map((client: IClient, index) => (
            <Table.Tr key={(client as IClient).cnpj || index}>
              <Client
              name={(client as IClient).name}
              cnpj={'CNPJ: ' + (client as IClient).cnpj}
              city={(client as IClient).city}
              uf={(client as IClient).uf} 
              code={''}              
              />
              <PreventiveDate preventiveDate={(client as IClient).preventiveDate} />
              <Park parks={(client as IClient).parks || []} />    
              <Status
                status={(client as IClient).status}
                isFulfilled={(client as IClient).status === 'Atendido'}
              />
            </Table.Tr>
        ))}
        </Table.Tbody>
      </Table>
      {loading && <Loader />}
      <Flex h={40} mt={10} align={'center'}>
      <Button       
        variant="filled"
        onClick={handleClick}
      >
        Ver mais
      </Button>
    </Flex>

    </Box>
  );
}
