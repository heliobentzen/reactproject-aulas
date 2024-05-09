import { Box, Flex } from '@mantine/core';
import { Breadcrumbs } from '../../../components/breadcrumbs';
import { ClientDetails } from '../../../components/details/index';
import { ClientTimeline } from '../../../components/timeline';
import { TableDetails } from '../../../components/tables/clients/details';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export function ClientDetailsPage() {

  //VARIAVEIS E CONSTANTES----------------------------------------------------------------------------------------------------------------
  const token = localStorage.getItem('access_token');
  const api = axios.create({ baseURL: 'http://localhost:8080', });
  const { id } = useParams();
  const objClient = JSON.parse(id);

  //STATES----------------------------------------------------------------------------------------------------------------------------------
  const [client, setClient] = useState({});
  const [contacts, setContacts] = useState([]);
  const [items, setItems] = useState([]);
  const [services, setServices] = useState([]);

  //EFFECTS----------------------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    setClient({
      cnpj: objClient.cnpj,
      name: objClient.name,
      city: objClient.city,
      uf: objClient.uf
    });
  }, []);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const responseContacts = await api.get(`/api/v1/clients/${objClient.cnpj}/contacts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setContacts(responseContacts.data);

      } catch (error) {
        console.error('Erro ao obter os dados:', error);
      }
    };

    fetchContacts();

  }, [id]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const resItems = await api.get(`/api/v1/items?cnpj=${objClient.cnpj}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        //debugger
        setItems(resItems.data.content);

      } catch (error) {
        console.error('Erro ao obter os dados:', error);
      }
    };

    fetchItems();

  }, [id]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const resServices = await api.get(`/api/v1/services?cnpj=${objClient.cnpj}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setServices(resServices.data.content);

      } catch (error) {
        console.error('Erro ao obter os dados:', error);
      }
    };

    fetchServices();

  }, [id]);
  //------------------------------------------------------------------------------------------------------------------------------------------
  
  return (
    <Box
      style={{ overflowY: 'auto', borderRadius: '10px' }}
      h={'calc(100vh - 50px)'}
    >
      <Breadcrumbs />
      <ClientTimeline />

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
        <ClientDetails />
        <TableDetails title={'Histórico de Manutenções'} result={56} />
        <TableDetails title={'Histórico de Peças e Equipamentos'} result={56} />
      </Flex>
    </Box>
  );
}
