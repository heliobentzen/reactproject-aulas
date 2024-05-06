package br.com.pensalab.pensacare.controller.dto.mapper;

import br.com.pensalab.pensacare.controller.dto.ItemOutputDto;
import br.com.pensalab.pensacare.model.Item;
import org.modelmapper.Converter;
import org.modelmapper.spi.MappingContext;

public class ItemToItemOutputDtoConverter implements Converter<Item, ItemOutputDto> {
    @Override
    public ItemOutputDto convert(MappingContext<Item, ItemOutputDto> mappingContext) {
        Item source = mappingContext.getSource();
        return new ItemOutputDto(source.getId().getCode(),
                source.getId().getSerialNumber(),
                source.getModel(),
                source.getDescription()
        );
    }
}
