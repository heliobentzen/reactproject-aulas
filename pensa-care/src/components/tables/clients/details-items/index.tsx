import { Box, Card, Flex, Modal, Table, Text, Title } from '@mantine/core';
import { Footer, TableHeader } from '../../components';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IEquipment } from '../../../../interfaces/table/IEquipment';
import ApiService from '../../../../services/ApiService';
import { Model } from '../../components/model';
// import sulfIcon from '../../../../assets/icons/tables/sulf.svg';
import ImageApiService from '../../../../services/ImageApiService';

// Create an axios instance
const api = new ApiService('');

export function TableDetailsItems({ title, result, client }: any) {
  const weightRegular = { fontWeight: 400 };
  const [equipment, setEquipment] = useState<any>([]);
  const [filteredEquipment, setFilteredEquipment] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(1);
  const [totalPages, setTotalPages] = useState(100);
  const [itemView, setItemView] = useState<any>();
  const [isOpenedView, setIsOpenedView] = useState(false);
  const isRefVerMais = useRef(false);
  const imageApiService = new ImageApiService();
  const [query, setQuery] = useState('');

  const { id } = useParams<{ id: string }>();
  const cnpj = id;
  result
  client
  const equipmentPerPage = 20;

  const fetchData = useCallback(async (query: string) => {
    if (currentPage <= totalPages) {
      try {
        let url = `/api/v1/clients/${cnpj}/equipments?page=${currentPage - 1}&size=${equipmentPerPage}&sort=name`;

        if(query && query !== ''){
          url += `&query=${query}`
        }

        const response = await api.get(url);
        const newItems = response.data.content;
        setTotalElements(response.data.total_elements);
        setTotalPages(response.data.total_pages);

        if (!isRefVerMais.current) {
          setEquipment(newItems);
          setFilteredEquipment(newItems);
        } else {
          setEquipment((prevItems: any) => [...prevItems, ...newItems]);
          setFilteredEquipment((prevItems: any) => [...prevItems, ...newItems]);
        }
      } catch (error) {
        console.error('Erro ao obter os dados:', error);
      }
    }
  }, [cnpj, currentPage, totalPages, equipmentPerPage]);

  const openModal = (d: any) => {
    setItemView(d);
    setIsOpenedView(true);
  }

  const closeModal = () => {
    setIsOpenedView(false);
  }

  useEffect(() => {
    fetchData(query);
  }, [fetchData]);

  const handleClick = () => {
    setCurrentPage(prevPage => prevPage + 1);
    isRefVerMais.current = true;
  };

  const handleTableHeaderChange = (headerChange: { sortOrder: any; searchValue: any; }) => {
    const { sortOrder, searchValue } = headerChange;
    setQuery(searchValue);
    sortOrder
    equipment

    fetchData(searchValue)

    // const filteredItems = (equipment || []).filter((item: IEquipment) => {
    //   return item.description?.toLowerCase().includes(searchValue?.toLowerCase());
    // }) || [];

    // const sortFilteredItens = filteredItems.sort((a: IEquipment, b: IEquipment) => {
    //   if (sortOrder === '1') {
    //     return a.description.localeCompare(b.description);
    //   } else {
    //     return b.description.localeCompare(a.description);
    //   }
    // });
    // setFilteredEquipment(sortFilteredItens || []);
  }

  const formatarData = (data: any) => {
    if(data === null){
      return 'N/D';
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
          {filteredEquipment.map((e: IEquipment) => (
            <Table.Tr key={e.serial_number || e.code} onClick={() => { openModal(e) }}>
              <Table.Td>
                <Text size="sm">{e.code}</Text>
              </Table.Td>

              <Model
                image={imageApiService.getEquipmentImageUrl(e.code)}
                serial={`S/N: ${e.serial_number}`}
                name={e.model}
              />
              <Table.Td >
                <Text size="sm">{e.description}</Text>
              </Table.Td>
              <Table.Td>
                <Text size="sm">{formatarData(e.next_service)}</Text>
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
            <Card mt={4} shadow="sm" bg="#E7E7E7">
              {itemView.description && (
                <>
                  <Text fw="bold" tt="uppercase" size="sm" mt={4}>
                    DESCRIÇÃO: {itemView.description}
                  </Text>
                  <Text fw="bold" tt="uppercase" size="sm" mt={4}>
                    CÓDIGO: {itemView.code}
                  </Text>
                  <Text fw="bold" tt="uppercase" size="sm" mt={4}>
                    MODELO: {itemView.model || 'Não informado'}
                  </Text>
                  <Text fw="bold" tt="uppercase" size="sm" mt={4}>
                    SN: {itemView.serial_number}
                  </Text>
                  <Text fw="bold" tt="uppercase" size="sm" mt={4}>
                    Factory SN: {itemView.factory_serial_number}
                  </Text>
                  <Text fw="bold" tt="uppercase" size="sm" mt={4}>
                    ÚLTIMO SERVIÇO: {formatarData(itemView.last_service)}
                  </Text>
                  <Text fw="bold" tt="uppercase" size="sm" mt={4}>
                    PRÓXIMO SERVIÇO: {formatarData(itemView.next_service)}
                  </Text>
                </>
              )}
            </Card>

          </Flex>
        </Modal>
      )}
      <Footer color={""} radius={""} onHandleClick={handleClick} />
    </Box>
  );
}
