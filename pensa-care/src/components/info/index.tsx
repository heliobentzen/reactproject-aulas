import { Flex, Text, Title } from '@mantine/core';

export function ClientInfo() {
  return (
    <Flex
      direction={'column'}
      py={24}
      gap={4}
      style={{ borderRadius: '10px' }}
      px={24}
      c={'#030229'}
    >
      <Title mb={8} c={'#0855A3'} size={'h1'}>
        SENAI - São Paulo - Ipiranga
      </Title>
      <Text> XX.XXX.XXX/0001-XX</Text>
      <Text>
        R. Moreira de Godói, 226 - Ipiranga, São Paulo - SP, 04266-060
      </Text>
      <Text>Carine Santos</Text>
      <Text>carine.santos@senai.sp.br</Text>
      <Text>+55 00000-0000</Text>
    </Flex>
  );
}
