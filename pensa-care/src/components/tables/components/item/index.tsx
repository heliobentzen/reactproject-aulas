import { Table } from '@mantine/core';

interface IItem {
  withIcon?: boolean;
  text?: string;
  icon?: string;
}

export function Item({ text }: IItem) {
  return <Table.Td><div style={{ whiteSpace: 'pre-wrap', fontSize: '0.9em' }}>{text}</div></Table.Td>;
}



