import { Box, Table } from '@mantine/core';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import {
  Footer,
  TableHeader
} from '../components';

import { ITableHeader } from '../../../interfaces/table/IHeader';
import { IService } from '../../../interfaces/table/IService';
import { IUser } from '../../../interfaces/table/IUser';

interface ITableComponent extends ITableHeader {
  data: IService[];
}

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

const token = localStorage.getItem('access_token');

export function TableConfig({ title }: ITableComponent) {
  const weightRegular = { fontWeight: 400 };
  const [user, setUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sort] = useState('date'); 
  const [sortOrder, setSortOrder] = useState('asc'); 
  
  const userPerPage = 12;
  
  const fetchUsers = useCallback(async () => {
    const response = await api.get('/api/v1/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
      page: currentPage - 1,
      size: userPerPage,
      sort: sort,
      name: searchTerm,
    },
  });
  return response.data;
}, [currentPage, searchTerm, sort]);

useEffect(() => {
  const fetchAndSetUsers = async () => {
    const newUsers = await fetchUsers();
    setUser(newUsers.content);
  };
  fetchAndSetUsers();
}, []);

useEffect(() => {
  if(currentPage<2) return;
  const fetchAndSetUsers = async () => {
    const newUsers = await fetchUsers();
    setUser(prevUsers => [...prevUsers, ...newUsers.content]);
  };
  fetchAndSetUsers();
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
        searchPlaceholder="Pesquisar por Vendedor"
        data={user}
        setData={setUser}
      />
      <Table mt={16}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={weightRegular}>Usuário</Table.Th>
            <Table.Th style={weightRegular}>Cliente(s)</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {user.map((u: IUser) => (
            <Table.Tr key={u.id}>
              <Table.Td>{u.username}</Table.Td>
              <Table.Td>
                {u.clients?.map((client) => (
                  <div key={`${client.name}-${client.uf}`}>
                    {client.name} - {client.uf}
                  </div>
                ))}
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <Footer color={undefined} radius={undefined} onHandleClick={handleClick} />
    </Box>
  );
}
