import { Flex, Table, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IClient } from '../../../../interfaces/table/IClient';

export function Client({ cnpj, name, city, uf }: IClient) {
  
  return (
    <Table.Td>
      <Flex direction={'column'} gap={4}>
        <Text
          component={Link}
          to={'/clients/' + `${cnpj}`}
          fw={'bold'} 
          c="#005FA9"
          size="lg"
        >
          {name}
        </Text>
        <Text size="sm">CNPJ {cnpj}</Text>
        <Text size="sm">{city}/{uf}</Text>
      </Flex>
    </Table.Td>
  );
}
