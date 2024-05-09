import { Box, Flex } from '@mantine/core';

import { Header } from '../../components/header';
import { TableConfig } from '../../components/tables';

import { mockClientData } from '../../__mock__/data';

export function ConfigPage() {
  return (
    <Box mx={24}>
      <Header title="Configurações" />
      <Flex direction="column" gap={24}>
        <TableConfig
          title="Lista de vendedores e clientes"
          result={56} // data.length
          data={mockClientData} 
          searchPlaceholder={''}        
        />
      </Flex>
    </Box>
  );
}
