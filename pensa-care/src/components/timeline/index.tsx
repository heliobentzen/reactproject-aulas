import { Box, Flex, Text, Timeline, Title } from '@mantine/core';

import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react';
import { StepIcon } from '../../assets/icons/timeline/step';
import { IClient } from '../../interfaces/table/IClient';
import ApiService from '../../services/ApiService';
import { Footer } from '../tables/components';

interface ClientTimelineProps {
  client: IClient;
}


export function ClientTimeline({client}: ClientTimelineProps) {
  const [services, setServices] = useState<any>([]);
  const api = new ApiService('');
  const cnpj = client.cnpj;
  
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const responseService = await api.get(`/api/v1/clients/${cnpj}/services`);
        setServices(responseService.data.content);
      } catch (error) {
        console.error('Erro ao obter os dados:', error);
      }
    };

    fetchServices();
  });

  const handleClick = () => {
    const timelineSection = document.getElementById('history-section');
    if (timelineSection) {
      timelineSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
            {client.name}
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

          {services.slice(0, 5).map((d: { type: string; date: string | number | Date; description: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => (
            <Timeline.Item
              bullet={<StepIcon color={d.type === 'MAINTENANCE' ? '#A32219' : '#C3C985'} />}
              title={<Text fw={'bold'}>{d.date ? new Date(d.date).toLocaleDateString('pt-BR') : 'N/D'}</Text>}
              lineVariant="dashed"
              opacity={0.8}
              c={'dimmed'}
            >
              <Text size="md" c={d.type === 'MAINTENANCE' ? '#A32219' : '#88960E'}>
                {d.type === 'MAINTENANCE' ? 'Corretiva' : 'Preventiva'}
              </Text>
              <Text size="xs" mt={4}>
                {d.description}
              </Text>

            </Timeline.Item>
          ))}
            <br />
            <Box style={{ marginLeft: '-15px' }} pt={4}>
              <Footer onHandleClick={handleClick} color={'#E6E6E8'} radius={'lg'} />
            </Box>
          </Timeline>
        </Box>
      </Flex>
    </Box>
  );
}
