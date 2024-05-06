import { Flex } from '@mantine/core';

import { Outlet } from 'react-router-dom';
import pensaCareImg from '../../assets/images/pensacare.png';
import { Logo } from '../../components/logo';

export function Auth() {
  return (
    <Flex
      justify={'space-between'}
      styles={{ root: { height: '100vh', overflowX: 'hidden' } }}
    >
      <Flex
        direction={'column'}
        p={30}
        styles={{
          root: { width: '100%', minWidth: '400px', maxWidth: '500px' },
        }}
      >
        <Logo mb={0} />

        <Outlet />
      </Flex>
      <img src={pensaCareImg} alt="Pensa Care" />
    </Flex>
  );
}
