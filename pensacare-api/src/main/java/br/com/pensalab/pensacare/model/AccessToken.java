package br.com.pensalab.pensacare.model;

import java.util.Date;

public record AccessToken(String accessToken, Date issuedAt, Date expiresAt) {
}
