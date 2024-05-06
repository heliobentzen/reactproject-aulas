import { Flex, Select, Text, TextInput, Title } from '@mantine/core';
import { useEffect, useState } from 'react';
import { ITableHeader } from '../../../../interfaces/table/IHeader';

export function TableHeader({
  title,
  result,
  searchPlaceholder,
  columnMode,
  clients,
  setClients
}: ITableHeader & { onSortChange?: (value: string) => void }) {
  const [sortOrder, setSortOrder] = useState('name');
  const [searchValue, setSearchValue] = useState('');
  const [initialClients, setInitialClients] = useState([]);

  useEffect(() => {
    setInitialClients([...clients]);
  }, [clients]);

  const handleSortChange = (selectedOption) => {
    const sortValue = selectedOption;
    setSortOrder(sortValue);
    
    const sortedClients = [...clients].sort((a, b) => {
      if (sortValue == 1) {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
      setClients(sortedClients);
    };

    const handleSearchChange = (event) => {
      const newSearchValue = event.target.value;
      setSearchValue(newSearchValue);
     
      if (newSearchValue === '') {
        setClients(clients);
      } else {
        const newFilteredClients = clients.filter(client =>
          client.name.toLowerCase().includes(newSearchValue.toLowerCase())
        );
        setClients(newFilteredClients);
      }
     
    };

    
  return (
    <Flex pt={30} pb={16} justify={'space-between'}>
      <Flex direction={'column'}>
        <Title c="#030229" size={'h3'}>
          {title}
        </Title>
        <Text c="#999">{result} resultados</Text>
      </Flex>

      {columnMode ? (
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
            onChange={handleSortChange}
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
        <TextInput miw={'260px'} placeholder={searchPlaceholder} value={searchValue} onChange={handleSearchChange} />
        </Flex>
      )}
    </Flex>
  );
}
