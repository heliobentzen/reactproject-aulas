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
  const [totalElements, setTotalElements] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const isRefInicial = useRef(true);
  const isRefVerMais = useRef(false);
  const [limpar, setLimpar] = useState(false);

const equipmentPerPage = 12;
const fetchItens = async () => {
  const response = await api.get(`/api/v1/equipments?page=${currentPage}&size=${equipmentPerPage}`);
  setTotalElements(response.data.total_elements);
  return response.data;
};

useEffect(() => {
  if (isRefInicial.current) {
      const fetchAndSetItens = async () => {
      const data = await fetchItens();
      setEquipment(data.content);
      setFilteredEquipment(data.content);
    };
    fetchAndSetItens();
    isRefInicial.current = false;
  }
}, []);

useEffect(() => {
  if (isRefVerMais.current) {
    const fetchAndSetServices = async () => {
      const newEquipment = await fetchItens();
      const todos = [...equipment, ...newEquipment.content]
      setFilteredEquipment(todos);
      setEquipment(todos);
    };
    fetchAndSetServices(); 
    isRefVerMais.current = false;
    setLimpar(false);
  }
}, [currentPage]);

const handleClick = () => {
  isRefVerMais.current = true;
  setLimpar(true);
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
        onHandleTableHeaderChange={handleTableHeaderChange}
        searchPlaceholder="Pesquisar por Nome"
        limpar={limpar}
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
