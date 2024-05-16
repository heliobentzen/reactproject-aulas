import { Box, Flex } from '@mantine/core';

import { Header } from '../../components/header';
import { TableItens } from '../../components/tables';


export function ItensPage() {
  return (
    <Box mx={24}>
      <Header title="Itens" />
      <Flex direction="column" gap={24}>
        <TableItens
          title="Produtos Vendidos"
          data={[]}
          result={1}
          searchPlaceholder={''} 
        />
      </Flex>
    </Box>
  );
}
