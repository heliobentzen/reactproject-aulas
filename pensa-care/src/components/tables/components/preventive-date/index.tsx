import { Flex, Table, Text } from '@mantine/core';
import { differenceInDays } from 'date-fns';

import { IPreventiveDate } from '../../../../interfaces/table/IClient';

export function PreventiveDate({ preventiveDate, done }: IPreventiveDate) {
  const today = new Date();
  const preventiveDateObj = new Date(preventiveDate);
  const diffDays = differenceInDays(today, preventiveDateObj);

  return (
    <Table.Td>
      <Flex direction={'column'} gap={4}>
        <Text>{preventiveDateObj.toLocaleDateString()}</Text>
        <Text c="#999" size="sm">
          {diffDays > 0 ? `${diffDays} dias atrás` : `Em ${Math.abs(diffDays)} dias`}
        </Text>
      </Flex>
    </Table.Td>
  );
}
