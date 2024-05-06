import { Box, Flex } from '@mantine/core';

import { Header } from '../../components/header';
import { TableServices } from '../../components/tables';

import { mockClientData } from '../../__mock__/data';

export function ServicesPage() {
  return (
    <Box mx={24}>
      <Header title="Serviços" />
      <Flex direction="column" gap={24}>
        <TableServices
          title="Lista de serviços prestados"
          result={56} // data.length
          data={mockClientData} 
          searchPlaceholder={''}        
        />
      </Flex>
    </Box>
  );
}
