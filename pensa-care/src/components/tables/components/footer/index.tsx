import { Button, Flex, Text } from '@mantine/core';

export function Footer({ color, radius, onHandleClick }: 
  { color: string | undefined, radius: string | undefined, onHandleClick: () => void }) {
  return (
    <Flex h={40} mt={10} align={'center'}>
      <Button
        bg={color ?? '#F2F2F2'}
        variant="filled"
        radius={radius || 'md'}
        onClick={onHandleClick}
      >
        <Text c="#030229">Ver mais</Text>
      </Button>
    </Flex>
  );
}