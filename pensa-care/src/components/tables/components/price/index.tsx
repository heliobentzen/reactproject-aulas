import { NumberFormatter, Table } from '@mantine/core';

interface IPrice {
  number: string | number;
}

export function Price({ number }: IPrice) {
  return (
    <Table.Td>
      <NumberFormatter
        prefix="R$ "
        value={number}
        thousandSeparator="."
        decimalSeparator=","
      />
    </Table.Td>
  );
}
