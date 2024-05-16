import { Box, Flex } from '@mantine/core';

import { Header } from '../../components/header';
import { TableServices } from '../../components/tables';


export function ServicesPage() {
  return (
    <Box mx={24}>
      <Header title="Serviços" />
      <Flex direction="column" gap={24}>
        <TableServices
          title="Lista de Serviços prestados"
          data={[]}
          result={1}
          searchPlaceholder={''} 
        />
      </Flex>
    </Box>
  );
}
