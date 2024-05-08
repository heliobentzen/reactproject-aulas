import { Box, Table } from '@mantine/core';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import {
  Client,
  Date,
  Footer,
  Item,
  Modality,
  SerialNumber,
  ServiceOrder,
  TableHeader,
} from '../components';

import { ITableHeader } from '../../../interfaces/table/IHeader';
import { IService } from '../../../interfaces/table/IService';

interface ITableComponent extends ITableHeader {
  data: IService[];
}

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

const token = localStorage.getItem('access_token');

export function TableServices({ title }: ITableComponent) {
  const weightRegular = { fontWeight: 400 };
  const [service, setService] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sort] = useState('date'); 
  const [sortOrder, setSortOrder] = useState('asc'); 
  
  const servicesPerPage = 12;
  
  const fetchServices = useCallback(async () => {
    debugger    
    const response = await api.get('/api/v1/services', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
      page: currentPage - 1,
      size: servicesPerPage,
      sort: sort,
      name: searchTerm,
    },
  });
  return response.data;
}, [currentPage, searchTerm, sort]);

useEffect(() => {
  const fetchAndSetServices = async () => {
    const newServices = await fetchServices(currentPage - 1, servicesPerPage);
    debugger
    setService(newServices.content);
  };
  fetchAndSetServices();
}, []);

useEffect(() => {
  if(currentPage<2) return;
  const fetchAndSetServices = async () => {
    const newServices = await fetchServices(currentPage - 1, servicesPerPage);
    setService(prevServices => [...prevServices, ...newServices.content]);
  };
  fetchAndSetServices();
}, [currentPage]);

const handleSortChange = (selectedOption) => {
  const sortValue = selectedOption.value;
  setSortOrder(sortValue); 
}

  const handleClick = () => {
    setCurrentPage(prevPage => prevPage + 1); 
  };


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Box pb={24} bg="white" style={{ borderRadius: '10px' }} px={24}>
      
      <TableHeader
        title={title}
        searchPlaceholder="Pesquisar por Nome/Serial Number"
        data={service}
        setData={setService}
      />
      <Table mt={16}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={weightRegular}>Cliente/CNPJ</Table.Th>
            <Table.Th style={weightRegular}>Data</Table.Th>
            <Table.Th style={weightRegular}>Item</Table.Th>
            <Table.Th style={weightRegular}>Modalidade</Table.Th>
            <Table.Th style={weightRegular}>Ordem de serviço</Table.Th>
            <Table.Th style={weightRegular}>Serial number</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {service.map((service: IService) => (
            <Table.Tr key={service.client_cnpj}>
              <Client
                code={''}
                cnpj={service.client_cnpj}
                name={service.name}
                store={''} 
                city={''} 
                uf={''}              
              />
              <Date preventiveDate={service.date} preventiveHour="x" />
              <Item text={service.item_description || ''} />
              <Modality text={service.modality || ''} />
              <ServiceOrder number={service.order_number} />
              <SerialNumber number={service.item_serial_number} />
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <Footer color={undefined} radius={undefined} />
    </Box>
  );
}
