package br.com.pensalab.pensacare.controller.dto.mapper;

import br.com.pensalab.pensacare.controller.dto.ClientOutputDto;
import br.com.pensalab.pensacare.model.Client;
import org.modelmapper.Converter;
import org.modelmapper.spi.MappingContext;

public class ClientToClientOutputDtoConverter implements Converter<Client, ClientOutputDto> {
    @Override
    public ClientOutputDto convert(MappingContext<Client, ClientOutputDto> mappingContext) {
        Client source = mappingContext.getSource();
        return new ClientOutputDto(
                source.getCode(),
                source.getCnpj(),
                source.getStore(),
                source.getName(),
                source.getCity(),
                source.getUf(),
                source.getBranch());
    }
}
