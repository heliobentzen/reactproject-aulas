import { Box, Button, Checkbox, Flex, Modal, ScrollArea, Stack, Table, Text, TextInput, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';
import { IClient } from '../../../interfaces/table/IClient';
import { ITableHeader } from '../../../interfaces/table/IHeader';
import { IService } from '../../../interfaces/table/IService';
import { IUser } from '../../../interfaces/table/IUser';
import ApiService from '../../../services/ApiService';
import { Signup } from '../../forms';
import { Footer, TableHeader } from '../components';

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
  const [clean, setClean] = useState(false);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [isOpened, setIsOpened] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IUser | null>(null);
  const openModal = (item: any,  clients: IClient[] | undefined) => {
    if(client != undefined){
      const cnpjs = clients?.map(client => client.cnpj);
      setCheckedItems([]);
      setCheckedItems(cnpjs ?? []);
      setSelectedItem(item);
      setIsOpened(true);
    }
  }
  const closeModal = () => {
    setSelectedItem(null);
    setIsOpened(false);
  }

  const isRefInicial = useRef(true);
  const isRefInicialClient = useRef(true);
  const isRefVerMais = useRef(false);

  const userPerPage = 12;
  const fetchUser = async () => {
    const response = await api.get(`/api/v1/users?page=${currentPage}&size=${userPerPage}`);
    setTotalElements(response.data.total_elements);
    return response.data;
  };

  open

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
      setClean(false);
    }
  }, [currentPage]);

  useEffect(() => {
    if (isRefInicialClient.current) {
      const fetchAndSetClient = async () => {
        const resultado = await api.get(`/api/v1/clients?page=${0}&size=${20}`);
        setClient(resultado.data.content)
      };
      fetchAndSetClient();
      isRefInicialClient.current = false;
    }
  }, []);

  const [search, setSearch] = useState('');
  useEffect(() => {
    const pesquisar = async () => {
      let url: string = '';
      if (search === '') {
        url = `/api/v1/clients?page=${0}&size=${50}`;
      } else {
        url = `/api/v1/clients?page=${0}&size=${50}&query=${search}`;
      }

      try {
        const resultado = await api.get(url);
        setClient(resultado.data.content)
      } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
      }
    };
    pesquisar();
  }, [search]);

  const handleClick = () => {
    isRefVerMais.current = true;
    setClean(true);
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

  const vincular = (id: string | undefined) => {
    if (checkedItems.length != 0) {
      const dados = {
        "clients": checkedItems
      }

      const salvar = async () => {
        //const response = await api.get(`/api/v1/users/${id}`);
        api.post(`/api/v1/users/${id}/clients`, dados)
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
  }

  return (
    <Box pb={24} bg="white" style={{ borderRadius: '10px' }} px={24}>

      <TableHeader
        title={title}
        searchPlaceholder="Pesquisar por Vendedor"
        clean={clean}
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


      </Flex> 

      <Table mt={16}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={weightRegular}>Usuário</Table.Th>
            <Table.Th style={weightRegular}>Cliente(s)</Table.Th>
            <Table.Th style={weightRegular}>UF</Table.Th>
            <Table.Th style={weightRegular}>Edição</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {filteredUser.map((u: IUser, index: any) => (
            <Table.Tr key={`${u.id}-${index}`}>
              <Table.Td>
                <Button variant="subtle" size="md" c="#030229" onClick={() => { openModal(u, u.clients) }}>{u.username}</Button>
              </Table.Td>
              <Table.Td>
                {u.clients?.map((client, index) => (
                  <div key={`${client.name}-${index}`}>
                    {client.name}
                  </div>
                ))}
              </Table.Td>

              <Table.Td>
                {u.clients?.map((client, index) => (
                  <div key={`${client.name}-${index}`}>
                    {client.uf}
                  </div>
                ))}
              </Table.Td>
              <Table.Td>
                <a href="#" onClick={() => { openModal(u, u.clients) }}><IconEdit style={{ color: 'gray' }} /></a>
              </Table.Td>

            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      {isOpened && (
        <Modal opened={isOpened} onClose={closeModal} closeOnClickOutside={false} withCloseButton={false} centered>

          <Flex p={16} align={'center'} gap={15} bg={'white'}>
            <Box>
              <Text size="sm" tt={'uppercase'} c={'#999'}>{`CONFIGURAÇÕES > VINCULAR`}</Text>
              <Text tt={'uppercase'} fw={'bold'} size="md">{`VENDEDOR(A) > ${selectedItem?.username}`}</Text>
            </Box>
          </Flex>

          <Flex mb={15}>
            <TextInput miw={'410px'} placeholder={'Selecionar um ou mais clientes'} onChange={(e) => setSearch(e.target.value)} />
          </Flex>

          <ScrollArea type="scroll" style={{ border: '1px solid' }} mb={10} h={200}>
            <Flex gap={10} pt={15} mb={20} pb={10} direction={'column'} align={'start'}>
              <Box>
                <Stack ml={8} align={'start'}>
                  {client.map((cli: IClient, index: any) => (
                    <Checkbox
                      key={`${cli.code}-${cli.name}-${index}`}
                      label={cli.name}
                      checked={checkedItems.includes(cli.cnpj)}
                      onChange={() => handleCheckboxChange(cli.cnpj)}
                    />
                  ))}
                </Stack>
              </Box>
            </Flex>
          </ScrollArea>

          <Flex gap={10} pb={12} direction={'column'} align={'center'}>
            <Button color="#0855A3" onClick={() => { vincular(selectedItem?.id) }}>Salvar</Button>
            <Button color="#0855A3" variant="transparent" onClick={closeModal}>Descartar alteração</Button>
          </Flex>
        </Modal>
      )}


      <Footer color={""} radius={""} onHandleClick={handleClick} />
    </Box >
  );
}