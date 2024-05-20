import { Divider, Flex, Image, Text, Timeline, Title } from '@mantine/core';

import sulfIcon from '../../../assets/icons/cards/modal/sulf.svg';
import { StepIcon } from '../../../assets/icons/timeline/step';

interface TimelineCardBodyProps {
  technician: string;
  time: string;
  model: string;
  status: string;
  serviceOrder: string;
  serial: string;
  lansolver: string;
}

function TimelineCardBody(props: TimelineCardBodyProps) {
  // TODO: Add the props in the component
  props
  return (
    <Flex maw={520} pos={'relative'}>
      <Flex direction="column" gap={2}>
        <Flex direction="column" gap={4}>
          <Flex mt={2} justify={'space-between'} align={'center'} maw={170}>
            <Text fw={'bold'} tt="uppercase" size="sm" mt={4}>
              TÉCNICO
            </Text>
            <Text>{props.technician}</Text>
          </Flex>
          <Flex justify={'space-between'} align={'center'} maw={205}>
            <Text fw={'bold'} tt="uppercase" size="sm" mr={87}>
              TIME
            </Text>
            <Text>{props.time}</Text>
          </Flex>
          <Flex justify={'space-between'} align={'center'} maw={202}>
            <Text fw={'bold'} tt="uppercase" size="sm">
              Modelo
            </Text>
            <Text>{props.model}</Text>
          </Flex>
          {/* Ajustar tamanho de largura após dados do back-end */}
          <Flex align={'center'} maw={205} justify="space-between">
            <Text fw={'bold'} tt="uppercase" size="sm">
              Status
            </Text>
            <Text
              tt={'uppercase'}
              style={{
                whiteSpace: 'nowrap',
              }}
              mb={2}
            >
              {props.status}
            </Text>
          </Flex>
        </Flex>

        <Flex justify={'space-between'} align={'center'}>
          <Text
            fw={'bold'}
            tt="uppercase"
            size="sm"
            mr={77}
            style={{
              whiteSpace: 'nowrap',
            }}
          >
            Ordem de serviço
          </Text>
          <Text>{props.serviceOrder}</Text>
        </Flex>
      </Flex>

      <Flex direction="column" pos={'absolute'} left={190} top={56}>
        <Flex justify={'space-between'} align={'center'}>
          <Text fw={'bold'} tt="uppercase" size="sm" ml={30}>
            Serial
          </Text>
          <Text ml={30}>{props.serial}</Text>
        </Flex>
        <Flex justify={'space-between'} align={'center'}>
          <Text fw={'bold'} tt="uppercase" size="sm" ml={30}>
            Lansolver
          </Text>
          <Text ml={30}>{props.lansolver}</Text>
        </Flex>
        <Text></Text>
      </Flex>
    </Flex>
  );
}

interface ModalDetailsCardProps {
  title: string;
  subTitle: string;
  client: string;
  maintenanceHistory: Array<{
    date: string;
    type: string;
    description: TimelineCardBodyProps;
  }>;
  equipment: any
}

export function ModalDetailsCard(card: ModalDetailsCardProps) {
  // TODO: Add the props in the component
  
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
        <Title c="#0855A3" size={'h4'}>
          Equipamento
        </Title>
        <Flex align={'center'}>
          <Image src={sulfIcon} m={20} ml={0} />
          <Flex direction={'column'}>
            <Text lh={1.25} c={'#999'} size="xs">
              {card.equipment.code}
            </Text>
            <Text lh={1.25} size="xl">
              {card.equipment.description}
            </Text>
            <Text c={'#999'} size="xs">
              Cliente: {card.client}
            </Text>
          </Flex>
        </Flex>
        <Divider my={'md'} />
        <Title c={'#0855A3'} size={'h4'}>
          Histórico de manutenções
        </Title>
        <Timeline
          bulletSize={28}
          lineWidth={3}
          pt={33}
          styles={{
            itemBullet: {
              border: 'none',
            },
            root: {
              marginLeft: '130px',
            },
            itemTitle: {
              fontWeight: 400,
              color: '#72707B',
              opacity: 0.9,
              fontSize: '12px',
            },
          }}
        >

          {card.equipment.service_history.map((d: any ) => (
              <Timeline.Item
              bullet={<StepIcon color={d.type === 'MAINTENANCE' ? '#A32219' : '#C3C985'} />}
              title="ANALISADOR SERVOTOUCH LASER PARA PROCESSO - 35164"
              pos={'relative'}
              c={'#72707B'}
            >
              <Flex gap={30} pos={'absolute'} top={0} left={-120}>
                <Text fw={'bold'}>
                  {new Date(d.date).toLocaleDateString()}
                  <Text ta={'center'} size="md" c={d.type === 'MAINTENANCE' ? '#A32219' : '#88960E'}>
                  {d.type === 'MAINTENANCE' ? 'Corretiva' : 'Preventiva'}
                  </Text>
                </Text>
              </Flex>

              <TimelineCardBody lansolver='N/D' model={card.equipment.model} serial={d.serial_number} serviceOrder={d.order_number} status='N/D' technician={d.technician} time='N/D' />
            </Timeline.Item>
          ))}
        </Timeline>
      </Flex>
    </Flex>
  );
}
