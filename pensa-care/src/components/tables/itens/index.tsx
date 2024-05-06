import { Box, ColorSwatch, Flex, Table, Text } from '@mantine/core';
import {
  Client,
  Footer,
  Park,
  PreventiveDate,
  ServiceOrder,
  TableHeader,
} from '../components';

import { IClient } from '../../../interfaces/table/IClient';
import { ITableHeader } from '../../../interfaces/table/IHeader';
import { Price } from '../components/price';

interface ITableComponent extends ITableHeader {
  data: IClient[];
}

export function TableItens({ data, result, title }: ITableComponent) {
  const weightRegular = { fontWeight: 400 };

  return (
    <Box pb={24} bg="white" style={{ borderRadius: '10px' }} px={24}>
      <TableHeader
        title={title}
        result={result}
        searchPlaceholder="Pesquisar por Nome/CNPJ"
      />
      <Flex align={'center'} gap={5}>
        <Text mr={10}>Categoria: </Text>
        <ColorSwatch size={'16px'} color="#115A91" />{' '}
        <Text mr={5}>Equipamento</Text>
        <ColorSwatch size={'16px'} color="#B3B3BF" /> Peça
      </Flex>
      <Table mt={16}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={weightRegular}>Cliente/CNPJ</Table.Th>
            <Table.Th style={weightRegular}>Data</Table.Th>
            <Table.Th style={weightRegular}>Item</Table.Th>
            <Table.Th style={weightRegular}>Código</Table.Th>
            <Table.Th style={weightRegular}>Preço</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((client) => (
            <Table.Tr key={client.cnpj}>
              <Client
                name={client.name}
                cnpj={client.cnpj}
                city={client.city}
                uf={client.uf}
              />
              <PreventiveDate preventiveDate={client.preventiveDate} done />
              <Park parks={client.parks || []} withIndicator />
              <ServiceOrder number={'12345678910'} />
              <Price number={1000000} />
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <Footer />
    </Box>
  );
}
