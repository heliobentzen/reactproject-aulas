import { Avatar, Flex, Indicator, Table, Text } from '@mantine/core';

import { IEquipments } from '../../../../interfaces/table/IClient';

interface ParkProps {
  parks: IEquipments[];
  withIndicator?: boolean;
}

export function ParkClient({ parks, withIndicator }: ParkProps) {
  return (
    <Table.Td>
      <Flex align={'center'}>
        {parks.slice(0, 3).map((park) => (
          <Flex
            maw={'100px'}
            key={park.serial_number}
            c="#999"
            direction={'column'}
          >
            {withIndicator ? (
              <Indicator
                color="#115A91" // Precisar variar de acordo com o tipo de produto
                offset={10}
                size={'18px'}
                position="bottom-center"
                mb={6}
                withBorder
              >
                <Avatar src={park.icon} size="lg" />
              </Indicator>
            ) : (
              <Avatar src={park.icon} size="lg" />
            )}
            <Text size="sm" truncate>
              {park.serial_number}
            </Text>
            <Text size="sm" truncate>
              {park.description}
            </Text>
          </Flex>
        ))}
        {parks.length > 3 && (
          <Avatar
            size="lg"
            ml={10}
            styles={{
              placeholder: {
                fontWeight: '400',
              },
            }}
          >
            +{parks.length-3}
          </Avatar>
        )}
      </Flex>
    </Table.Td>
  );
}
