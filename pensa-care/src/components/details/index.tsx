import { Box, SimpleGrid } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IClient } from '../../interfaces/table/IClient';
import { IContact } from '../../interfaces/table/IContact';
import ApiService from '../../services/ApiService';
import { GridCard } from '../cards/clients/details/grid-card';
import { GridHeader } from '../grid-header';
import { ClientInfo } from '../info';
import { ModalComponent } from '../modal';

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

  const openModalCardPark = async (item: any) => {
    const fetch = async () => {
      if(item){
        try {
          const response = await api.get(`/api/v1/equipments/services?code=${item.code}&serialNumber=${item.serial_number}`);
          const sortedServiceHistory = response.data.service_history.sort((a: { date: string | number | Date; }, b: { date: string | number | Date; }) => new Date(b.date).getTime() - new Date(a.date).getTime());
          response.data.service_history = sortedServiceHistory;
          setSelectedItem(response.data);
        } catch (error) {
          console.error('Erro ao obter os dados:', error);
        }
      }
    }

    await fetch();
    open();
  }
  
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const responseContacts = await api.get(`/api/v1/clients/${cnpj}/contacts`);
        const sortedContacts = responseContacts.data.sort((a: { name: string; }, b: { name: any; }) => a.name.localeCompare(b.name));
        setContacts(sortedContacts);
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
        type="container"
        cols={{ base: 3, sm: 2, lg: 5 }}
        spacing={{ base: 10, sm: 'xl' }}
        pb={20}
      >
        {items.map((d) => (<GridCard open={openModalCardPark} item={d}/>))}
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