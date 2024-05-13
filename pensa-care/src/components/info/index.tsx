import { Accordion, Flex, Text, Title } from '@mantine/core';
import { IClient } from '../../interfaces/table/IClient';
import { IContact } from '../../interfaces/table/IContact';

interface ClientInfoProps {
  client: IClient;
  contacts: IContact;
}

export function ClientInfo({ client, contacts }: ClientInfoProps) {
  return (
    <Flex
      direction={'column'}
      py={24}
      gap={4}
      style={{ borderRadius: '10px' }}
      px={24}
      c={'#030229'}
    >
      <Title mb={8} c={'#0855A3'} size={'h1'}>{client.name}</Title>
      <Text>CNPJ: {client.cnpj}</Text>
      <Text>{client.city} / {client.uf}</Text>
      <Text>Contatos:</Text>
      <Accordion>
        {Array.isArray(contacts) && contacts.map((contact, index) => (
          <Accordion.Item key={index} value={contact.name}>
            <Accordion.Control>{contact.name}</Accordion.Control>
            <Accordion.Panel>
              <Text>{contact.email_primary}</Text>
              <Text>{contact.email_secondary}</Text>
              {contact.mobile_number && <Text>{contact.country_code} {contact.area_code} {contact.mobile_number}</Text>}
              {contact.commercial_number1 && <Text>{contact.country_code} {contact.area_code} {contact.commercial_number1}</Text>}
              {contact.commercial_number2 &&<Text>{contact.country_code} {contact.area_code} {contact.commercial_number2}</Text>}
            </Accordion.Panel>
        </Accordion.Item>
        ))}
      </Accordion>
    </Flex>
  );
}