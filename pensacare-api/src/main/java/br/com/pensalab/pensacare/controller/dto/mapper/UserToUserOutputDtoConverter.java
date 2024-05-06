package br.com.pensalab.pensacare.controller.dto.mapper;

import br.com.pensalab.pensacare.controller.dto.UserOutputDto;
import br.com.pensalab.pensacare.model.User;
import org.modelmapper.Converter;
import org.modelmapper.spi.MappingContext;

public class UserToUserOutputDtoConverter implements Converter<User, UserOutputDto> {
    @Override
    public UserOutputDto convert(MappingContext<User, UserOutputDto> context) {
        User source = context.getSource();
        return new UserOutputDto(
                source.getId(),
                source.getUsername(),
                source.getFullname(),
                source.getEmail(),
                source.getCreatedAt(),
                source.getUpdatedAt(),
                source.getRole()
        );
    }
}
