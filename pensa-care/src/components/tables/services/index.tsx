import { Box, Table } from '@mantine/core';

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

import { useState } from 'react';
import { IClient } from '../../../interfaces/table/IClient';
import { ITableHeader } from '../../../interfaces/table/IHeader';

interface ITableComponent extends ITableHeader {
  data: IClient[];
}

export function TableServices({ data, result, title }: ITableComponent) {
  const weightRegular = { fontWeight: 400 };
  const [clients, setClients] = useState([]);
  
  return (
    <Box pb={24} bg="white" style={{ borderRadius: '10px' }} px={24}>
      <TableHeader
        title={title}
        result={result}
        searchPlaceholder="Pesquisar por Nome/Serial Number"
        clients={clients}
        setClients={setClients}
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
          {data.map((client) => (
            <Table.Tr key={client.cnpj}>
              <Client
                code={''}
                name={client.name}
                cnpj={client.cnpj}
                city={client.city}
                uf={client.uf}
                />
              <Date preventiveDate={client.preventiveDate} preventiveHour="x" />
              <Item text={client.item || ''} />
              <Modality text={client.modality || ''} />
              <ServiceOrder number={'nulo'} />
              <SerialNumber number={'12345678910'} />
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <Footer color={undefined} radius={undefined} />
    </Box>
  );
}
