import {
  ColorSwatch,
  Flex,
  Select,
  Text,
  TextInput,
  Title,
} from '@mantine/core';

export function GridHeader({ title, searchPlaceholder }) {
  return (
    <Flex px={24} pt={30} pb={16} justify={'space-between'}>
      <Flex direction={'column'}>
        <Title c="#030229" size={'h3'}>
          {title}
        </Title>
        <Flex mt={6} align={'center'} gap={5}>
          <Text size="sm" mr={10}>
            Prazo:{' '}
          </Text>
          <ColorSwatch size={'16px'} color="#EF452F" />{' '}
          <Text size="sm" mr={5}>
            0-90 dias
          </Text>
          <ColorSwatch size={'16px'} color="#FFD66B" />
          <Text size="sm" mr={5}>
            90-120 dias
          </Text>
          <ColorSwatch size={'16px'} color="#2CC84A" />
          <Text size="sm" mr={5}>
            mais de 120 dias
          </Text>
        </Flex>
      </Flex>

      <Flex direction={'column'} align={'flex-end'}>
        <TextInput miw={'260px'} placeholder={searchPlaceholder} />

        <Flex align={'center'} mt={6}>
          <Text>ordernar por</Text>
          <Select
            styles={{
              input: {
                border: 'none',
                paddingLeft: 10,
              },
              dropdown: {
                fontWeight: 900,
              },
              root: {
                fontWeight: 900,
              },
              section: {
                paddingLeft: 10,
              },
            }}
            miw={'70px'}
            w={'70px'}
            withCheckIcon={false}
            defaultValue="1"
            allowDeselect={false}
            data={[
              { value: '1', label: `A-Z` },
              { value: '2', label: 'Z-A' },
            ]}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
