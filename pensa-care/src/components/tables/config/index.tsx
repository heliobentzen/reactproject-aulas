import { Box, Table, Flex, Button, Modal, Title } from '@mantine/core';
import { useCallback, useEffect, useState } from 'react';
import { Footer, TableHeader } from '../components';
import { useDisclosure } from '@mantine/hooks';

import { ITableHeader } from '../../../interfaces/table/IHeader';
import { IService } from '../../../interfaces/table/IService';
import { IUser } from '../../../interfaces/table/IUser';
import { Signup } from '../../forms';
import ApiService from '../../../services/ApiService';

interface ITableComponent extends ITableHeader {
  data: IService[];
}

const api = new ApiService('');

export function TableConfig({ title }: ITableComponent) {
  const [opened, { open, close }] = useDisclosure(false);

  const weightRegular = { fontWeight: 400 };
  const [user, setUser] = useState<any>([]);
  const [filteredUser, setFilteredUser] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sort] = useState('date');
  const [totalElements, setTotalElements] = useState(1);

  const userPerPage = 12;
  const fetchUsers = useCallback(async () => {
    setSearchTerm(searchTerm)
    const response = await api.get('/api/v1/users', 
      {
        page: currentPage - 1,
        size: userPerPage,
        sort: sort,
        name: searchTerm,
      },
    );
    setTotalElements(response.data.total_elements);

    return response.data;
  }, [currentPage, searchTerm, sort]);

  useEffect(() => {
    const fetchAndSetUsers = async () => {
      const newUsers = await fetchUsers();
      setUser(newUsers.content);
      setFilteredUser(newUsers.content);
    };
    fetchAndSetUsers();
  }, []);

  useEffect(() => {
    if (currentPage < 2) return;
    const fetchAndSetUsers = async () => {
      const newUsers = await fetchUsers();
      setUser((prevUsers: any) => [...prevUsers, ...newUsers.content]);
    };
    fetchAndSetUsers();
  }, [currentPage]);

  const handleClick = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleTableHeaderChange = (headerChange: any) => {
    const { sortOrder, searchValue } = headerChange;
    const filteredUser = (user || []).filter((user: IUser) => {
      return user.username?.toLowerCase().includes(searchValue?.toLowerCase());
    }) || [];

    const sortFilteredUser = filteredUser.sort((a: IUser, b: IUser) => {
      if (sortOrder === '1') {
        return a.username.localeCompare(b.username);
      } else {
        return b.username.localeCompare(a.username);
      }
    });

    setFilteredUser(sortFilteredUser || []);
  }

  return (
    <Box pb={24} bg="white" style={{ borderRadius: '10px' }} px={24}>

      <TableHeader
        title={title}
        searchPlaceholder="Pesquisar por Vendedor"
        onHandleTableHeaderChange={handleTableHeaderChange}
        result={totalElements}
      />

      <Flex h={40} mt={10} align={'center'} justify={'flex-end'}>
        <Modal opened={opened} onClose={close} closeOnClickOutside={false} centered>
          <Title order={2} mt="0" mb={32}>
            Registro de Usuário
          </Title>
          <Signup isLogin={false} />
        </Modal>
        <Button c="#030229" onClick={open}>Adicionar</Button>

      </Flex>

      <Table mt={16}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={weightRegular}>Usuário</Table.Th>
            <Table.Th style={weightRegular}>Cliente(s)</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {filteredUser.map((u: IUser) => (
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
