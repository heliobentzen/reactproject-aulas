import { Box, Table, Text } from '@mantine/core';
import { Footer, TableHeader } from '../../components';

import { useCallback, useEffect, useState } from 'react';
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

  const { id } = useParams<{ id: string }>();
  const cnpj = id;

  result
  client
  const equipmentPerPage = 12;
  
  const fetchItens = useCallback(async () => {
    setSearchTerm(searchTerm)
    api.get(`/api/v1/clients/${cnpj}/equipments`,
      {
        page: currentPage - 1,
        size: equipmentPerPage
    },
  ).then((response) => {
    setTotalElements(response.data.total_elements);
    setTotalPages(response.data.total_pages);

    setEquipment(response.data.content);
    setFilteredEquipment(response.data.content);

    const newItens = response.data;
    setEquipment((prevItens: any) => [...prevItens, ...newItens.content]);
    setFilteredEquipment((prevItens: any) => [...prevItens, ...newItens.content]);
  });
  
  }, [currentPage, searchTerm, sort]);

  useEffect(() => {
    fetchItens();
  }, []);

  useEffect(() => {
      fetchItens();
  }, [currentPage]);

  const handleClick = () => {
    const nextPage = currentPage < totalPages ? currentPage + 1 : 1;
    setCurrentPage(nextPage); 
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
            <Table.Tr>
              <Table.Td>
                <Text>{d.code}</Text>
              </Table.Td>

              <Model
                image={sulfIcon}
                serial={`S/N: ${d.serial_number}`}
                name={d.model}
              />

              <Table.Td>
                <Text>{d.description}</Text>
              </Table.Td>

              <Table.Td>
                <Text>{d.next_service ? new Date(d.next_service).toLocaleDateString('pt-BR') : "N/D"}</Text>
              </Table.Td>
          </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <Footer color={undefined} radius={undefined} onHandleClick={handleClick}/>
    </Box>
  );
}
