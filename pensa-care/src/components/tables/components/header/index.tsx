import { Flex, Select, Text, TextInput, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { ITableHeader } from '../../../../interfaces/table/IHeader';

export function TableHeader({
  title,
  result,
  searchPlaceholder,
  columnMode,
  onHandleTableHeaderChange,
}: ITableHeader & { onHandleTableHeaderChange?: ({ sortOrder, searchValue }: { sortOrder: string, searchValue: string }) => void }) {
  const [sortOrder, setSortOrder] = useState('1');
  const [searchValue, setSearchValue] = useState('');
  
  
  const onSortOrderChange = (value: any) => {
    setSortOrder(value);
  }

  const onSearchChange = (event: any) => {
    setSearchValue(event.target.value);
    
  }

  useEffect(() => {
    if (onHandleTableHeaderChange) {
      onHandleTableHeaderChange({ sortOrder, searchValue });
    }
  }, [sortOrder, searchValue]);
  
  return (
    <Flex pt={30} pb={16} justify={'space-between'}>
      <Flex direction={'column'}>
        <Title c="#030229" size={'h3'}>
          {title}
        </Title>
        <Text c="#999">{result} {result <= 1 ? 'resultado' : 'resultados'}</Text>
      </Flex>

      {columnMode ? (
        <Flex direction={'column'} align={'flex-end'}>
          <TextInput miw={'260px'} placeholder={searchPlaceholder} />

          <Flex align={'center'} mt={6}>
            <Text>ordernar por</Text>
            <Select
              onChange={onSortOrderChange}
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
              allowDeselect={false}
              defaultValue={sortOrder}
              data={[
                { value: '1', label: `A-Z` },
                { value: '2', label: 'Z-A' },
              ]}

            />
          </Flex>
        </Flex>
      ) : (
        <Flex align={'center'}>
          <Text>ordernar por</Text>
          <Select
            onChange={onSortOrderChange}
            styles={{
              input: {
                border: 'none',
                paddingLeft: 4,
              },
              dropdown: {
                fontWeight: 900,
              },
              root: {
                fontWeight: 900,
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
        <TextInput miw={'260px'} placeholder={searchPlaceholder} value={searchValue} onChange={onSearchChange} />
        </Flex>
      )}
    </Flex>
  );
}
