import { Flex, Table, Text } from '@mantine/core';
import { IPreventiveDate } from '../../../../interfaces/table/IClient';

export function DateComponent({ preventiveDate }: IPreventiveDate) {
  const date = new Date(preventiveDate as string);
  const formattedDate = date.getTime() ? date.toLocaleDateString('pt-BR') : 'N/D';
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
        <Text>N/D</Text>
      </Flex>
    </Table.Td>
  );
}