import { Box, Flex } from '@mantine/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumbs } from '../../../components/breadcrumbs';
import { ClientDetails } from '../../../components/details/index';
import { TableDetails } from '../../../components/tables/clients/details';
import { ClientTimeline } from '../../../components/timeline';


export function ClientDetailsPage() {
  const [client, setClient] = useState({});
  const [services, setServices] = useState([]);
  const [itens, setItens] = useState([]);
  const token = localStorage.getItem('access_token');
  const api = axios.create({ baseURL: 'http://localhost:8080', });
  const { id } = useParams<{ id: string }>();
  const cnpj = id;
  
  useEffect(() => {
    const fetchClient = async () => {
      try {
        const responseClient = await api.get(`/api/v1/clients/${cnpj}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setClient(responseClient.data);
      } catch (error) {
        console.error('Erro ao obter os dados:', error);
      }
    };

    const fetchServices = async () => {
      try {
        const responseService = await api.get(`/api/v1/clients/${cnpj}/services`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setServices(responseService.data.content);
      } catch (error) {
        console.error('Erro ao obter os dados:', error);
      }
    };

    const fetchItens = async () => {
      try {
        const responseItens = await api.get(`/api/v1/clients/${cnpj}/equipments`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
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
        <TableDetails title={'Histórico de Manutenções'} data={services} result={services.length} />
        {/* <TableDetails title={'Histórico de Itens'} data={itens} result={itens.length} /> */}
      </Flex>
    </Box>
  );
}
