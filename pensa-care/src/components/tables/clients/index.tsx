import { Box, Loader, Table } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
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
  const [client, setClient] = useState<any>([]);
  const [filteredClient, setFilteredClient] = useState<any>([]);
  const [totalElements, setTotalElements] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const isRefInicial = useRef(true);
  const isRefVerMais = useRef(false);
  const [clean, setClean] = useState(false);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');

  const clientsPerPage = 12;
  
  const fetchClient = async (query: string) => {
    try {
        let url = `/api/v1/clients?page=${currentPage}&size=${clientsPerPage}&sort=name`;

        if(query && query !== ''){
          url += `&query=${query}`
        }

        const response = await api.get(url);
        setTotalElements(response.data.total_elements);
        
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar clientes:', error);
        return null;
    }
  };

  useEffect(() => {
    if (isRefInicial.current) {
        setLoading(true);
        const fetchAndSetClient = async () => {
        const data = await fetchClient(query);
        setClient(data.content);
        setFilteredClient(data.content);
      };
      fetchAndSetClient();
      isRefInicial.current = false;
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isRefVerMais.current) {
      const fetchAndSetClient = async () => {
        const newClients = await fetchClient(query);
        const all = [...client, ...newClients.content]
        setFilteredClient(all);
        setClient(all);
      };
      fetchAndSetClient(); 
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

    const fetchAndSetClient = async () => {
      const newClients = await fetchClient(searchValue);
      const all = [...client, ...newClients.content]
      setFilteredClient(all);
      setClient(all);
    };
    fetchAndSetClient(); 

    // const filteredClient = (client || []).filter((client: IClient) => {
    //   return client.name?.toLowerCase().includes(searchValue?.toLowerCase());
    // }) || [];
    
    const sortedFilteredClient = filteredClient.sort((a: IClient, b: IClient) => {        
      if (sortOrder === '1') {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

    setFilteredClient(sortedFilteredClient);
  }

  return (
    <Box pb={24} bg="white" style={{ borderRadius: '10px' }} px={24}>
      <TableHeader
        title={title}
        result={totalElements}
        searchPlaceholder="Pesquisar por Nome"
        onHandleTableHeaderChange={handleTableHeaderChange}
        clean={clean}
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
          {filteredClient.map((client: IClient, index: any) => {
          const nextServiceDates = (client).equipments!
          .map((equipment : any) => equipment.next_service ? new Date(equipment.next_service) : null)
          .filter(date => date !== null);
        
        let minNextServiceDate;
        
        if (nextServiceDates.length > 0) {
          minNextServiceDate = nextServiceDates.reduce((minDate, current) => current && minDate && current < minDate ? current : minDate);
        } else {
          minNextServiceDate = 'N/A'; // Or any other default value
        }
          return (
            <Table.Tr key={(client as IClient).cnpj && (client as IClient).clientName || index}>
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
