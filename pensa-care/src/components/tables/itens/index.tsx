import { Box, Table } from '@mantine/core';
import {
  Client,
  Footer,
  Park,
  PreventiveDate,
  ServiceOrder,
  TableHeader,
} from '../components';

import { useCallback, useEffect, useState } from 'react';
import { IEquipment } from '../../../interfaces/table/IEquipment';
import { ITableHeader } from '../../../interfaces/table/IHeader';
import { Price } from '../components/price';
import ApiService from '../../../services/ApiService';

interface ITableComponent extends ITableHeader {
  data: IEquipment[];
}

// Create an axios instance
const api = new ApiService('');

export function TableItens({ title }: ITableComponent) {
  const weightRegular = { fontWeight: 400 };
  const [equipment, setEquipment] = useState<any>([]);
  const [filteredEquipment, setFilteredEquipment] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sort] = useState('date'); 

  const equipmentPerPage = 12;
  
  const fetchItens = useCallback(async () => {
    setSearchTerm(searchTerm)
    const response = await api.get('/api/v1/equipments',
      {
        page: currentPage - 1,
        size: equipmentPerPage,
        sort: sort,
        name: searchTerm,
    },
  );
  setTotalElements(response.data.total_elements);
  return response.data;
}, [currentPage, searchTerm, sort]);

useEffect(() => {
  const fetchAndSetItens = async () => {
    const data = await fetchItens();
    setEquipment(data.content);
    setFilteredEquipment(data.content);
  };
  fetchAndSetItens();
}, []);

useEffect(() => {
  if(currentPage<2) return;
  const fetchAndSetItens = async () => {
    const newItens = await fetchItens();
    setEquipment((prevItens: any) => [...prevItens, ...newItens.content]);
    setFilteredEquipment((prevItens: any) => [...prevItens, ...newItens.content]);
  };
  fetchAndSetItens();
}, [currentPage]);

const handleClick = () => {
  setCurrentPage(prevPage => prevPage + 1); 
};

const handleTableHeaderChange = (headerChange: { sortOrder: any; searchValue: any; }) => {
  const { sortOrder, searchValue } = headerChange;
  const filteredItens = (equipment || []).filter((item: IEquipment) => {
    return item.name?.toLowerCase().includes(searchValue?.toLowerCase());
  }) || [];
  
  const sortFilteredItens = filteredItens.sort((a: IEquipment, b: IEquipment) => {        
    if (sortOrder === '1') {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  setFilteredEquipment(sortFilteredItens || []);
}

  return (
    <Box pb={24} bg="white" style={{ borderRadius: '10px' }} px={24}>
      <TableHeader
        title={title}
        result={totalElements}
        searchPlaceholder="Pesquisar por Nome"
        onHandleTableHeaderChange={handleTableHeaderChange}
      />
      <Table mt={16}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={weightRegular}>Cliente</Table.Th>
            <Table.Th style={weightRegular}>Data</Table.Th>
            <Table.Th style={weightRegular}>Item</Table.Th>
            <Table.Th style={weightRegular}>Código</Table.Th>
            <Table.Th style={weightRegular}>Preço</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {filteredEquipment.map((equipment: IEquipment) => (
            <Table.Tr key={`${(equipment as IEquipment).name}-${(equipment as IEquipment).cnpj}`}>
              <Client
                name={(equipment as IEquipment).name}
                cnpj={(equipment as IEquipment).cnpj}
                city={(equipment as IEquipment).city}
                uf={(equipment as IEquipment).state}
                code=''
                description=''
                last_service={new Date()}
                model=''
                next_service={new Date()}
                serial_number=''
                icon=''
              />
              
              <PreventiveDate preventiveDate={(equipment as IEquipment).date} done />
              <Park parks={(equipment as IEquipment).items || []} withIndicator />
              <ServiceOrder number={(equipment as IEquipment).order_number} />
              <Price number={0} />
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <Footer color={''} radius={''} onHandleClick={handleClick}></Footer>
    </Box>
  );
}
