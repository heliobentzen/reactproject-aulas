import { Box, Button, Flex, Modal, Table, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useRef, useState } from 'react';
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

export function TableUsers({ title }: ITableComponent) {
  const [opened, { open, close }] = useDisclosure(false);
  const weightRegular = { fontWeight: 400 };
  const [user, setUser] = useState<any>([]);
  const [userEdit, setUserEdit] = useState<IUser>();
  const [filteredUser, setFilteredUser] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalElements, setTotalElements] = useState(1);
  const [limpar, setLimpar] = useState(false);
  const [isOpenedEdit, setIsOpenedEdit] = useState(false);
  const [isOpenedDelete, setIsOpenedDelete] = useState(false);


  const editModal = (u: IUser) => {
    setUserEdit(u);
    setIsOpenedEdit(true);
  }

  const closeModal = () => {
    setIsOpenedDelete(false);
    setIsOpenedEdit(false);
  }

  const deleteModal = () => {
    setIsOpenedDelete(true);
  }

  const isRefInicial = useRef(true);
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

  const deleteUser = (id: string | undefined) => {
    const save = async () => {
      api.delete(`/api/v1/users/${id}/clients`)
        .then(response => {
          console.log('Resposta da API:', response.data);
          closeModal();
          const fetchAndSetUser = async () => {
            const data = await fetchUser();
            setUser(data.content);
            setFilteredUser(data.content);
          };
          fetchAndSetUser();
        })
        .catch(error => {
          console.error('Erro:', error);
        });
    };
    save();

  }

  console.log(filteredUser)

  return (
    <Box pb={24} bg="white" style={{ borderRadius: '10px' }} px={24}>

      <TableHeader
        title={title}
        searchPlaceholder="Pesquisar por usuário"
        limpar={limpar}
        onHandleTableHeaderChange={handleTableHeaderChange}
        result={totalElements}
      />

      <Flex h={40} mt={10} align={'center'} justify={'flex-end'}>
        <Modal size={500} opened={opened} onClose={close} closeOnClickOutside={false} withCloseButton={false}	centered>
          <Box mb={30}>
            <Text size="sm" tt={'uppercase'} c={'#999'}>{`CONFIGURAÇÕES`}</Text>
            <Text tt={'uppercase'} fw={'bold'} size="md">{`CADASTRAR USUÁRIO`}</Text>
          </Box>
          <Signup isLogin={false} />
          <Box ta="center">
            <Button color="#0855A3" variant="transparent" onClick={close}>Descartar alteração</Button>
          </Box>

        </Modal>
        <Button c="#030229" onClick={open}>Cadastrar Usuário</Button>
      </Flex>

      <Table mt={16}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={weightRegular}>Usuário</Table.Th>
            <Table.Th style={weightRegular}>Perfil</Table.Th>
            <Table.Th style={weightRegular}>E-mail</Table.Th>
            <Table.Th style={weightRegular}>Edição</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {filteredUser.map((u: IUser, index: any) => (
            <Table.Tr key={`${u.id}-${index}`}>
              <Table.Td>{u.username}</Table.Td>
              <Table.Td>{u.role}</Table.Td>
              <Table.Td>{u.email}</Table.Td>
              <Table.Td>
                <a href="#" onClick={() => { editModal(u) }}>Editar</a> |
                <a href="#" onClick={() => { deleteModal() }}>Excluir</a>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      {isOpenedEdit && (
        <Modal opened={isOpenedEdit} onClose={closeModal} closeOnClickOutside={false} withCloseButton={false} centered>
            <Box mb={30}>
              <Text size="sm" tt={'uppercase'} c={'#999'}>{`CONFIGURAÇÕES`}</Text>
              <Text tt={'uppercase'} fw={'bold'} size="md">{`EDITAR USUÁRIO(A) > ${userEdit?.username}`}</Text>
            </Box>

          <Signup isLogin={false} isEdit={true} user={userEdit}/>
          <Flex gap={10} pb={12} direction={'column'} align={'center'}>
            {/*<Button color="#0855A3" onClick={() => { registerUser() }}>Cadastrar</Button>*/}
            <Button color="#0855A3" variant="transparent" onClick={closeModal}>Descartar alteração</Button>
          </Flex>
        </Modal>
      )}

      {isOpenedDelete && (
        <Modal opened={isOpenedDelete} onClose={closeModal} closeOnClickOutside={false} withCloseButton={false} centered>
          <Flex p={16} align={'center'} gap={15} bg={'white'}>
            <Box>
              <Text size="sm" tt={'uppercase'} c={'#999'}>{`CONFIGURAÇÕES`}</Text>
              <Text tt={'uppercase'} fw={'bold'} size="md">{`EXCLUIR USUÁRIO(A) > ${user.username}`}</Text>
            </Box>
          </Flex>

          <Flex p={16} align={'center'} gap={15} bg={'white'}>
            <Box>
              <Text size="sm" c={'#999'}>{`Você tem certeza que deseja excluir 
              o usuário da lista do Pensacare?`}</Text>
            </Box>
          </Flex>
          <Flex gap={10} pb={12} direction={'column'} align={'center'}>
            <Button color="#EB5757" onClick={() => { deleteUser(user.id) }}>Sim, desejo excluir</Button>
            <Button color="#0855A3" variant="transparent" onClick={closeModal}>Cancelar</Button>
          </Flex>
        </Modal>
      )}
      <Footer color={""} radius={""} onHandleClick={handleClick} />
    </Box >
  );
}