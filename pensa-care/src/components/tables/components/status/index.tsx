import { Button, Flex, Image, Table, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import breakIcon from '../../../../assets/icons/tables/break.svg';
import editIcon from '../../../../assets/icons/tables/edit.svg';

import { useState } from 'react';
import { IStatus } from '../../../../interfaces/table/IClient';
import ApiService from '../../../../services/ApiService';
import { ModalComponent } from '../../../modal';

// A lógica desse componente será alterada de acordo com o retorno que tivermos do back-end.
export function Status({ isFulfilled = false, status, clientName, serialNumber, code, lead }: IStatus) {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedItem, setSelectedItem] = useState();
  const api = new ApiService('');

  const openModal = async () => {
    const fetch = async () => {
      if(serialNumber && code){
        try {
          const response = await api.get(`/api/v1/equipments/services?code=${code}&serialNumber=${serialNumber}`);

          setSelectedItem(response.data);
        } catch (error) {
          console.error('Erro ao obter os dados:', error);
        }
      }
    }

    await fetch();
    open();
  }

  return (
    <Table.Td>
      <Flex justify={'space-between'} align={'center'}>
        {isFulfilled ? (
          <Button
            pl={26}
            variant="transparent"
            onClick={() => {
              console.log('action - change status');
              open();
            }}
          >
            <Text fw={'bold'} c={'green'}>
              {status}
            </Text>
          </Button>
        ) : (
          <Button
            variant="transparent"
            p={0}
            color="black"
            onClick={() => {
              console.log('action - break');
              openModal();
            }}
          >
            <Flex direction={'column'} align={'center'} mr={20} gap={4}>
              <Image src={breakIcon} w={'10px'} />
              <Text size="sm" fw={'bold'}>
                {status}
              </Text>
            </Flex>
          </Button>
        )}
        <Button variant="transparent" onClick={openModal}>
          <Flex direction="column" align="center" gap={2} c="#3C3C3C">
            <Image src={editIcon} w={"16px"} />
            <Text size="sm">Editar</Text>
          </Flex>
        </Button>
      </Flex>
      <ModalComponent
        config={{ opened, close }}
        clientName={clientName || ''}
        equipment={selectedItem}
        lead={lead}
      />
    </Table.Td>
  );
}
