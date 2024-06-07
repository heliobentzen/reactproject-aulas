import { Box, Card, Divider, Flex, Modal, Table, Text, Title } from '@mantine/core';
import { Footer, TableHeader } from '../../components';
import { Maintenance } from '../../components/maintenance';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import sulfIcon from '../../../../assets/icons/tables/sulf.svg';
import { IService } from '../../../../interfaces/table/IService';
import ApiService from '../../../../services/ApiService';
import { Model } from '../../components/model';

// Create an axios instance
const api = new ApiService('');
export function TableDetails({ title, result, client }: any) {
  const weightRegular = { fontWeight: 400 };
  const [equipment, setEquipment] = useState<any>([]);
  const [filteredEquipment, setFilteredEquipment] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(1);
  const [totalPages, setTotalPages] = useState(100);
  const [searchTerm, setSearchTerm] = useState('');
  const [equipmentView, setEquipmentView] = useState<any>();
  const [isOpenedView, setIsOpenedView] = useState(false);
  const [sort] = useState('date');
  const isRefVerMais = useRef(false);



  const editModal = (u: any) => {
    setEquipmentView(u);
    setIsOpenedView(true);
  }

  const closeModal = () => {
    setIsOpenedView(false);
  }

  const { id } = useParams<{ id: string }>();
  const cnpj = id;
  result
  client

  const equipmentPerPage = 12;

  const fetchItens = useCallback(async () => {
    if (currentPage <= totalPages) {
      setSearchTerm(searchTerm)
      api.get(`/api/v1/clients/${cnpj}/services?page=${currentPage - 1}&size=${equipmentPerPage}`)
        .then((response) => {
          setTotalElements(response.data.total_elements);
          setTotalPages(response.data.total_pages);

          if (!isRefVerMais.current) {
            setEquipment(response.data.content);
            setFilteredEquipment(response.data.content);
          } else {
            const newItens = response.data;
            setEquipment((prevItens: any) => [...prevItens, ...newItens.content]);
            setFilteredEquipment((prevItens: any) => [...prevItens, ...newItens.content]);
          }
        })
    }

  }, [currentPage, searchTerm, sort]);

  useEffect(() => {
    fetchItens();
  }, []);

  useEffect(() => {
    fetchItens();
  }, [currentPage]);

  useEffect(() => {
    console.log(equipmentView)
  }, [equipmentView])

  const handleClick = () => {
    setCurrentPage(prevPage => prevPage + 1);
    isRefVerMais.current = true;
  };

  const handleTableHeaderChange = (headerChange: { sortOrder: any; searchValue: any; }) => {
    const { sortOrder, searchValue } = headerChange;
    const filteredItens = (equipment || []).filter((item: IService) => {
      return item.description?.toLowerCase().includes(searchValue?.toLowerCase());
    }) || [];

    const sortFilteredItens = filteredItens.sort((a: IService, b: IService) => {
      if (sortOrder === '1') {
        return a.description.localeCompare(b.description);
      } else {
        return b.description.localeCompare(a.description);
      }
    });

    setFilteredEquipment(sortFilteredItens || []);
  }

  return (
    <Box pb={24} bg="white" style={{ borderRadius: '10px' }} px={24}>
      <TableHeader
        title={title}
        result={totalElements}
        searchPlaceholder="Pesquisar Nome/Serial Number"
        onHandleTableHeaderChange={handleTableHeaderChange}
        columnMode
      />

      <Table mt={16}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={weightRegular}>Data</Table.Th>
            <Table.Th pl={50} style={weightRegular}>Serial/Modelo</Table.Th>
            <Table.Th style={weightRegular}>Ordem de serviço</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {filteredEquipment.map((d: any) => (
            <Table.Tr onClick={() => { editModal(d) }}>
              <Maintenance
                data={d.date ? new Date(d.date).toLocaleDateString('pt-BR') : "N/D"}
                type={d.type === 'MAINTENANCE' ? 'Corretiva' : 'Preventiva'}
                client={d.name}
              />

              <Model
                image={sulfIcon}
                serial={`S/N: ${d.items[0].serial_number}`}
                name={d.items[0].model}
              />


              <Table.Td>
                <Text>{d.order_number}</Text>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      {isOpenedView && (
        <Modal size="lg" opened={isOpenedView} onClose={closeModal} withCloseButton={false} centered>

          <Box mb={10}>
            <Text size="sm" tt={'uppercase'} c={'#999'}> {equipmentView.name} </Text>
            <Text tt={'uppercase'} fw={'bold'} size="lg"> DETALHES DA MANUTENÇÃO </Text>
          </Box>

          <Flex direction={'column'}>
            <Title c="#0855A3" size={'h4'}>Cliente </Title>
            <Card mt={4} shadow="sm" bg={'#E7E7E7'}>
              <Text fw={'bold'} tt="uppercase" size="sm" mt={4}>NOME: {equipmentView.name}</Text>
              <Text fw={'bold'} tt="uppercase" size="sm" mt={4}>CNPJ: {equipmentView.cnpj}</Text>
              <Text fw={'bold'} tt="uppercase" size="sm" mt={4}>ESTADO: {equipmentView.state}</Text>
              <Text fw={'bold'} tt="uppercase" size="sm" mt={4}>CIDADE: {equipmentView.city}</Text>
            </Card>

            <Divider size={'sm'} my="xs" labelPosition="center" />
            <Title c="#0855A3" size={'h4'}>Informações </Title>
            <Card mt={4} shadow="sm" bg={'#E7E7E7'}>
              <Text fw={'bold'} tt="uppercase" size="sm" mt={4}>DATA: {equipmentView.date === null ? 'Não informada': new Date(equipmentView.date).toLocaleDateString('pt-BR') }</Text>
              <Text fw={'bold'} tt="uppercase" size="sm" mt={4}>DESCRIÇÃO: {equipmentView.description}</Text>
              <Text fw={'bold'} tt="uppercase" size="sm" mt={4}>ORDEM DE SERVIÇO: {equipmentView.order_number}</Text>
              <Text fw={'bold'} tt="uppercase" size="sm" mt={4}>TÉCNICO: {equipmentView.order_number}</Text>
              <Text fw={'bold'} tt="uppercase" size="sm" mt={4}>TIPO: {equipmentView.type === 'MAINTENANCE' ? 'Corretiva' : 'Preventiva'}</Text>
            </Card>
            <Divider size={'sm'} my="xs" labelPosition="center" />
            <Title c="#0855A3" size={'h4'}>Itens </Title>

            {equipmentView.items.map((item: any, index: number) => (
              <Card key={index} mt={5} shadow="sm" bg={'#E7E7E7'}>
                <Text fw={'bold'} tt="uppercase" size="sm" >CODIGO: {item.code}</Text>
                <Text fw={'bold'} tt="uppercase" size="sm" >DATA: {item.date === null ? 'Não informada': new Date(item.date).toLocaleDateString('pt-BR') }</Text>
                <Text fw={'bold'} tt="uppercase" size="sm" >DESCRIÇÃO: {item.description}</Text>
                <Text fw={'bold'} tt="uppercase" size="sm" >ITEM: {item.item}</Text>
                <Text fw={'bold'} tt="uppercase" size="sm" >MODELO: {item.model}</Text>
                <Text fw={'bold'} tt="uppercase" size="sm" >SERIAL: {item.serial_number}</Text>
              </Card>
            ))}
          </Flex>
        </Modal>
      )}

      <Footer color={undefined} radius={undefined} onHandleClick={handleClick} />
    </Box>
  );
}
