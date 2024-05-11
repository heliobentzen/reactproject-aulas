import { Box, Button, Flex, Loader, Table } from '@mantine/core';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import {
  Client,
  Park,
  PreventiveDate,
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
  const [filteredClients, setFilteredClients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortName] = useState('name'); 
  const [sortOrder, setSortOrder] = useState('asc'); 
  const [loading, setLoading] = useState(false);

  const clientsPerPage = 12;
  
  const fetchClients = useCallback(async () => {
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
    const fecthReloadClient = async ()=> {
      const data = await fetchClients()
        setClients(data.content);
        setFilteredClients(data.content);
    }
    fecthReloadClient();
  }, []);
  
  useEffect(() => {
    if(currentPage<2) return;
    const fetchAndSetClients = async () => {
      const newClients = await fetchClients(currentPage - 1, clientsPerPage);
      setClients(prevClients => [...prevClients, ...newClients.content]);
      setFilteredClients(prevClients => [...prevClients, ...newClients.content]);
    };
    fetchAndSetClients();
  }, [currentPage, searchTerm]);
  
  const handleClick = () => {
    setCurrentPage(prevPage => prevPage + 1); 
  };

  const handleTableHeaderChange = (headerChange) => {
    const { sortOrder, searchValue } = headerChange;
    const filteredClients = (clients || []).filter((client: IClient) => {
      return client.name?.toLowerCase().includes(searchValue?.toLowerCase());
    }) || [];
    
    const sortFilteredClients = filteredClients.sort((a: IClient, b: IClient) => {        
      if (sortOrder === '1') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    setFilteredClients(sortFilteredClients || []);
  }

  return (
    <Box pb={24} bg="white" style={{ borderRadius: '10px' }} px={24}>
      <TableHeader
        title={title}
        result="839"
        onHandleTableHeaderChange={handleTableHeaderChange}
        searchPlaceholder="Pesquisar por Nome"
      />
      <Table mt={16}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={weightRegular}>Cliente</Table.Th>
            <Table.Th style={weightRegular}>Próx. preventiva</Table.Th>
            <Table.Th style={weightRegular}>Parque Instalado</Table.Th>            
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {filteredClients.map((client: IClient, index) => (
            <Table.Tr key={(client as IClient).cnpj || index}>
              <Client
                name={(client as IClient).name}
                cnpj={(client as IClient).cnpj}
                city={(client as IClient).city}
                uf={(client as IClient).uf}
              />
              <PreventiveDate preventiveDate={(client as IClient).preventiveDate} />
              <Park parks={(client as IClient).parks || []} />    
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
