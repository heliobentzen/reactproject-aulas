import { Center, Flex, Text } from '@mantine/core';
import React from 'react';

interface ICardNumber {
  Icon: () => React.ReactElement;
  text: string;
  number: number;
  days: number;
}

export function CardNumber({ Icon, text, number, days }: ICardNumber) {
  return (
    <Center
      mb={24}
      bg={'white'}
      style={{ borderRadius: '10px', height: '120px' }}
      miw={'205px'}
    >
      <Flex p={24} justify={'space-between'} align={'center'} h={'120px'}>
        <Icon />
        <Text size="md" c="#030229">
          <Text
            fw={'bold'}
            size="20px"
            span
            style={{ fontFamily: 'Diodrum Cyrillic' }}
          >
            {number}{' '}
          </Text>
          {text}{' '}
          <Text span style={{ fontWeight: 700 }}>
            {days} dias
          </Text>
        </Text>
      </Flex>
    </Center>
  );
}
