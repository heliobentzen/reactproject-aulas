import { Box, Flex } from '@mantine/core';
import { Breadcrumbs } from '../../../components/breadcrumbs';
import { ClientDetails } from '../../../components/details/index';
import { TableDetails } from '../../../components/tables/clients/details';
import { ClientTimeline } from '../../../components/timeline';


export function ClientDetailsPage() {

    
  return (
    <Box
      style={{ overflowY: 'auto', borderRadius: '10px' }}
      h={'calc(100vh - 50px)'}
    >
      <Breadcrumbs />
      <ClientTimeline />

      <Flex
        direction={'column'}
        maw={'calc(100% - 436px)'}
        h={'calc(100vh - 105px)'}
        style={{ borderRadius: '10px' }}
        mt={50}
        bg={'white'}
        mx={4}
        gap={20}
      >
        <ClientDetails />
        <TableDetails title={'Histórico de Manutenções'} result={56} />
        <TableDetails title={'Histórico de Itens'} result={10} />
      </Flex>
    </Box>
  );
}
