import { Box, Loader, Table } from '@mantine/core';
import { useCallback, useEffect, useState } from 'react';
import {
  Client,
  Footer,
  PreventiveDate,
  TableHeader
} from '../components';

import { IClient } from '../../../interfaces/table/IClient';
import { ITableHeader } from '../../../interfaces/table/IHeader';
import ApiService from '../../../services/ApiService';
import { ParkClient } from '../components/park-client';

// Create an axios instance
const api = new ApiService('');

interface ITableComponent extends ITableHeader {
  data: IClient[];
}

export function TableClients({ title }: ITableComponent) {
  const weightRegular = { fontWeight: 400 };
  const [clients, setClients] = useState<any>([]);
  const [filteredClients, setFilteredClients] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortName] = useState('name'); 
  const [loading, setLoading] = useState(false);

  const clientsPerPage = 12;
  
  const fetchClients = useCallback(async () => {
    setSearchTerm(searchTerm)
    setLoading(true);
    const response = await api.get('/api/v1/clients',
      {
      page: currentPage - 1,
      size: clientsPerPage,
      sort: sortName,
      name: searchTerm,
    },
  );

  setLoading(false);
  setTotalElements(response.data.total_elements);
  
  return response.data;
  
}, [currentPage, searchTerm, sortName]);

  useEffect(() => {
    const fecthReloadClient = async ()=> {
      const data = await fetchClients()
      setClients(data.content);
      setFilteredClients(data.content);
    }
    fecthReloadClient();
  }, []);
  
  useEffect(() => {
    if(currentPage<2) return;
    const fetchAndSetClients = async () => {
      const newClients = await fetchClients();
      setClients((prevClients: any) => [...prevClients, ...newClients.content]);
      setFilteredClients((prevClients: any) => [...prevClients, ...newClients.content]);
    };
    fetchAndSetClients();
  }, [currentPage, searchTerm]);
  
  const handleClick = () => {
    setCurrentPage(prevPage => prevPage + 1); 
  };

  const handleTableHeaderChange = (headerChange: { sortOrder: any; searchValue: any; }) => {
    const { sortOrder, searchValue } = headerChange;
    const filteredClients = (clients || []).filter((client: IClient) => {
      return client.name?.toLowerCase().includes(searchValue?.toLowerCase());
    }) || [];
    
    const sortFilteredClients = filteredClients.sort((a: IClient, b: IClient) => {        
      if (sortOrder === '1') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    setFilteredClients(sortFilteredClients || []);
  }
  return (
    <Box pb={24} bg="white" style={{ borderRadius: '10px' }} px={24}>
      <TableHeader
        title={title}
        result={totalElements}
        onHandleTableHeaderChange={handleTableHeaderChange}
        searchPlaceholder="Pesquisar por Nome"
      />
      <Table mt={16}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={weightRegular}>Cliente</Table.Th>
            <Table.Th style={weightRegular}>Próx. preventiva</Table.Th>
            <Table.Th style={weightRegular}>Parque Instalado</Table.Th>            
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {filteredClients.map((client: IClient, index: any) => {
          const nextServiceDates = (client as IClient).equipments!
          .map((equipment : any) => equipment.next_service ? new Date(equipment.next_service) : null)
          .filter(date => date !== null);
        
        let minNextServiceDate;
        
        if (nextServiceDates.length > 0) {
          minNextServiceDate = nextServiceDates.reduce((minDate, current) => current && minDate && current < minDate ? current : minDate);
        } else {
          minNextServiceDate = 'N/A'; // Or any other default value
        }
          return (
            <Table.Tr key={(client as IClient).cnpj || index}>
              <Client
                name={(client as IClient).name}
                cnpj={(client as IClient).cnpj}
                city={(client as IClient).city}
                uf={(client as IClient).uf}
                code=''
                description=''
                last_service={new Date()}
                next_service={new Date()}
                model=''
                serial_number=''
                icon=''
                />
              <PreventiveDate preventiveDate={minNextServiceDate ? minNextServiceDate.toString() : "N/D"} done />
              <ParkClient parks={(client as IClient).equipments || []} />    
            </Table.Tr>
          );
          })}
          </Table.Tbody>
      </Table>
      {loading && <Loader />}
      <Footer color={''} radius={''} onHandleClick={handleClick}></Footer>
    </Box>
  );
}
