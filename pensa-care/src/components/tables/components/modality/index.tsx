import { Table, Text } from '@mantine/core';

interface IModality {
  text: string;
}

export function Modality({ text }: IModality) {
  const isPreventative = text === 'Preventiva';

  return (
    <Table.Td>
      <Text c={isPreventative ? '#88960E' : '#A32219'}>{text}</Text>
    </Table.Td>
  );
}
