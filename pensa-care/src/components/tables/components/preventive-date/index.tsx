import { Flex, Table, Text } from '@mantine/core';

import { IPreventiveDate } from '../../../../interfaces/table/IClient';

export function PreventiveDate({ preventiveDate, done }: IPreventiveDate) {
  return (
    <Table.Td>
      <Flex direction={'column'} gap={4}>
        <Text>{preventiveDate}</Text>
        {/* Os dias abaixo serão calculados dinamicamente de acordo com a data acima */}
        <Text c="#999" size="sm">
          {done ? '20 dias atrás' : 'Em 20 dias'}
        </Text>
      </Flex>
    </Table.Td>
  );
}
