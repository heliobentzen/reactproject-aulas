import { Flex } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { Logo } from '../../components/logo';

export function Recovery() {
  return (
    <Flex bg={'#F7F7F8'} h={'100vh'} direction="column" align={'center'}>
      <Logo />
      <Flex
        direction={'column'}
        maw={'600px'}
        justify={'center'}
        align={'center'}
      >
        <Outlet />
      </Flex>
    </Flex>
  );
}
