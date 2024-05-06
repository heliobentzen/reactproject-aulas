import { Table } from '@mantine/core';

interface IServiceOrder {
  number: string | number;
}

export function ServiceOrder({ number }: IServiceOrder) {
  return <Table.Td>{number}</Table.Td>;
}
