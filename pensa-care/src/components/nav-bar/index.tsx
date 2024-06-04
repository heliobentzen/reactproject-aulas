import { AppShell, Box, NavLink } from '@mantine/core';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ClientsIcon,
  ConfigIcon,
  DashBoardIcon,
  ItensIcon,
  ServicesIcon
} from '../../assets/icons/nav';
import { Logo } from '../logo';

// Exemplo de subitens em Configurações
const configSubitems = [
  {
    title: 'Usuários',
    src: '/users',
  },
  {
    title: 'Relação Vendedor/Cliente',
    src: '/config',
  },
];

const data = [
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
  {
    Icon: ConfigIcon,
    title: 'Configurações',
    src: '/config',
    // Adicione os subitens aqui
    subitems: configSubitems,
  },
];

export function NavBar() {
  const [active, setActive] = useState(0);

  const navLinks = data.map(({ src, title, Icon, subitems }, index) => {
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
      >
        {/* Renderize os subitens dentro do NavLink de Configurações */}
        {subitems && subitems.map((subitem) => (
          <NavLink
            component={Link}
            to={subitem.src}
            key={subitem.title}
            active={false} // Subitens não precisam ficar ativos
            label={subitem.title}
            h={48}
            pl={30}
          />
        ))}
      </NavLink>
    );
  });

  return (
    <AppShell.Navbar withBorder={false}>
      <Logo mt={32} mb={32} />
      <Box>{navLinks}</Box>
    </AppShell.Navbar>
  );
}
