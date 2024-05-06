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

function TimelineCardBody({
  technician,
  time,
  model,
  status,
  serviceOrder,
  serial,
  lansolver,
}: TimelineCardBodyProps) {
  // TODO: Add the props in the component
  return (
    <Flex maw={520} pos={'relative'}>
      <Flex direction="column" gap={2}>
        <Flex direction="column" gap={4}>
          <Flex mt={2} justify={'space-between'} align={'center'} maw={170}>
            <Text fw={'bold'} tt="uppercase" size="sm" mt={4}>
              Técnico
            </Text>
            <Text></Text>
          </Flex>
          <Flex justify={'space-between'} align={'center'} maw={205}>
            <Text fw={'bold'} tt="uppercase" size="sm" mr={87}>
              Time
            </Text>
          </Flex>
          <Flex justify={'space-between'} align={'center'} maw={202}>
            <Text fw={'bold'} tt="uppercase" size="sm">
              Modelo
            </Text>
            <Text>02930B1</Text>
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
              Não operacional
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
          <Text>XXXXXXXXXXXXXXXXX</Text>
        </Flex>
      </Flex>

      <Flex direction="column" pos={'absolute'} left={190} top={56}>
        <Flex justify={'space-between'} align={'center'}>
          <Text fw={'bold'} tt="uppercase" size="sm" ml={30}>
            Serial
          </Text>
          <Text ml={30}>35164</Text>
        </Flex>
        <Flex justify={'space-between'} align={'center'}>
          <Text fw={'bold'} tt="uppercase" size="sm" ml={30}>
            Lansolver
          </Text>
          <Text ml={30}>35164</Text>
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
    details: TimelineCardBodyProps;
  }>;
}

export function ModalDetailsCard({
  title,
  subTitle,
  client,
  maintenanceHistory,
}: ModalDetailsCardProps) {
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
              03-111
            </Text>
            <Text lh={1.25} size="xl">
              Contador Automático de Partículas para Líquidos SBSS TÉCNICO
            </Text>
            <Text c={'#999'} size="xs">
              Cliente: Caterpillar Piracicaba
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
          <Timeline.Item
            bullet={<StepIcon color={'#95A317'} />}
            title="ANALISADOR SERVOTOUCH LASER PARA PROCESSO - 35164"
            pos={'relative'}
            c={'#72707B'}
          >
            <Flex gap={30} pos={'absolute'} top={0} left={-120}>
              <Text fw={'bold'}>
                10/09/2022
                <Text ta={'center'} size="md" c={'#88960E'}>
                  Preventiva
                </Text>
              </Text>
            </Flex>

            <TimelineCardBody />
          </Timeline.Item>

          <Timeline.Item
            bullet={<StepIcon color={'#95A317'} />}
            title="ANALISADOR SERVOTOUCH LASER PARA PROCESSO - 35164"
            pos={'relative'}
            c={'#72707B'}
          >
            <Flex gap={30} pos={'absolute'} top={0} left={-120}>
              <Text fw={'bold'}>
                10/09/2022
                <Text ta={'center'} size="md" c={'#88960E'}>
                  Preventiva
                </Text>
              </Text>
            </Flex>

            {/* TODO: Add the props in the component */}
            <TimelineCardBody />
          </Timeline.Item>
        </Timeline>
      </Flex>
    </Flex>
  );
}
