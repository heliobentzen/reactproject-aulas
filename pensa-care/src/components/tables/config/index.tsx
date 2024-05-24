import { Box, Table, Flex, Button, Modal, Title } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import { Footer, TableHeader } from '../components';
import { useDisclosure } from '@mantine/hooks';

import { ITableHeader } from '../../../interfaces/table/IHeader';
import { IUser } from '../../../interfaces/table/IUser';
import { Signup } from '../../forms';
import ApiService from '../../../services/ApiService';

interface ITableComponent extends ITableHeader {
  data: IUser[];
}

const api = new ApiService('');

export function TableConfig({ title }: ITableComponent) {
  const [opened, { open, close }] = useDisclosure(false);

  const weightRegular = { fontWeight: 400 };
  const [user, setUser] = useState<any>([]);
  const [filteredUser, setFilteredUser] = useState<any>([]);
  const [totalElements, setTotalElements] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const isRefInicial = useRef(true);
  const isRefVerMais = useRef(false);
  const [limpar, setLimpar] = useState(false);

  const usersPerPage = 2;
  const fetchUsers = async () => {
    const response = await api.get(`/api/v1/users?page=${currentPage}&size=${usersPerPage}`);
    setTotalElements(response.data.total_elements);
    return response.data;
  };

  useEffect(() => {
    if (isRefInicial.current) {
        const fetchAndSetUsers = async () => {
        const data = await fetchUsers();
        setUser(data.content);
        setFilteredUser(data.content);
      };
      fetchAndSetUsers();
      isRefInicial.current = false;
    }
  }, []);

  useEffect(() => {
    if (isRefVerMais.current) {
      const fetchAndSetUsers = async () => {
        const newUsers = await fetchUsers();
        const todos = [...user, ...newUsers.content]
        setFilteredUser(todos);
        setUser(todos);
      };
      fetchAndSetUsers(); 
      isRefVerMais.current = false;
      setLimpar(false);
    }
  }, [currentPage]);

  const handleClick = () => {
    isRefVerMais.current = true;
    setLimpar(true);
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
        result={totalElements}
        searchPlaceholder="Pesquisar por Vendedor"
        onHandleTableHeaderChange={handleTableHeaderChange}
        limpar={limpar}
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
      <Footer color={""} radius={""} onHandleClick={handleClick} />
    </Box>
  );
}
