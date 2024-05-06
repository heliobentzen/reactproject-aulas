package br.com.pensalab.pensacare.controller;

import br.com.pensalab.pensacare.controller.dto.UserInputDto;
import br.com.pensalab.pensacare.controller.dto.UserOutputDto;
import br.com.pensalab.pensacare.model.User;
import br.com.pensalab.pensacare.service.UserService;
import br.com.pensalab.pensacare.service.exception.ResourceExistsException;
import br.com.pensalab.pensacare.service.security.UserDetails;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@RestController
@Slf4j
public class UserController {

    private final UserService userService;
    private final ModelMapper modelMapper;

    @Autowired
    public UserController(UserService userService, ModelMapper modelMapper) {
        this.userService = userService;
        this.modelMapper = modelMapper;
    }


    @PostMapping(value = ApiRoutes.USER, consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("hasAuthority('ADMIN')")
    public UserOutputDto createUser(@Valid @RequestBody UserInputDto userInputDto) {
        try {
            User createdUser = userService.createUser(modelMapper.map(userInputDto, User.class));
            return modelMapper.map(createdUser, UserOutputDto.class);
        } catch (ResourceExistsException e) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "", e);
        }
    }

    @GetMapping(ApiRoutes.USER_ME)
    public UserOutputDto getUser(@AuthenticationPrincipal UserDetails userDetails) {
        Optional<User> userOpt = userService.findByUsername(userDetails.getUsername());
        return modelMapper.map(userOpt.get(), UserOutputDto.class);
    }

}
