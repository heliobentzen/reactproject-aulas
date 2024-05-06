package br.com.pensalab.pensacare.controller.dto.mapper;

import br.com.pensalab.pensacare.controller.dto.ClientContactOutputDto;
import br.com.pensalab.pensacare.model.Contact;
import org.modelmapper.Converter;
import org.modelmapper.spi.MappingContext;

public class ContactToClientContactOutputDtoConverter implements Converter<Contact, ClientContactOutputDto> {
    @Override
    public ClientContactOutputDto convert(MappingContext<Contact, ClientContactOutputDto> mappingContext) {
        Contact contact = mappingContext.getSource();

        return new ClientContactOutputDto(
                contact.getName(),
                contact.getEmailPrimary(),
                contact.getEmailSecondary(),
                contact.getCountryCode(),
                contact.getAreaCode(),
                contact.getMobilePhone(),
                contact.getCommercialPhone1(),
                contact.getCommercialPhone2()
        );
    }
}
