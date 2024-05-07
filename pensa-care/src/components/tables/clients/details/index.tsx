import { Box, Table, Text } from '@mantine/core';
import { Footer, TableHeader } from '../../components';
import { Maintenance } from '../../components/maintenance';

import { useState } from 'react';
import sulfIcon from '../../../../assets/icons/tables/sulf.svg';
import { Model } from '../../components/model';

export function TableDetails({ title, result }) {
  const weightRegular = { fontWeight: 400 };
  const [clients, setClients] = useState([]);

  return (
    <Box pb={24} bg="white" style={{ borderRadius: '10px' }} px={24}>
      <TableHeader
        title={title}
        result={result}
        searchPlaceholder="Pesquisar Nome/Serial Number"
        columnMode
        clients={clients}
        setClients={setClients}
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
          {Array(5).fill(
            <Table.Tr>
              <Maintenance
                data={'27 de junho de 2023'}
                type={'Corretiva'}
                client={'Client SP (Time Sampaio)'}
              />

              <Model
                image={sulfIcon}
                serial={'S/N: 000X0X0000000'}
                name={
                  'Banho Circulador Modelo TLV40-11 para baixas temperaturas'
                }
              />

              <Table.Td>
                <Text>Não operacional XXXX</Text>
              </Table.Td>

              <Table.Td>
                <Text>12345678910</Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
      <Footer />
    </Box>
  );
}
