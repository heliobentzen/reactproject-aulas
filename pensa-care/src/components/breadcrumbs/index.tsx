import { Flex, Text, Title } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IClient } from '../../interfaces/table/IClient';

interface BreadcrumbsProps {
  client: IClient;
}

export function Breadcrumbs({client}: BreadcrumbsProps) {
  return (
    <Flex
      pos={'absolute'}
      top={0}
      left={240}
      py={14.5}
      px={30}
      bg={'white'}
      align={'center'}
      justify={'flex-start'}
      w={'calc(100% - 240px)'}
      style={{
        zIndex: 2,
        boxShadow: '0 2px 4px -1px rgba(0, 0, 0, 0.01)',
      }}
    >
      <Text c={'#112F59'} component={Link} to={'/clients'} fw={500} size="lg">
        Clientes
      </Text>
      <Text fw={500} size="xl" mx={10}>
        {'>'}
      </Text>
      <Title c={'#112F59'} size={'h2'}>
        {client.name}
      </Title>
    </Flex>
  );
}
