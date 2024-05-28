import { Box, Table, Flex, Button, Modal, Title, Text, Stack, Checkbox } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import { Footer, TableHeader } from '../components';
import { useDisclosure } from '@mantine/hooks';
import { ITableHeader } from '../../../interfaces/table/IHeader';
import { IService } from '../../../interfaces/table/IService';
import { IUser } from '../../../interfaces/table/IUser';
import { Signup } from '../../forms';
import ApiService from '../../../services/ApiService';
import { IClient } from '../../../interfaces/table/IClient';

interface ITableComponent extends ITableHeader {
  data: IService[];
}

const api = new ApiService('');

export function TableConfig({ title }: ITableComponent) {
  const [opened, { open, close }] = useDisclosure(false);
  const weightRegular = { fontWeight: 400 };
  const [user, setUser] = useState<any>([]);
  const [client, setClient] = useState<any>([]);
  const [filteredUser, setFilteredUser] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalElements, setTotalElements] = useState(1);
  const [limpar, setLimpar] = useState(false);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [isOpened, setIsOpened] = useState(false);
  const openModal = () => setIsOpened(true);
  const closeModal = () => setIsOpened(false);
  const isRefInicial = useRef(true);
  const isRefInicialClient = useRef(true);
  const isRefVerMais = useRef(false);

  const userPerPage = 12;
  const fetchUser = async () => {
    const response = await api.get(`/api/v1/users?page=${currentPage}&size=${userPerPage}`);
    setTotalElements(response.data.total_elements);
    return response.data;
  };

  useEffect(() => {
    if (isRefInicial.current) {
      const fetchAndSetUser = async () => {
        const data = await fetchUser();
        setUser(data.content);
        setFilteredUser(data.content);
      };
      fetchAndSetUser();
      isRefInicial.current = false;
    }
  }, []);

  useEffect(() => {
    if (isRefVerMais.current) {
      const fetchAndSetUsers = async () => {
        const newUsers = await fetchUser();
        const todos = [...user, ...newUsers.content]
        setFilteredUser(todos);
        setUser(todos);
      };
      fetchAndSetUsers();
      isRefVerMais.current = false;
      setLimpar(false);
    }
  }, [currentPage]);

  useEffect(() => {
    if (isRefInicialClient.current) {
      const fetchAndSetClient = async () => {
        const resultado = await api.get(`/api/v1/clients?page=${0}&size=${10}`);
        setClient(resultado.data.content)
      };
      fetchAndSetClient();
      isRefInicialClient.current = false;
    }
  }, []);

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

  const handleCheckboxChange = (name: string) => {
    setCheckedItems((prevCheckedItems) =>
      prevCheckedItems.includes(name)
        ? prevCheckedItems.filter((item) => item !== name)
        : [...prevCheckedItems, name]
    );
  };

  const vincular = () => {
    const dados = {
      "clients": checkedItems
    }

    const salvar = async () => {
      const response = await api.get('/api/v1/users/me');

      api.post(`/api/v1/users/${response.data.id}/clients`, dados)
        .then(response => {
          console.log('Resposta da API:', response.data);
          setCheckedItems([]);
          closeModal();
          const fetchAndSetUser = async () => {
            const data = await fetchUser();
            setUser(data.content);
            setFilteredUser(data.content);
          };
          fetchAndSetUser();
        })
        .catch(error => {
          console.error('Erro ao vincular:', error);
        });
    };
    salvar();
  }

  return (
    <Box pb={24} bg="white" style={{ borderRadius: '10px' }} px={24}>

      <TableHeader
        title={title}
        searchPlaceholder="Pesquisar por Vendedor"
        limpar={limpar}
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
            <Table.Th style={weightRegular}>UF</Table.Th>
            <Table.Th style={weightRegular}>Macro Segmento</Table.Th>
            <Table.Th style={weightRegular}>Micro Segmento</Table.Th>
            <Table.Th style={weightRegular}>Edição</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {filteredUser.map((u: IUser) => (
            <Table.Tr key={u.id}>
              <Table.Td>
                <Modal opened={isOpened} onClose={closeModal} closeOnClickOutside={false} withCloseButton={false} centered>
                  <Flex p={16} align={'center'} gap={15} bg={'white'}>
                    <Box>
                      <Text size="sm" tt={'uppercase'} c={'#999'}>CONFIGURAÇÕES</Text>
                      <Text tt={'uppercase'} fw={'bold'} size="md">VINCULAR VENDEDOR(A) A CLIENTES</Text>
                    </Box>
                  </Flex>
                  <Flex bg="rgba(0, 0, 0, .3)" gap={10} pt={15} mb={40} pb={15} direction={'column'} align={'center'}>
                    <Box >
                      <Stack>
                        {client.map((cli: IClient) => (
                          <Checkbox
                            key={`${cli.code}-${cli.name}`}
                            label={cli.name}
                            checked={checkedItems.includes(cli.cnpj)}
                            onChange={() => handleCheckboxChange(cli.cnpj)}
                          />
                        ))}
                      </Stack>
                    </Box>
                  </Flex>

                  <Flex gap={10} pb={12} direction={'column'} align={'center'}>
                    <Button color="#0855A3" onClick={vincular}>Confirmar</Button>
                    <Button color="#0855A3" variant="transparent" onClick={closeModal}>Descartar alteração</Button>
                  </Flex>
                </Modal>

                <Button variant="subtle" size="md" c="#030229" onClick={openModal}>{u.username}</Button>
              </Table.Td>

              <Table.Td>
                {u.clients?.map((client) => (
                  <div key={`${client.name}-${client.uf}`}>
                    {client.name}
                  </div>
                ))}
              </Table.Td>

              <Table.Td>
                {u.clients?.map((client) => (
                  <div key={`${client.name}-${client.uf}`}>
                    {client.uf}
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
