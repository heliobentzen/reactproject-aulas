import { Flex, Image, Table, Text } from '@mantine/core';


export function Model({ image, serial, name }: any) {
  return (
    <Table.Td>
      <Flex gap={2} direction={'column'} mt={10} align={'center'} >
        <Image src={image} maw={48}/>
        <Text size='xs'>{serial}</Text>
        <Text size='sm' lineClamp={2} maw={120}>{name}</Text>
      </Flex>
    </Table.Td>
  );
}
