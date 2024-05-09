import { Box, Flex, Text, Timeline, Title } from '@mantine/core';

import { StepIcon } from '../../assets/icons/timeline/step';
import { Footer } from '../tables/components';

export function ClientTimeline() {
  return (
    <Box
      style={{ zIndex: 3, overflowY: 'auto' }}
      pos={'absolute'}
      h={'100vh'}
      top={0}
      right={0}
      w={'426px'}
      bg="#F4F4F7"
    >
      <Flex direction={'column'} align={'flex-start'} py={24} px={18} gap={33}>
        <Box>
          <Title c={'#112F59'} size={'h3'} pb={8}>
            Histórico de Relacionamento
          </Title>
          <Text c={'#112F59'} size="sm">
            SENAI - São Paulo - Ipiranga
          </Text>

          <Timeline
            bulletSize={28}
            lineWidth={3}
            pt={33}
            styles={{
              itemBullet: {
                border: 'none',
              },
            }}
          >
            <Timeline.Item
              bullet={<StepIcon color={'#C3C985'} />}
              title={<Text fw={'bold'}>28 de outubro de 2023</Text>}
              lineVariant="dashed"
              opacity={0.8}
              c={'dimmed'}
            >
              <Text size="md" c={'#88960E'}>
                Preventiva
              </Text>
              <Text size="xs" mt={4}>
                Alguma descrição...
              </Text>
            </Timeline.Item>

            <Timeline.Item
              bullet={<StepIcon color={'#A32219'} />}
              title={
                <>
                  <Text fw={'bold'}>27 de Junho de 2023</Text>
                  <Text fw={'bold'}>
                    Analisador de Enxofre Total Horizontal 230V
                  </Text>
                </>
              }
            >
              <Text size="md" c={'#A32219'}>
                Corretiva
              </Text>
              <Text size="sm" mt={4}>
                <Text tt="uppercase" component="span">
                  Nome do cliente{' '}
                </Text>
                (Time Sampaio)
              </Text>
              <Text size="sm" component="span" mr={87}>
                Modelo: XXXX
              </Text>
              <Text size="sm" component="span">
                Serial: XXXX
              </Text>

              <br />

              <Text size="sm" component="span" mr={20}>
                Status: Não Operacional
              </Text>
              <Text size="sm" component="span">
                Lansolver: XXXX
              </Text>

              <Text size="sm">Ordem de Serviço: XXXX</Text>
            </Timeline.Item>

            <Timeline.Item
              bullet={<StepIcon color={'#C3C985'} />}
              title={<Text fw={'bold'}>02 de Março de 2023</Text>}
            >
              <Text size="md" c={'#88960E'}>
                Preventiva
              </Text>
              <Text size="xs" mt={4}>
                Alguma descrição...
              </Text>
            </Timeline.Item>

            <Timeline.Item
              bullet={<StepIcon color={'#A32219'} />}
              title={<Text fw={'bold'}>06 de Setembro de 2022</Text>}
            >
              <Text size="md" c={'#A32219'}>
                Corretiva
              </Text>
              <Text size="xs" mt={4}>
                Alguma descrição...
              </Text>
            </Timeline.Item>
            <Timeline.Item
              bullet={<StepIcon color={'#C3C985'} />}
              title={<Text fw={'bold'}>14 de Fevereiro de 2022</Text>}
              mah={'25px'}
            >
              <Text size="md" c={'#88960E'}>
                Preventiva
              </Text>
            </Timeline.Item>
            <br />
            <Box style={{ marginLeft: '-15px' }} pt={4}>
              <Footer color={'#E6E6E8'} radius={'lg'} />
            </Box>
          </Timeline>
        </Box>
      </Flex>
    </Box>
  );
}
