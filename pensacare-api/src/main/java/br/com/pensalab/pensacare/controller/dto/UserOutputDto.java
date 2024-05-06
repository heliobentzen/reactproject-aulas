package br.com.pensalab.pensacare.controller.dto;

import br.com.pensalab.pensacare.model.User;

import java.time.LocalDateTime;

public record UserOutputDto(
        String id,
        String username,
        String fullname,
        String email,
        LocalDateTime createdAt,
        LocalDateTime updateAt,
        User.Role role) {
}
