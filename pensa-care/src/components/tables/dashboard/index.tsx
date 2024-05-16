import { Box, Table } from '@mantine/core';
import {
  Client,
  Footer,
  PreventiveDate,
  Status,
  TableHeader,
} from '../components';

import { useCallback, useEffect, useState } from 'react';
import { IClient } from '../../../interfaces/table/IClient';
import { ITableHeader } from '../../../interfaces/table/IHeader';
import { Item } from '../components/item';
import ApiService from '../../../services/ApiService';

interface ITableComponent extends ITableHeader {
  data: IClient[];
}

// Create an axios instance
const api = new ApiService('');

export function TableDashboard({ data, result, title }: ITableComponent) {
  const weightRegular = { fontWeight: 400 };
  data
  result

  const [leads, setLeads] = useState<any>([]);
  const [filteredLeads, setFilteredLeads] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(1);
  const [sort] = useState('date'); 

  const leadsPerPage = 12;
  
  const fetchItens = useCallback(async () => {
    api.get(`/api/v1/leads`,
      {
        page: currentPage - 1,
        size: leadsPerPage
    },
  ).then((response) => {
    setTotalElements(response.data.total_elements);

    setLeads(response.data.content);
    setFilteredLeads(response.data.content);

    const newItens = response.data;
    setLeads((prevItens: any) => [...prevItens, ...newItens.content]);
    setFilteredLeads((prevItens: any) => [...prevItens, ...newItens.content]);
  });
  
  }, [currentPage, sort]);

  useEffect(() => {
    fetchItens();
  }, []);

  useEffect(() => {
      fetchItens();
  }, [currentPage]);

  const handleClick = () => {
    setCurrentPage(currentPage + 1); 
  };

  const handleTableHeaderChange = (headerChange: { sortOrder: any; searchValue: any; }) => {
    const { sortOrder, searchValue } = headerChange;
    const filteredItens = (leads || []).filter((item: { item: string; }) => {
      return item.item?.toLowerCase().includes(searchValue?.toLowerCase());
    }) || [];
    
    const sortFilteredItens = filteredItens.sort((a: { item: string; }, b: { item: string; }) => {        
      if (sortOrder === '1') {
        return a.item.localeCompare(b.item);
      } else {
        return b.item.localeCompare(a.item);
      }
    });

    setFilteredLeads(sortFilteredItens || []);
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
            <Table.Th style={weightRegular}>Cliente/</Table.Th>
            <Table.Th style={weightRegular}>Próx. preventiva</Table.Th>
            <Table.Th style={weightRegular}>Item</Table.Th>
            <Table.Th pl={40} style={weightRegular}>
              Status
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {filteredLeads.map((d: { client_cnpj: string; client_name: string | undefined; item_code: string; client_city: string; client_state: string; next_service: string | undefined; item: any; status: string | null | undefined; }) => (
            <Table.Tr key={`${d.client_cnpj}-${d.client_name}`}>
              <Client
                code={d.item_code}
                name={d.client_name ? d.client_name : ''}
                cnpj={d.client_cnpj}
                city={d.client_city}
                uf={d.client_state} 
                store={''}      
                serial_number=''
                model=''
                description=''
                last_service={new Date()}
                next_service={new Date()}
                icon=''
              />
              <PreventiveDate preventiveDate={d.next_service ? d.next_service : undefined} />
              <Item text={d.item || 'N/D'} />
              <Status
                status={d.status != null && d.status !== 'null' ? d.status : "N/D"}
                isFulfilled={d.status === 'Atendido'}
                clientName={d.client_name}
              />
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <Footer color={undefined} radius={undefined} onHandleClick={handleClick}/>
    </Box>
  );
}