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
import axios from 'axios';

interface ITableComponent extends ITableHeader {
  data: IClient[];
}

// Create an axios instance
const api = axios.create({
  baseURL: 'http://localhost:8080',
});

const token = localStorage.getItem('access_token');

export function TableDashboard({ data, result, title }: ITableComponent) {
  const weightRegular = { fontWeight: 400 };

  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(1);
  const [totalPages, setTotalPages] = useState(100);
  const [searchTerm, setSearchTerm] = useState('');
  const [sort] = useState('date'); 

  const leadsPerPage = 12;
  
  const fetchItens = useCallback(async () => {
    api.get(`/api/v1/leads`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: currentPage - 1,
        size: leadsPerPage
    },
  }).then((response) => {
    setTotalElements(response.data.total_elements);
    setTotalPages(response.data.total_pages);

    setLeads(response.data.content);
    setFilteredLeads(response.data.content);

    const newItens = response.data;
    setLeads(prevItens => [...prevItens, ...newItens.content]);
    setFilteredLeads(prevItens => [...prevItens, ...newItens.content]);
  });
  
  }, [currentPage, searchTerm, sort]);

  useEffect(() => {
    fetchItens(currentPage - 1, leadsPerPage);
  }, []);

  useEffect(() => {
      fetchItens(currentPage - 1, leadsPerPage);
  }, [currentPage]);

  const handleClick = () => {
    const nextPage = currentPage < totalPages ? currentPage + 1 : 1;
    setCurrentPage(nextPage); 
  };

  const handleTableHeaderChange = (headerChange: { sortOrder: any; searchValue: any; }) => {
    const { sortOrder, searchValue } = headerChange;
    const filteredItens = (leads || []).filter((item) => {
      return item.item?.toLowerCase().includes(searchValue?.toLowerCase());
    }) || [];
    
    const sortFilteredItens = filteredItens.sort((a, b) => {        
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
          {filteredLeads.map((d) => (
            <Table.Tr key={`${d.client_cnpj}-${d.client_name}`}>
              <Client
                code={d.item_code}
                name={d.client_name}
                cnpj={d.client_cnpj}
                city={d.client_city}
                uf={d.client_state} 
                store={''}                
              />
              <PreventiveDate preventiveDate={d.next_service ? d.next_service : null} />
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