import { Flex, Table, Text } from '@mantine/core';

export function Maintenance({ data, type, client }: any) {
  return (
    <Table.Td>
      <Flex direction={'column'} mt={10}>
        <Text
          fw={'bold'}
          size="lg"
        >
          {data}
        </Text>
        <Text c='#A32318'>{type}</Text>
        <Text>{client}</Text>
      </Flex>
    </Table.Td>
  );
}
