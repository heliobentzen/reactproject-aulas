import { Box, Flex } from '@mantine/core';

import { CardNumber } from '../../components/cards/dashboard';
import { Header } from '../../components/header';
import { TableDashboard } from '../../components/tables';

import {
  CipherIcon,
  LeadIcon,
  PhoneIcon,
  SaleIcon,
} from '../../assets/icons/cards/dashboard';

import { mockClientData } from '../../__mock__/data';

export function DashboardPage() {
  return (
    <Box mx={24}>
      <Header title="Dashboard" />
      <Flex gap={18}>
        <CardNumber
          Icon={PhoneIcon}
          number={56}
          text="leads de manutenção nos últimos"
          days={120}
        />
        <CardNumber
          Icon={CipherIcon}
          number={56}
          text="leads de compras nos últimos"
          days={120}
        />
        <CardNumber
          Icon={LeadIcon}
          number={12}
          text="leads de manutenção contatados nos últimos"
          days={30}
        />
        <CardNumber
          Icon={SaleIcon}
          number={9}
          text="leads de compras contatados nos últimos"
          days={30}
        />
      </Flex>
      <Flex direction="column" gap={24}>
        <TableDashboard
          title="Leads de Manutenção"
          result={56} // data.length
          data={mockClientData} 
          searchPlaceholder={''} 
        />
        <TableDashboard
          title="Leads de Venda"
          result={56} // data.length
          data={mockClientData} 
          searchPlaceholder={''}        
        />
      </Flex>
    </Box>
  );
}
