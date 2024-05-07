import { Flex, Table, Text } from '@mantine/core';

import { IPreventiveDate } from '../../../../interfaces/table/IClient';

export function Date({ preventiveDate, preventiveHour }: IPreventiveDate) {
  return (
    <Table.Td>
      <Flex direction={'column'} gap={4}>
        <Text c="#999" size="sm">
          Início
        </Text>
        <Text>
          {preventiveDate} nulo h
        </Text>
        <Text c="#999" size="sm">
          Fim
        </Text>
        <Text>nulo</Text>
      </Flex>
    </Table.Td>
  );
}
