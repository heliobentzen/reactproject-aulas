import { Accordion, Button, Flex, Text, Title } from '@mantine/core';
import { useState } from 'react';
import { IClient } from '../../interfaces/table/IClient';
import { IContact } from '../../interfaces/table/IContact';

interface ClientInfoProps {
  client: IClient;
  contacts: IContact[];
}

export function ClientInfo({ client, contacts }: ClientInfoProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const contactsPerPage = 10;

  const startContactIndex = currentPage * contactsPerPage;
  const endContactIndex = startContactIndex + contactsPerPage;
  const displayedContacts = contacts.slice(startContactIndex, endContactIndex);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  return (
    <Flex direction="column" py={24} gap={4} style={{ borderRadius: '10px' }} px={24} c="#030229">
      <Title mb={8} c="#0855A3" size="h1">
        {client.name}
      </Title>
      <Text>CNPJ: {client.cnpj}</Text>
      <Text>
        {client.city} / {client.uf}
      </Text>
      <Text>Contatos:</Text>
      <Accordion>
        {displayedContacts.map((contact, index) => (
          <Accordion.Item key={index} value={contact.name}>
            <Accordion.Control>{contact.name}</Accordion.Control>
            <Accordion.Panel>
              <Text>{contact.email_primary}</Text>
              <Text>{contact.email_secondary}</Text>
              {contact.mobile_number && (
                <Text>
                  {contact.country_code} {contact.area_code} {contact.mobile_number}
                </Text>
              )}
              {contact.commercial_number1 && (
                <Text>
                  {contact.country_code} {contact.area_code} {contact.commercial_number1}
                </Text>
              )}
              {contact.commercial_number2 && (
                <Text>
                  {contact.country_code} {contact.area_code} {contact.commercial_number2}
                </Text>
              )}
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
      <Flex gap={2}>
        <Button onClick={handlePrevPage} disabled={currentPage === 0} color="gray">
          Anterior
        </Button>
        <Button onClick={handleNextPage} disabled={endContactIndex >= contacts.length} color="gray">
          Próximo
        </Button>
      </Flex>
    </Flex>
  );
}
