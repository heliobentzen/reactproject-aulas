package br.com.pensalab.pensacare.controller.dto;

import br.com.pensalab.pensacare.model.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record UserInputDto(
        @NotEmpty(message = "{required}")
        String username,
        @NotEmpty(message = "{required}")
        String password,
        @NotEmpty(message = "{required}")
        String fullname,
        @NotEmpty(message = "{required}") @Email(message = "{email}")
        String email,
        @NotNull(message = "{required}")
        User.Role role) {
}
