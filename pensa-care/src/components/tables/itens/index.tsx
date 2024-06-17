import { Box, Table } from '@mantine/core';
import {
  Client,
  Footer,
  Park,
  PreventiveDate,
  ServiceOrder,
  TableHeader,
} from '../components';

import { useEffect, useRef, useState } from 'react';
import { IEquipment } from '../../../interfaces/table/IEquipment';
import { ITableHeader } from '../../../interfaces/table/IHeader';
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
  const [totalElements, setTotalElements] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const isRefInicial = useRef(true);
  const isRefVerMais = useRef(false);
  const [clean, setClean] = useState(false);
  const [query, setQuery] = useState('');
  const [sortOrder, setSortOrder] = useState(1);

const equipmentPerPage = 12;

const fetchItems = async (query: string, sortOrder: number) => {
  try {

      let url = `/api/v1/equipments?page=${currentPage}&size=${equipmentPerPage}&sort=date&direction=${sortOrder == 1 ? 'asc' : 'desc'}`;

      if(query && query !== ''){
        url += `&query=${query}`
      }

      const response = await api.get(url);
      setTotalElements(response.data.total_elements);
      return response.data;
  } catch (error) {
      console.error('Erro ao buscar itens:', error);
      return null;
  }
};

useEffect(() => {
  if (isRefInicial.current) {
      const fetchAndSetItems = async () => {
      const data = await fetchItems(query, sortOrder);
      setEquipment(data.content);
      setFilteredEquipment(data.content);
    };
    fetchAndSetItems();
    isRefInicial.current = false;
  }
}, []);


useEffect(() => {
  if (isRefVerMais.current) {
    const fetchAndSetServices = async () => {
      const newEquipment = await fetchItems(query, sortOrder);
      const all = [...equipment, ...newEquipment.content]
      setFilteredEquipment(all);
      setEquipment(all);
      
    };
    fetchAndSetServices(); 
    isRefVerMais.current = false;
    setClean(false);
  }
}, [currentPage]);

const handleClick = () => {
  isRefVerMais.current = true;
  setClean(false);
  setCurrentPage(prevPage => prevPage + 1);
};

const handleTableHeaderChange = (headerChange: { sortOrder: any; searchValue: any; }) => {
  const { sortOrder, searchValue } = headerChange;
  setQuery(searchValue);
  setSortOrder(sortOrder);

  const fetchAndSetItems = async () => {
    const data = await fetchItems(searchValue, sortOrder);
    setEquipment(data.content);
    setFilteredEquipment(data.content);
  };
  fetchAndSetItems();

  // const filteredItems = (equipment || []).filter((item: IEquipment) => {
  //   return item.name?.toLowerCase().includes(searchValue?.toLowerCase());
  // }) || [];
  
  // const sortedFilteredItems: IEquipment[] = [...filteredEquipment];
  //   if (sortOrder === '1') {
  //     sortedFilteredItems.sort((a, b) => a.name.localeCompare(b.name)); 
  //   } else {
  //     sortedFilteredItems.sort((a, b) => b.name.localeCompare(a.name));
  //   }
  //   setFilteredEquipment(sortedFilteredItems);
}

  return (
    <Box pb={24} bg="white" style={{ borderRadius: '10px' }} px={24}>
      <TableHeader
        title={title}
        result={totalElements}
        onHandleTableHeaderChange={handleTableHeaderChange}
        searchPlaceholder="Pesquisar por Nome"
        clean={clean}
      />
      <Table mt={16}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={weightRegular}>Cliente</Table.Th>
            <Table.Th style={weightRegular}>Data</Table.Th>
            <Table.Th style={weightRegular}>Item</Table.Th>
            <Table.Th style={weightRegular}>Código</Table.Th>
            
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
        {filteredEquipment.map((equipment: IEquipment, index: any) => {
          return (
            <Table.Tr key={`${(equipment as IEquipment).order_number}` || index}>
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
            </Table.Tr>
          )
        })}
        </Table.Tbody>
      </Table>
      <Footer color={''} radius={''} onHandleClick={handleClick}></Footer>
    </Box>
  );
}
