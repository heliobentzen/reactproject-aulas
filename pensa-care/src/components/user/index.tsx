import { Avatar, Button, Center, Flex, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import logoutIco from '../../assets/icons/logout.svg';

const logout = () => {
  // Remove the access_token and expires_at from localStorage
  localStorage.removeItem('access_token');
  localStorage.removeItem('expires_at');
};

export function User() {
  return (
    <Flex justify={'space-between'} p={10}>
      <Avatar size="45" radius="md" src="" />
      <Flex direction={'column'}>
        <Text>{localStorage.getItem('username')}</Text>
        <Text c='#999' size="xs">Peças e Serviços</Text>
      </Flex>
      <Center>
        <Button variant="transparent" component={Link} to={'/login'} onClick={logout}>
          <img src={logoutIco} alt="Sair" />
        </Button>
      </Center>
    </Flex>
  );
}