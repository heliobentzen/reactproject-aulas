import { Box, Flex } from '@mantine/core';

import { Header } from '../../components/header';
import { TableUsers } from '../../components/tables';


export function UsersPage() {
  return (
    <Box mx={24}>
      <Header title="Usuários" />
      <Flex direction="column" gap={24}>
        <TableUsers
          title="Lista de usuários"
          data={[]}
          result={1}
          searchPlaceholder={''}        
        />
      </Flex>
    </Box>
  );
}
