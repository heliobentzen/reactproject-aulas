package br.com.pensalab.pensacare.controller;

import br.com.pensalab.pensacare.controller.dto.AccessTokenDto;
import br.com.pensalab.pensacare.controller.dto.UserLoginInputDto;
import br.com.pensalab.pensacare.model.AccessToken;
import br.com.pensalab.pensacare.service.security.AuthService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
    private final AuthService authService;
    private final ModelMapper modelMapper;

    
    @Autowired
    public AuthController(AuthService authService, ModelMapper modelMapper) {
        this.authService = authService;
        this.modelMapper = modelMapper;
    }

    
    @PostMapping(ApiRoutes.AUTH_LOGIN)
    public AccessTokenDto getAccessToken(@RequestBody UserLoginInputDto userLoginInputDto) {
        AccessToken accessToken = authService.getUserAccessToken(
                userLoginInputDto.username(),
                userLoginInputDto.password()
        );
        return new AccessTokenDto(
                accessToken.accessToken(),
                accessToken.issuedAt(),
                accessToken.expiresAt()
        );
    }

}
