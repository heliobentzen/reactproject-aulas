import { Box, Table } from '@mantine/core';
import {
  Client,
  Footer,
  PreventiveDate,
  Status,
  TableHeader,
} from '../components';

import { useState } from 'react';
import { IClient } from '../../../interfaces/table/IClient';
import { ITableHeader } from '../../../interfaces/table/IHeader';
import { Item } from '../components/item';

interface ITableComponent extends ITableHeader {
  data: IClient[];
}

export function TableDashboard({ data, result, title }: ITableComponent) {
  const weightRegular = { fontWeight: 400 };
  const [clients, setClients] = useState([]);

  return (
    <Box pb={24} bg="white" style={{ borderRadius: '10px' }} px={24}>
      <TableHeader
        title={title}
        result={result}
        searchPlaceholder="Pesquisar por Nome/CNPJ"
        clients={clients}
        setClients={setClients}

      />
      <Table mt={16}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={weightRegular}>Cliente/CNPJ</Table.Th>
            <Table.Th style={weightRegular}>Próx. preventiva</Table.Th>
            <Table.Th style={weightRegular}>Item</Table.Th>
            <Table.Th pl={40} style={weightRegular}>
              Status
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((client) => (
            <Table.Tr key={`${client.cnpj}-${client.name}`}>
              <Client
                code={client.code}              
                name={client.name}
                cnpj={client.cnpj}
                city={client.city}
                uf={client.uf} 
                />
              <PreventiveDate preventiveDate={client.preventiveDate} />
              <Item text={client.item || ''} />
              <Status
                status={client.status}
                isFulfilled={client.status === 'Atendido'}
                clientName={client.name}
              />
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <Footer color={undefined} radius={undefined} />
    </Box>
  );
}