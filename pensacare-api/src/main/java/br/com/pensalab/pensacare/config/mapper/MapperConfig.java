package br.com.pensalab.pensacare.config.mapper;

import br.com.pensalab.pensacare.controller.dto.mapper.*;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MapperConfig {

    private final ModelMapper modelMapper;

    public MapperConfig() {
        this.modelMapper = new ModelMapper();
        configure();
    }

    private void configure() {
        this.modelMapper.addConverter(new UserInputDtoToUserConverter());
        this.modelMapper.addConverter(new UserToUserOutputDtoConverter());
        this.modelMapper.addConverter(new ClientToClientOutputDtoConverter());
        this.modelMapper.addConverter(new ItemToItemOutputDtoConverter());
        this.modelMapper.addConverter(new ServiceToServiceOutputDto());
        this.modelMapper.addConverter(new ContactToClientContactOutputDtoConverter());
    }

    @Bean
    public ModelMapper modelMapper() {
        return modelMapper;
    }
}
