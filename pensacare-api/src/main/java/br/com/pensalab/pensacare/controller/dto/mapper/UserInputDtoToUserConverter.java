package br.com.pensalab.pensacare.controller.dto.mapper;

import br.com.pensalab.pensacare.controller.dto.UserInputDto;
import br.com.pensalab.pensacare.model.User;
import org.modelmapper.Converter;
import org.modelmapper.spi.MappingContext;

public class UserInputDtoToUserConverter implements Converter<UserInputDto, User> {
    @Override
    public User convert(MappingContext<UserInputDto, User> context) {
        UserInputDto source = context.getSource();
        return User.builder()
                .email(source.email())
                .fullname(source.fullname())
                .username(source.username())
                .password(source.password())
                .role(source.role())
                .build();
    }
}
