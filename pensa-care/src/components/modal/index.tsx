import { Box, Button, Flex, Modal, Text } from '@mantine/core';
import { ModalCard } from '../cards/modal';
import { ModalDetailsCard } from './details';
import { useEffect, useState } from 'react';
import ApiService from '../../services/ApiService';

interface IModalComponent {
  config: {
    opened: boolean;
    close: () => void;
  };
  clientName: string;
  informationalOnly?: boolean;
  equipment: any;
}

const api = new ApiService('');

export function ModalComponent({
  config: { opened, close },
  clientName,
  informationalOnly,
  equipment,
}: IModalComponent) {

  const [currentEquipment, setCurrentEquipment] = useState(equipment);
  currentEquipment

  useEffect(() => {
    const fetch = async () => {
      if(equipment){
        try {
          const response = await api.get(`/api/v1/equipments/services`,
            {
              code: equipment.code,
              serialNumber: equipment.serial_number
            }
          );

          setCurrentEquipment(response.data.content);
        } catch (error) {
          console.error('Erro ao obter os dados:', error);
        }
      }
    }

    fetch();

  }, [equipment]);

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
        {informationalOnly ? <ModalDetailsCard client={clientName} maintenanceHistory={[]} subTitle='' title='' /> : <ModalCard />}

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
