import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Outlet } from 'react-router-dom';
import { User } from '../../components/user';
import { NavBar } from '../../components/nav-bar';

export function Dashboard() {
  const [opened] = useDisclosure();

  return (
    <AppShell
      header={{ height: 65 }}
      navbar={{
        width: 248,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header w={248}>
        <User />
      </AppShell.Header>

      <NavBar />

      <AppShell.Main bg="#F9F9FC" pt={32}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
