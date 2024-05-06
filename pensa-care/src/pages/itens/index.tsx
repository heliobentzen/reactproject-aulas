import { Box, Flex } from '@mantine/core';

import { Header } from '../../components/header';
import { TableItens } from '../../components/tables';

import { mockClientData } from '../../__mock__/data';

export function ItensPage() {
  return (
    <Box mx={24}>
      <Header title="Itens" />
      <Flex direction="column" gap={24}>
        <TableItens
          title="Produtos Vendidos"
          result={56} // data.length
          data={mockClientData}
        />
      </Flex>
    </Box>
  );
}
