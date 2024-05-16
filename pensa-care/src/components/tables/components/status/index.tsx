import { Button, Flex, Image, Table, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import editIcon from '../../../../assets/icons/tables/edit.svg';
import breakIcon from '../../../../assets/icons/tables/break.svg';

import { IStatus } from '../../../../interfaces/table/IClient';
import { ModalComponent } from '../../../modal';

// A lógica desse componente será alterada de acordo com o retorno que tivermos do back-end.
export function Status({ isFulfilled = false, status, clientName }: IStatus) {
  const [opened, { open, close }] = useDisclosure(false);

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
              open();
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
        <Button
          variant="transparent"
          style={{ border: 'none' }}
          onClick={() => {
            console.log('edit');
            open();
          }}
        >
          <Flex direction={'column'} align={'center'} gap={2} c={'#3C3C3C'}>
            <Image src={editIcon} w={'16px'} />
            <Text size="sm">Editar</Text>
          </Flex>
        </Button>
      </Flex>
      <ModalComponent
        config={{ opened, close }}
        clientName={clientName || ''}
        equipment={undefined}
      />
    </Table.Td>
  );
}
