package br.com.pensalab.pensacare.controller.dto.mapper;

import br.com.pensalab.pensacare.controller.dto.ServiceOutputDto;
import br.com.pensalab.pensacare.model.Service;
import org.modelmapper.Converter;
import org.modelmapper.spi.MappingContext;

public class ServiceToServiceOutputDto implements Converter<Service, ServiceOutputDto> {
    @Override
    public ServiceOutputDto convert(MappingContext<Service, ServiceOutputDto> mappingContext) {
        Service service = mappingContext.getSource();
        return new ServiceOutputDto(
                service.getId(),
                service.getDescription(),
                service.getItem().getId().getCode(),
                service.getItem().getId().getSerialNumber(),
                service.getItem().getDescription(),
                service.getClient().getCnpj(),
                service.getOrderNumber(),
                service.getDate()
        );
    }
}
