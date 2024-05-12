import { Box, SimpleGrid } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GridCard } from '../cards/clients/details/grid-card';
import { GridHeader } from '../grid-header';
import { ClientInfo } from '../info';
import { ModalComponent } from '../modal';

export function ClientDetails() {
  const [opened, { open, close }] = useDisclosure(false);
  const token = localStorage.getItem('access_token');
  const api = axios.create({ baseURL: 'http://localhost:8080', });
  
  const { id } = useParams<{ id: string }>();
  const cnpj = 94813102000846;

  const [client, setClient] = useState({});
  const [contacts, setContacts] = useState([]);
  const [items, setItems] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    setClient({
      cnpj: cnpj,
      name: "objClient.name",
      city: "objClient.city",
      uf: "objClient.uf"
    });
  }, []);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const responseContacts = await api.get(`/api/v1/clients/${cnpj}/contacts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setContacts(responseContacts.data);
        console.log('CONTATOS: ' + contacts);
      } catch (error) {
        console.error('Erro ao obter os dados:', error);
      }
    };

    fetchContacts();

  }, [id]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const resItems = await api.get(`/api/v1/clients/${cnpj}/equipments`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setItems(resItems.data.content);
        console.log("ITEMS: " + items);
      } catch (error) {
        console.error('Erro ao obter os dados:', error);
      }
    };

    fetchItems();

  }, [id]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const resServices = await api.get(`/api/v1/clients/${cnpj}/services`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        setServices(resServices.data.content);
        console.log("SERVICOS: " + services);
      } catch (error) {
        console.error('Erro ao obter os dados:', error);
      }
    };
    fetchServices();
  }, [id]);
  

  return (
    <Box>
      <ClientInfo client={client} />
      <GridHeader
        title={`Parques Instalados (${4})`}
        searchPlaceholder="Pesquisar Nome/ Serial number"
      />
      <SimpleGrid
        cols={{ base: 3, sm: 4, lg: 4 }}
        bg={'white'}
        pb={20}
        px={8}
        style={{ borderRadius: '10px' }}
      >
        {/* Temporário */}
        {Array(4).fill(<GridCard open={open}/>)}
      </SimpleGrid>

      <ModalComponent
        config={{ opened, close }}
        clientName={'Teste nome'}
        informationalOnly
      />
    </Box>
  );
}
