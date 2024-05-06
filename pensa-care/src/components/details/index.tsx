import { Box, SimpleGrid } from '@mantine/core';
import { ClientInfo } from '../info';
import { GridHeader } from '../grid-header';
import { GridCard } from '../cards/clients/details/grid-card';
import { useDisclosure } from '@mantine/hooks';
import { ModalComponent } from '../modal';

export function ClientDetails() {
  const [opened, { open, close }] = useDisclosure(false);


  return (
    <Box>
      <ClientInfo />
      <GridHeader
        title={`Parques Instalados (${8})`}
        searchPlaceholder="Pesquisar Nome/ Serial number"
      />
      <SimpleGrid
        cols={{ base: 3, sm: 4, lg: 4 }}
        bg={'white'}
        pb={20}
        px={8}
        style={{ borderRadius: '10px' }}
      >
        {/* Temporário */}
        {Array(8).fill(<GridCard open={open}/>)}
      </SimpleGrid>

      <ModalComponent
        config={{ opened, close }}
        clientName={'Teste nome'}
        informationalOnly
      />
    </Box>
  );
}
