import { Box, SimpleGrid } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { GridCard } from '../cards/clients/details/grid-card';
import { GridHeader } from '../grid-header';
import { ClientInfo } from '../info';
import { ModalComponent } from '../modal';

export function ClientDetails() {
  const [opened, { open, close }] = useDisclosure(false);


  return (
    <Box>
      <ClientInfo />
      <GridHeader
        title={`Parques Instalados (${4})`}
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
        {Array(4).fill(<GridCard open={open}/>)}
      </SimpleGrid>

      <ModalComponent
        config={{ opened, close }}
        clientName={'Teste nome'}
        informationalOnly
      />
    </Box>
  );
}
