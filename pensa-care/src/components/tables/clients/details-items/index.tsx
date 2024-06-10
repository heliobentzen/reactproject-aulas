import { Box, Card, Flex, Modal, Table, Text, Title } from '@mantine/core';
import { Footer, TableHeader } from '../../components';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import sulfIcon from '../../../../assets/icons/tables/sulf.svg';
import { IEquipment } from '../../../../interfaces/table/IEquipment';
import ApiService from '../../../../services/ApiService';
import { Model } from '../../components/model';

// Create an axios instance
const api = new ApiService('');

export function TableDetailsItems({ title, result, client }: any) {
  const weightRegular = { fontWeight: 400 };
  const [equipment, setEquipment] = useState<any>([]);
  const [filteredEquipment, setFilteredEquipment] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(1);
  const [totalPages, setTotalPages] = useState(100);
  const [searchTerm, setSearchTerm] = useState('');
  const [sort] = useState('date');
  const [itemView, setItemView] = useState<any>();
  const [isOpenedView, setIsOpenedView] = useState(false);
  const isRefVerMais = useRef(false);

  const { id } = useParams<{ id: string }>();
  const cnpj = id;

  result
  client
  const equipmentPerPage = 12;

  const fetchItens = useCallback(async () => {
    if (currentPage <= totalPages) {
      setSearchTerm(searchTerm)
      api.get(`/api/v1/clients/${cnpj}/equipments?page=${currentPage - 1}&size=${equipmentPerPage}`)
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

  const openModal = (d: any) => {
    setItemView(d);
    setIsOpenedView(true);
  }

  const closeModal = () => {
    setIsOpenedView(false);
  }

  useEffect(() => {
    fetchItens();
  }, []);

  useEffect(() => {
    fetchItens();
  }, [currentPage]);

  const handleClick = () => {
    setCurrentPage(prevPage => prevPage + 1);

    isRefVerMais.current = true;
  };

  const handleTableHeaderChange = (headerChange: { sortOrder: any; searchValue: any; }) => {
    const { sortOrder, searchValue } = headerChange;
    const filteredItens = (equipment || []).filter((item: IEquipment) => {
      return item.description?.toLowerCase().includes(searchValue?.toLowerCase());
    }) || [];

    const sortFilteredItens = filteredItens.sort((a: IEquipment, b: IEquipment) => {
      if (sortOrder === '1') {
        return a.description.localeCompare(b.description);
      } else {
        return b.description.localeCompare(a.description);
      }
    });

    setFilteredEquipment(sortFilteredItens || []);
  }

  const formatarData = (data: any) => {
    if(data === null){
      return "N/D";
    }else{
      const dataUTC = new Date(data);
      const dataLocal = new Date(dataUTC.getUTCFullYear(), dataUTC.getUTCMonth(), dataUTC.getUTCDate());
      return dataLocal.toLocaleDateString('pt-BR');
    }
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

      <Table highlightOnHover style={{ cursor: 'pointer' }} mt={16}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={weightRegular}>Código</Table.Th>
            <Table.Th pl={50} style={weightRegular}>
              Serial/Modelo
            </Table.Th>
            <Table.Th pl={10} style={weightRegular}>
              Descrição
            </Table.Th>
            <Table.Th pl={10} style={weightRegular}>
              Próxima Manutenção
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {filteredEquipment.map((d: any) => (
            <Table.Tr onClick={() => { openModal(d) }}>
              <Table.Td>
                <Text size="sm">{d.code}</Text>
              </Table.Td>

              <Model
                image={sulfIcon}
                serial={`S/N: ${d.serial_number}`}
                name={d.model}
              />

              <Table.Td >
                <Text size="sm">{d.description}</Text>
              </Table.Td>

              <Table.Td>
                <Text size="sm">{formatarData(d.next_service)}</Text>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      {isOpenedView && (
        <Modal size="lg" opened={isOpenedView} onClose={closeModal} withCloseButton={false} centered>
          <Box mb={10}>
            <Text size="sm" tt={'uppercase'} c={'#999'}> {itemView.code} </Text>
            <Text tt={'uppercase'} fw={'bold'} size="lg"> DETALHES DO ITEM </Text>
          </Box>

          <Flex direction={'column'}>
            <Title c="#0855A3" size={'h4'}>Informações </Title>
            <Card mt={4} shadow="sm" bg={'#E7E7E7'}>
              <Text fw={'bold'} tt="uppercase" size="sm" mt={4}>DESCRIÇÃO: {itemView.description}</Text>
              <Text fw={'bold'} tt="uppercase" size="sm" mt={4}>CÓDIGO: {itemView.code}</Text>
              <Text fw={'bold'} tt="uppercase" size="sm" mt={4}>MODELO: {itemView.model === '' ? 'Não informado' : itemView.model}</Text>
              <Text fw={'bold'} tt="uppercase" size="sm" mt={4}>SÉRIAL: {itemView.serial_number}</Text>
              <Text fw={'bold'} tt="uppercase" size="sm" mt={4}>ULTIMO SERVIÇO:  {formatarData(itemView.last_service)}</Text>
              <Text fw={'bold'} tt="uppercase" size="sm" mt={4}>PRÓXIMO SERVIÇO: {formatarData(itemView.next_service)}</Text>
            </Card>
          </Flex>
        </Modal>
      )}

      <Footer color={undefined} radius={undefined} onHandleClick={handleClick} />
    </Box>
  );
}
