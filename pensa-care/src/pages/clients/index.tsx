import { Box, Flex } from '@mantine/core';
import { Header } from '../../components/header';
import { TableClients } from '../../components/tables';

export function ClientsPage() {  
  return (
    <Box mx={24}>
      <Header title="Clientes" />
      <Flex direction="column" gap={24}>
        <TableClients
          title="Todos os seus clientes"
          data={[]} 
          searchPlaceholder={''}   
          result={1}    
        />
      </Flex>
    </Box>
  );
}