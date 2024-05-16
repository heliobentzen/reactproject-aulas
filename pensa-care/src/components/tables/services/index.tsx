import { Box, Table } from '@mantine/core';
import { useCallback, useEffect, useState } from 'react';
import {
  Client,
  Footer,
  Item,
  Modality,
  ServiceOrder,
  TableHeader
} from '../components';

import { ITableHeader } from '../../../interfaces/table/IHeader';
import { IService } from '../../../interfaces/table/IService';
import { DateComponent } from '../components/date';
import ApiService from '../../../services/ApiService';

interface ITableComponent extends ITableHeader {
  data: IService[];
}

const api = new ApiService('');

export function TableServices({ title }: ITableComponent) {
  const weightRegular = { fontWeight: 400 };
  const [service, setService] = useState<any>([]);
  const [filteredService, setFilteredService] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sort] = useState('date'); 
  
  const servicesPerPage = 12;
  
  const fetchServices = useCallback(async () => {
    setSearchTerm(searchTerm)
    const response = await api.get('/api/v1/services',
      {
      page: currentPage - 1,
      size: servicesPerPage,
      sort: sort,
      name: searchTerm,
    },
  );
  setTotalElements(response.data.total_elements);
  return response.data;
}, [currentPage, searchTerm, sort]);

useEffect(() => {
  const fetchAndSetServices = async () => {
    const data = await fetchServices();
    setService(data.content);
    setFilteredService(data.content);
  };
  fetchAndSetServices();
}, []);

useEffect(() => {
  if(currentPage<2) return;
  const fetchAndSetServices = async () => {
    const newServices = await fetchServices();
    setService((prevServices: any) => [...prevServices, ...newServices.content]);
    setFilteredService((prevServices: any) => [...prevServices, ...newServices.content]);
  };
  fetchAndSetServices();
}, [currentPage]);


  const handleClick = () => {
    setCurrentPage(prevPage => prevPage + 1); 
  };


  const handleTableHeaderChange = (headerChange: { sortOrder: any; searchValue: any; }) => {
    const { sortOrder, searchValue } = headerChange;
    const filteredServices = (service || []).filter((service: IService) => {
      return service.name?.toLowerCase().includes(searchValue?.toLowerCase());
    }) || [];
    
    const sortFilteredServices = filteredServices.sort((a: IService, b: IService) => {        
      if (sortOrder === '1') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    setFilteredService(sortFilteredServices || []);
  }

  return (
    <Box pb={24} bg="white" style={{ borderRadius: '10px' }} px={24}>
      
      <TableHeader
        title={title}
        result={totalElements}
        searchPlaceholder="Pesquisar por Nome/Serial Number"
        onHandleTableHeaderChange={handleTableHeaderChange}
      />
      <Table mt={16}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={weightRegular}>Cliente</Table.Th>
            <Table.Th style={weightRegular}>Data</Table.Th>
            <Table.Th style={weightRegular}>Item</Table.Th>
            <Table.Th style={weightRegular}>Modalidade</Table.Th>
            <Table.Th style={weightRegular}>Ordem de serviço</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {filteredService.map((service: IService) => (
            <Table.Tr key={`${service.order_number}-${service.cnpj}`}>
              <Client 
                cnpj={service.cnpj}
                name={service.name} 
                city={service.city} 
                uf={service.state}    
                code=''
                description=''
                last_service={new Date()}
                next_service={new Date()}
                model=''
                serial_number=''
                icon=''
              />
              <DateComponent preventiveDate={service.date} preventiveHour="x" />
              <Item text={service.items?.map(item => item.description).join('\n')} />
              <Modality text={service.description} />
              <ServiceOrder number={service.order_number} />
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <Footer color={''} radius={''} onHandleClick={handleClick}></Footer>
    </Box>
  );
}
