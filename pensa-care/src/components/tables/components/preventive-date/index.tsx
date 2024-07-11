import { Flex, Table, Text } from '@mantine/core';
import { differenceInCalendarDays } from 'date-fns';

import { IPreventiveDate } from '../../../../interfaces/table/IClient';

export function PreventiveDate({ preventiveDate, done }: Readonly<IPreventiveDate>) {
  done 
  if (preventiveDate === null || preventiveDate === "N/A") {
    return (
      <Table.Td>
        <Flex direction={'column'} gap={4}>
          <Text>Sem data</Text>
          <Text c="#999" size="sm">
            N/A
          </Text>
        </Flex>
      </Table.Td>
    );
  }
  const today = new Date();
  const preventiveDateObj = new Date(preventiveDate as string);
  const diffDays = differenceInCalendarDays(today, preventiveDateObj);

  return (
    <Table.Td>
      <Flex direction={'column'} gap={4}>
        <Text>{preventiveDateObj.toLocaleDateString('pt-BR')}</Text>
        <Text c="#999" size="sm">
        {diffDays === -1 ? `Em 1 dia` : diffDays === 1 ? `1 dia atrás` : diffDays >= 0 ? `${diffDays} dias atrás` : `Em ${Math.abs(diffDays)} dias`}
        </Text>
      </Flex>
    </Table.Td>
  );
}
