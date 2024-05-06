import { Flex, Table, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IClient } from '../../../../interfaces/table/IClient';

export function Client({ name, cnpj, city, uf }: IClient) {
  return (
    <Table.Td>
      <Flex direction={'column'} gap={4}>
        <Text
          component={Link}
          to={'/clients/123'}
          fw={'bold'}
          c="#005FA9"
          size="lg"
        >
          {name}
        </Text>
        <Text>{cnpj}</Text>
        <Text>{city}/{uf}</Text>
      </Flex>
    </Table.Td>
  );
}
