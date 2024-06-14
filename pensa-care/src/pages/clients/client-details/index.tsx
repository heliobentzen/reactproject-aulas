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
  const [items, setItems] = useState([]);
  const api = new ApiService('');
  const { id } = useParams<{ id: string }>();
  const cnpj = id;
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientResponse, servicesResponse, itemsResponse] = await Promise.all([
          api.get(`/api/v1/clients/${cnpj}`),
          api.get(`/api/v1/clients/${cnpj}/services`),
          api.get(`/api/v1/clients/${cnpj}/equipments`),
        ]);
  
        setClient(clientResponse.data);
        setServices(servicesResponse.data.content);
        setItems(itemsResponse.data.content);
      } catch (error) {
        console.error('Erro ao obter os dados:', error);
      }
    };
  
    fetchData();
  }, [cnpj]);
  

  
    
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
        <TableDetailsItems title={'Histórico de Itens'} client={client} result={items.length} />
      </Flex>
    </Box>
  );
}
