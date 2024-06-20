import { Box, Flex } from '@mantine/core';

import { CardNumber } from '../../components/cards/dashboard';
import { Header } from '../../components/header';
import { TableDashboard } from '../../components/tables';

import {
  // CipherIcon,
  LeadIcon,
  PhoneIcon,
  // SaleIcon,
} from '../../assets/icons/cards/dashboard';
import { useEffect, useState } from 'react';
import ApiService from '../../services/ApiService';

const api = new ApiService('');

export function DashboardPage() {
  const [total120, setTotal120] = useState(1);
  const [total30, setTotal30] = useState(1);

  const fetchLeads = async () => {
    const today = new Date().toISOString().split('T')[0];
    
    const daysAgo120Date = new Date();
    daysAgo120Date.setDate(daysAgo120Date.getDate() - 120);
    const daysAgo120 = daysAgo120Date.toISOString().split('T')[0];

    const daysAgo30Date = new Date();
    daysAgo30Date.setDate(daysAgo30Date.getDate() - 30);
    const daysAgo30 = daysAgo30Date.toISOString().split('T')[0];

    const url120 = `/api/v1/leads?page=0&size=12&sort=nextService&before=${today}&after=${daysAgo120}`;
    const url30 = `/api/v1/leads?page=0&size=12&sort=nextService&before=${today}&after=${daysAgo30}`;

    const response120 = await api.get(url120);
    const response30 = await api.get(url30);

    setTotal120(response120.data.total_elements);
    setTotal30(response30.data.total_elements);
  };

  useEffect(() => {
    fetchLeads();
  }, []);
  
  return (
    <Box mx={24}>
      <Header title="Dashboard" />
      <Flex gap={18}>
        <CardNumber
          Icon={PhoneIcon}
          number={total120}
          text="leads de manutenção nos últimos"
          days={120}
        />
        {/* <CardNumber
          Icon={CipherIcon}
          number={56}
          text="leads de compras nos últimos"
          days={120}
        /> */}
        <CardNumber
          Icon={LeadIcon}
          number={total30}
          text="leads de manutenção contatados nos últimos"
          days={30}
        />
        {/* <CardNumber
          Icon={SaleIcon}
          number={9}
          text="leads de compras contatados nos últimos"
          days={30}
        /> */}
      </Flex>
      <Flex direction="column" gap={24}>
        <TableDashboard
          title="Leads de Manutenção" data={[]} result={0} searchPlaceholder={''}/>
        {/* <TableDashboard
          title="Leads de Venda"
          result={56} // data.length
          data={mockClientData} 
          searchPlaceholder={''}        
        /> */}
      </Flex>
    </Box>
  );
}
