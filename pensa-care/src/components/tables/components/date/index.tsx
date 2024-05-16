import { Flex, Table, Text } from '@mantine/core';

import { IPreventiveDate } from '../../../../interfaces/table/IClient';

export function DateComponent({ preventiveDate }: IPreventiveDate) {
  const date = new Date(preventiveDate as string);
  const formattedDate = !isNaN(date.getTime()) ? date.toLocaleDateString() : 'N/A';
  
  return (
    <Table.Td>
      <Flex direction={'column'} gap={4}>
        <Text c="#999" size="sm">
          Início
        </Text>
        <Text>{formattedDate}</Text>
        <Text c="#999" size="sm">
          Fim
        </Text>
        <Text>nulo</Text>
      </Flex>
    </Table.Td>
  );
}
