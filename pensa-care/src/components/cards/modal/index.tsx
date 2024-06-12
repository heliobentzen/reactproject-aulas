import {
  Avatar,
  Divider,
  Flex,
  Select,
  Switch,
  Text,
  TextInput,
  Textarea,
} from '@mantine/core';

import { useState } from 'react';
import ImageApiService from '../../../services/ImageApiService';

interface ModalDetailsCardProps {
  title: string;
  subTitle: string;
  client: string;
  equipment: any;
  lead: any
}

const imageApiService = new ImageApiService();

// Componente temporariamente com informações estáticas e lógica simples
export function ModalCard(card: ModalDetailsCardProps) {
  const [paused, setPaused] = useState(false);
  const [status, setStatus] = useState("N/D");

  const onStatusChanged = (value: any) => {
    setStatus(value);
  }

  return (
    <Flex
      style={{ borderRadius: '10px' }}
      bg={'white'}
      m={28}
      p={28}
      maw={'630px'}
      direction={'column'}
    >
      <Flex direction={'column'}>
        <Text fw={'bold'} c="#0855A3" size={'lg'}>
          Item
        </Text>
        <Flex>
          {/* <Image src={imageApiService.getEquipmentImageUrl(card.equipment.code) || sulfIcon} m={20} ml={20} maw={'90px'} /> */}
          <Avatar src={imageApiService.getEquipmentImageUrl(card.equipment.code)} size="lg" m={20} ml={20} />
          <Flex direction={'column'}>
            <Text c={'#999'} size="xs">
            {card.equipment.code}
            </Text>
            <Text size="xl">
            {card.equipment.description}
            </Text>
            <Text c={'#999'} size="xs">
              Cliente: Cliente: {card.client}
            </Text>
          </Flex>
        </Flex>
        <Divider my={'md'} />
        <form>
          <Flex justify={'space-between'}>
            <Text fw={'bold'} c="#0855A3" size={'lg'}>
              Status
            </Text>
            <Flex align={'flex-start'} gap={10}>
              <Select
                disabled={paused || card.lead.status === null || card.lead.status === 'null'}
                styles={{
                  input: {
                    border: 'none',
                    background: 'none',
                    paddingLeft: 4,
                    color: '#4F9D5C',
                  },
                  dropdown: {
                    fontWeight: 900,
                  },
                  root: {
                    fontWeight: 700,
                  },
                }}
                value={status}
                maw={'115px'}
                withCheckIcon={false}
                defaultValue="4"
                allowDeselect={false}
                data={[
                  { value: 'Atendido', label: `Atendido` },
                  { value: 'Cancelado', label: 'Cancelado' },
                  { value: 'Pausado', label: 'Pausado' },
                  { value: 'N/D', label: 'N/D' },
                ]}
                onChange={onStatusChanged}
              />
              <Switch
                label={paused ? 'Pausado' : 'Pausar'}
                checked={paused}
                onChange={() => setPaused(!paused)}
                styles={{
                  label: {
                    position: 'absolute',
                    bottom: -25,
                    right: 0,
                    marginTop: '10px',
                  },
                }}
                disabled={card.lead.status === null || card.lead.status === 'null'}
              />
            </Flex>
          </Flex>
          {paused && (
            <Flex mt={20} pb={0} align={'center'} gap={10} justify={'flex-end'}>
              <TextInput maw={'45px'} maxLength={2} placeholder="00" />
              <Text size="sm">dias</Text>
            </Flex>
          )}
          {paused && (
            <Textarea
              maxRows={5}
              minRows={5}
              autosize
              size="md"
              description="Justificativa*"
              placeholder="Descreva o motivo da pausa"
            />
          )}
        </form>
      </Flex>
    </Flex>
  );
}
