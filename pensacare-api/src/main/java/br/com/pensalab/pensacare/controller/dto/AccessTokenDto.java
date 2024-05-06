package br.com.pensalab.pensacare.controller.dto;

import java.util.Date;

public record AccessTokenDto(String accessToken, Date issuedAt, Date expiresAt) {}