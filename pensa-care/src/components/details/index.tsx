import { Box, SimpleGrid } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IClient } from '../../interfaces/table/IClient';
import { GridCard } from '../cards/clients/details/grid-card';
import { GridHeader } from '../grid-header';
import { ClientInfo } from '../info';
import { ModalComponent } from '../modal';
import ApiService from '../../services/ApiService';
import { IContact } from '../../interfaces/table/IContact';

interface ClientDetailsProps {
  client: IClient;
}


export function ClientDetails({client}: ClientDetailsProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const api = new ApiService('');
  
  const { id } = useParams<{ id: string }>();
  const cnpj = id;

  
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState();

  const openModal = (item: any) => {
    setSelectedItem(item);
    open();
  }
  
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const responseContacts = await api.get(`/api/v1/clients/${cnpj}/contacts`);
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
        const resItems = await api.get(`/api/v1/clients/${cnpj}/equipments`);
        setItems(resItems.data.content);
      } catch (error) {
        console.error('Erro ao obter os dados:', error);
      }
    };
    fetchItems();
  }, [id]);  

  return (
    <Box>
      

      <ClientInfo 
        client={client} 
        contacts={contacts}
      />
      <GridHeader
        title={`Parques Instalados (${items.length})`}
        searchPlaceholder="Pesquisar Nome/ Serial number"
      />
      <SimpleGrid
        cols={{ base: 3, sm: 4, lg: 4 }}
        bg={'white'}
        pb={20}
        px={8}
        style={{ borderRadius: '10px' }}
      >

        {items.map((d) => (
            <GridCard open={openModal} item={d}/>
          ))}
      </SimpleGrid>

      <ModalComponent
        config={{ opened, close }}
        clientName={client.name}
        informationalOnly
        equipment={selectedItem}
      />
    </Box>
  );
}
