import { Box, Table, Text } from '@mantine/core';
import { Footer, TableHeader } from '../../components';
import { Maintenance } from '../../components/maintenance';

import sulfIcon from '../../../../assets/icons/tables/sulf.svg';
import { Model } from '../../components/model';
import { useState } from 'react';

export function TableDetails({ title, result, data }) {
  const weightRegular = { fontWeight: 400 };
  const [originalData, setOriginalData] = useState(data);
  const [filteredData, setFilteredData] = useState(data);

  return (
    <Box pb={24} bg="white" style={{ borderRadius: '10px' }} px={24}>
      <TableHeader
        title={title}
        result={result}
        searchPlaceholder="Pesquisar Nome/Serial Number"
        columnMode
      />

      <Table mt={16}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={weightRegular}>Data</Table.Th>
            <Table.Th pl={50} style={weightRegular}>
              Serial/Modelo
            </Table.Th>
            <Table.Th pl={10} style={weightRegular}>
              Status/Lansolver
            </Table.Th>
            <Table.Th style={weightRegular}>Ordem de serviço</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((d) => (
            <Table.Tr>
            <Maintenance
                data={d.date ? d.date : 'N/D'}
                type={d.type}
                client={d.name}
              />

              <Model
                image={sulfIcon}
                serial={`S/N: ${d.items[0].serial_number}`}
                name={d.items[0].model}
              />

              <Table.Td>
                <Text>{'N/D'}</Text>
              </Table.Td>

              <Table.Td>
                <Text>{d.order_number}</Text>
              </Table.Td>
          </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <Footer />
    </Box>
  );
}
