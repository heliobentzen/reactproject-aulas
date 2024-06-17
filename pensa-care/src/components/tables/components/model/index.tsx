import { Avatar, Flex, Table, Text } from '@mantine/core';


export function Model({ image, serial, name }: any) {
  return (
    <Table.Td>
      <Flex gap={2} direction={'column'} mt={10} align={'center'} >
        <Avatar src={image} maw={48} size="lg" m={20} ml={20}/>
        <Text size='xs'>{serial}</Text>
        <Text size='sm' lineClamp={2} maw={120}>{name}</Text>
      </Flex>
    </Table.Td>
  );
}
