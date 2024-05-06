import { Button, Flex, Text } from '@mantine/core';

export function Footer({ color, radius }) {
  return (
    <Flex h={40} mt={10} align={'center'}>
      <Button
        bg={color ?? '#F2F2F2'}
        variant="filled"
        radius={radius || 'md'}
        onClick={() => {
          console.log('action - see more');
        }}
      >
        <Text c="#030229">Ver mais</Text>
      </Button>
    </Flex>
  );
}
