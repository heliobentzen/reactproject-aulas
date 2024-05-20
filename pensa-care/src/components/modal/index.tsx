import { Box, Button, Flex, Modal, Text } from '@mantine/core';
import { ModalCard } from '../cards/modal';
import { ModalDetailsCard } from './details';

interface IModalComponent {
  config: {
    opened: boolean;
    close: () => void;
  };
  clientName: string;
  informationalOnly?: boolean;
  equipment: any;
}

export function ModalComponent({
  config: { opened, close },
  clientName,
  informationalOnly,
  equipment,
}: IModalComponent) {

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        centered
        size={'auto'}
        withCloseButton={false}
        styles={{
          body: { padding: 0, background: '#FAFAFA' },
        }}
      >
        <Flex p={16} align={'center'} gap={15} bg={'white'}>
          {informationalOnly && (
            <Text
              style={{ cursor: 'pointer' }}
              fw={'bold'}
              c={'#112F59'}
              onClick={close}
            >
              Itens
            </Text>
          )}
          <Box>
            <Text size="sm" tt={'uppercase'} c={'#999'}>
              {clientName}
            </Text>
            <Text tt={'uppercase'} fw={'bold'} size="lg">
              Alteração de Status
            </Text>
          </Box>
        </Flex>

        {/* TODO: Add the props in the component */}
        {informationalOnly ? <ModalDetailsCard client={clientName} maintenanceHistory={[]} subTitle='' title='' equipment={equipment} /> : <ModalCard />}

        {!informationalOnly && (
          <Flex gap={10} pb={12} direction={'column'} align={'center'}>
            <Button color="#0855A3" onClick={close}>
              Confirmar Status
            </Button>
            <Button color="#0855A3" variant="transparent" onClick={close}>
              Descartar alteração
            </Button>
          </Flex>
        )}
      </Modal>
    </>
  );
}
