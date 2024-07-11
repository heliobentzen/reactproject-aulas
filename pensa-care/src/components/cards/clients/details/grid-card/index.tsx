import { Box, Center, ColorSwatch, Flex, Image, Text } from '@mantine/core';

import { useHover } from '@mantine/hooks';
import { differenceInCalendarDays } from 'date-fns';
import sulfIcon from '../../../../../assets/icons/tables/sulf.svg';
import ImageApiService from '../../../../../services/ImageApiService';

const imageApiService = new ImageApiService();

export function GridCard({ open, item }: any) {
  const { hovered, ref } = useHover();
  
  const today = new Date();
  const nextService = item.next_service ? new Date(item.next_service) : null;
  const diffDays = nextService ? differenceInCalendarDays(nextService, today) : null;
  let color = "red";
  if(diffDays){
    if(diffDays > 120){
      color = "green"
    }else if(diffDays >= 90){
      color = "yellow"
    }
  }

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
          onClick={() => open(item)}
        >
          <Image src={imageApiService.getEquipmentImageUrl(item.code) || sulfIcon} maw={'70px'}
          alt="Equipment Image"
          onError={(e) => {
            const imgElement = e.target as HTMLImageElement;
            imgElement.src = sulfIcon
          }} />
          <Flex direction={'column'} align={'center'} gap={10}>
            <Text ta={'center'} size="md" lh={'16px'}>
              {item.description}
            </Text>
            <Text size="10px">S/N: {item.serial_number}</Text>
            <Flex mt={8} align={'center'} gap={10} mr={16}>
              <ColorSwatch size="16px" color={color} />
              <Flex direction={'column'} align={'center'}>
                <Text size="11px">
                  Próx.: {item.next_service ? new Date(item.next_service).toLocaleDateString() : 'N/D'}
                </Text>
                <Text fw={'bold'}>{diffDays === 1 ? `Em 1 dia` : diffDays ? `Em ${diffDays} dias` : "N/D"}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Center>
    </Box>
  );
}
