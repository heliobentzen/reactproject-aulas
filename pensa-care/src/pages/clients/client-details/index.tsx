import { Box, Flex } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumbs } from '../../../components/breadcrumbs';
import { ClientDetails } from '../../../components/details/index';
import { TableDetails } from '../../../components/tables/clients/details';
import { TableDetailsItems } from '../../../components/tables/clients/details-items';
import { ClientTimeline } from '../../../components/timeline';
import ApiService from '../../../services/ApiService';


export function ClientDetailsPage() {
  const [client, setClient] = useState<any>({});
  const [services, setServices] = useState<any>([]);
  const [itens, setItens] = useState([]);
  const api = new ApiService('');
  const { id } = useParams<{ id: string }>();
  const cnpj = id;
  
  useEffect(() => {
    const fetchClient = async () => {
      try {
        const responseClient = await api.get(`/api/v1/clients/${cnpj}`);
        setClient(responseClient.data);
      } catch (error) {
        console.error('Erro ao obter os dados:', error);
      }
    };

    const fetchServices = async () => {
      try {
        const responseService = await api.get(`/api/v1/clients/${cnpj}/services`);
        setServices(responseService.data.content);
      } catch (error) {
        console.error('Erro ao obter os dados:', error);
      }
    };

    const fetchItens = async () => {
      try {
        const responseItens = await api.get(`/api/v1/clients/${cnpj}/equipments`);
        setItens(responseItens.data.content);
      } catch (error) {
        console.error('Erro ao obter os dados:', error);
      }
    };

    fetchClient();
    fetchServices();
    fetchItens();
  }, [id]);

    
  return (
    <Box
      style={{ overflowY: 'auto', borderRadius: '10px' }}
      h={'calc(100vh - 50px)'}
    >
      <Breadcrumbs client={client}  />
      <ClientTimeline client={client} />

      <Flex
        direction={'column'}
        maw={'calc(100% - 436px)'}
        h={'calc(100vh - 105px)'}
        style={{ borderRadius: '10px' }}
        mt={50}
        bg={'white'}
        mx={4}
        gap={20}
      >
        <ClientDetails client={client} />
        <div id="history-section">
          <TableDetails title={'Histórico de Manutenções'} client={client} result={services.length} />
        </div>
        <TableDetailsItems title={'Histórico de Itens'} client={client} result={itens.length} />
      </Flex>
    </Box>
  );
}
