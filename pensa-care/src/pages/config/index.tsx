import { Box, Flex } from '@mantine/core';

import { Header } from '../../components/header';
import { TableConfig } from '../../components/tables';


export function ConfigPage() {
  return (
    <Box mx={24}>
      <Header title="Configurações" />
      <Flex direction="column" gap={24}>
        <TableConfig
          title="Lista de vendedores e clientes"
          data={[]}
          result={1}
          searchPlaceholder={''}        
        />
      </Flex>
    </Box>
  );
}
