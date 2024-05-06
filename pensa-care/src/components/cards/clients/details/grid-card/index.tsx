import { Flex, Image, Text, ColorSwatch, Center, Box } from '@mantine/core';

import sulfIcon from '../../../../../assets/icons/tables/sulf.svg';
import { useHover } from '@mantine/hooks';

export function GridCard({ open }) {
  const { hovered, ref } = useHover();

  return (
    <Box
      style={{
        borderRight: hovered ? 'transparent' : '0.7px solid #b3b3bf52',
        cursor: 'pointer',
        transition: '0.3s',
        backgroundColor: hovered ? '#F9F9FC' : 'initial',
        borderRadius: hovered ? '10px' : '',
      }}
      py={16}
      ref={ref}
    >
      <Center>
        <Flex
          direction={'column'}
          align={'center'}
          maw={{ sm: '155px', lg: '200px' }}
          onClick={() => open()}
        >
          <Image src={sulfIcon} maw={'90px'} />
          <Flex direction={'column'} align={'center'} gap={10}>
            <Text ta={'center'} size="lg" lh={'20px'}>
              Analisador de Enxofre Total Horizontal 230V
            </Text>
            <Text size="11px">S/N: 000X0X0000000</Text>
            <Flex mt={8} align={'center'} gap={10} mr={16}>
              <ColorSwatch size="16px" color="red" />
              <Flex direction={'column'} align={'center'}>
                <Text size="11px">Próx.: 28/12/2023</Text>
                <Text fw={'bold'}>Em 23 dias</Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Center>
    </Box>
  );
}
