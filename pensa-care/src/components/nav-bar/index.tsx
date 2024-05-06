import { AppShell, Box, NavLink } from '@mantine/core';
import { Logo } from '../logo';
import {
  DashBoardIcon,
  ClientsIcon,
  ItensIcon,
  ServicesIcon,
} from '../../assets/icons/nav';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavIcon } from '../../interfaces/NavIcon';

interface INavLink {
  Icon: ({ active }: NavIcon) => React.ReactElement;
  title: string;
  src: string;
}

const data: INavLink[] = [
  {
    Icon: DashBoardIcon,
    title: 'Dashboard',
    src: '/dashboard',
  },
  {
    Icon: ClientsIcon,
    title: 'Clientes',
    src: '/clients',
  },
  {
    Icon: ItensIcon,
    title: 'Itens',
    src: '/itens',
  },
  {
    Icon: ServicesIcon,
    title: 'Serviços',
    src: '/services',
  },
];

export function NavBar() {
  const [active, setActive] = useState(0);

  const navLinks = data.map(({ src, title, Icon }, index) => {
    const isActive = index === active;

    return (
      <NavLink
        component={Link}
        to={src}
        key={title}
        active={isActive}
        label={title}
        leftSection={<Icon active={isActive} />}
        onClick={() => setActive(index)}
        h={48}
        pl={30}
        styles={{
          root: {
            fontWeight: 600,
            color: isActive ? '#0855A3' : '#999',
            background: isActive
              ? 'linear-gradient(to right, #adc6de 0.1%, #FFFFFF 20%)'
              : '',
          },
        }}
      />
    );
  });

  return (
    <AppShell.Navbar withBorder={false}>
      <Logo mt={32} mb={32} />
      <Box>{navLinks}</Box>
    </AppShell.Navbar>
  );
}
