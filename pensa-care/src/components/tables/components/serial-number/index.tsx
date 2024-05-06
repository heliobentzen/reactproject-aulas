import { Table } from '@mantine/core';

interface ISerialNumber {
  number: string | number;
}

export function SerialNumber({ number }: ISerialNumber) {
  return <Table.Td>{number}</Table.Td>;
}
