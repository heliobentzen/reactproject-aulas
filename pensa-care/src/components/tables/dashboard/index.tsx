import { Box, Loader, Table } from '@mantine/core';
import {
  Client,
  Footer,
  PreventiveDate,
  Status,
  TableHeader,
} from '../components';

import { useEffect, useRef, useState } from 'react';
import { IClient } from '../../../interfaces/table/IClient';
import { ITableHeader } from '../../../interfaces/table/IHeader';
import ApiService from '../../../services/ApiService';
import { Item } from '../components/item';

interface ITableComponent extends ITableHeader {
  data: IClient[];
}

// Create an axios instance
const api = new ApiService('');

export function TableDashboard({ title }: ITableComponent) {
  const weightRegular = { fontWeight: 400 };
  const [leads, setLeads] = useState<any>([]);
  const [filteredLeads, setFilteredLeads] = useState<any>([]);
  const [totalElements, setTotalElements] = useState(1);
  const [totalPagesAfter, setTotalPagesAfter] = useState(0);
  const [totalPagesBefore, setTotalPagesBefore] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPageBefore, setCurrentPageBefore] = useState(0);
  const isRefInicial = useRef(true);
  const isRefVerMais = useRef(false);
  const [clean, setClean] = useState(false);
  const [loading, setLoading] = useState(false);//falta ajustar
  const [query, setQuery] = useState('');
  const [sortOrder, setSortOrder] = useState(1);

  const leadsPerPage = 12;
  const fetchLeads = async (query: string, sortOrder: number) => {
    const today = new Date().toISOString().split('T')[0];

    let urlAfter = `/api/v1/leads?page=${currentPage}&size=${leadsPerPage}&sort=nextService&direction=${sortOrder == 1 ? 'asc' : 'desc'}&after=${today}`;
    let urlBefore = `/api/v1/leads?page=${currentPageBefore}&size=${leadsPerPage}&sort=nextService&direction=${sortOrder == 1 ? 'asc' : 'desc'}&before=${today}`;

    if(query && query !== ''){
      urlAfter += `&query=${query}`
      urlBefore += `&query=${query}`
    }

    const responseAfter = await api.get(urlAfter);
    const responseBefore = await api.get(urlBefore);

    setTotalElements(responseAfter.data.total_elements + responseBefore.data.total_elements);
    setTotalPagesAfter(responseAfter.data.total_pages);
    setTotalPagesBefore(responseBefore.data.total_pages);

    if(sortOrder == 1) {
      if(totalPagesAfter >= currentPage){
        return responseAfter.data;
      }else{
        return responseBefore.data;
      }
    }
    else {
      if(totalPagesBefore >= currentPageBefore){
        return responseBefore.data;
      }else{
        return responseAfter.data;
      }
    }
  };

  useEffect(() => {
    if (isRefInicial.current) {
        setLoading(true);
        const fetchAndSetLeads = async () => {
        const data = await fetchLeads(query, sortOrder);
        setLeads(data.content);
        setFilteredLeads(data.content);
      };
      fetchAndSetLeads();
      isRefInicial.current = false;
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isRefVerMais.current) {
      const fetchAndSetLeads = async () => {
        const newLeads = await fetchLeads(query, sortOrder);
        const todos = [...leads, ...newLeads.content]
        setFilteredLeads(todos);
        setLeads(todos);
      };
      fetchAndSetLeads(); 
      isRefVerMais.current = false;
      setClean(false);
    }
  }, [currentPage, currentPageBefore]);

  const handleClick = () => {
    isRefVerMais.current = true;
    setClean(false);

    if(sortOrder == 1) {
      if(totalPagesAfter > currentPage){
        setCurrentPage(prevPage => prevPage + 1);
      }else{
        setCurrentPageBefore(prevPage => prevPage + 1);
      }
    }
    else {
      if(totalPagesBefore > currentPageBefore){
        setCurrentPageBefore(prevPage => prevPage + 1);
      }else{
        setCurrentPage(prevPage => prevPage + 1);
      }
    }
  };

  const handleTableHeaderChange = (headerChange: { sortOrder: any; searchValue: any; }) => {
    const { sortOrder, searchValue } = headerChange;
    setCurrentPage(0);
    setCurrentPageBefore(0);
    setQuery(searchValue);
    setSortOrder(sortOrder);

    const fetchAndSetLeads = async () => {
      const newLeads = await fetchLeads(searchValue, sortOrder);
      const todos = [...newLeads.content]
      setFilteredLeads(todos);
      setLeads(todos);
    };
    fetchAndSetLeads(); 

    // const filteredLeads = (leads || []).filter((item: { item: string; }) => {
    //   return item.item?.toLowerCase().includes(searchValue?.toLowerCase());
    // }) || [];
    
    // const sortFilteredLeads = filteredLeads.sort((a: { item: string; }, b: { item: string; }) => {        
    //   if (sortOrder === '1') {
    //     return a.item.localeCompare(b.item);
    //   } else {
    //     return b.item.localeCompare(a.item);
    //   }
    // });
    // console.log(filteredLeads);
    // setFilteredLeads(sortFilteredLeads || []);
  }

  return (
    <Box pb={24} bg="white" style={{ borderRadius: '10px' }} px={24}>
      <TableHeader
        title={title}
        result={totalElements}
        searchPlaceholder="Pesquisar por Item"
        onHandleTableHeaderChange={handleTableHeaderChange}
        clean={clean}
      />
      <Table mt={16}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={weightRegular}>Cliente</Table.Th>
            <Table.Th style={weightRegular}>Próx. preventiva</Table.Th>
            <Table.Th style={weightRegular}>Item</Table.Th>
            <Table.Th pl={40} style={weightRegular}>
              Status
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {filteredLeads.map((d: { item_serial_number : string, client_cnpj: string; client_name: string | undefined; item_code: string; client_city: string; client_state: string; next_service: string | undefined; item: any; status: string | null | undefined; }) => (
            <Table.Tr key={`${d.client_cnpj}-${d.item_code}-${d.item_serial_number}`}>
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
                code={d.item_code}
                serialNumber={d.item_serial_number}
                lead={d}
              />
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      {loading && <Loader />}
      <Footer color={''} radius={''} onHandleClick={handleClick}/>
    </Box>
  );
}