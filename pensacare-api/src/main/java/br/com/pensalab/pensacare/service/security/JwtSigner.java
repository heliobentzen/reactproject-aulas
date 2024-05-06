package br.com.pensalab.pensacare.service.security;


import br.com.pensalab.pensacare.model.AccessToken;
import br.com.pensalab.pensacare.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;

public class JwtSigner implements JwtDecoder {
    private final SecretKey secretKey;
    private final long jwtExpires; // in minutes

    public JwtSigner(String secret, long expires) {
        this.jwtExpires = expires;
        this.secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }

    public AccessToken createAccessToken(User user) {
        LocalDateTime now = LocalDateTime.now();

        Date issuedAt = new Date(now.toEpochSecond(ZoneOffset.UTC) * 1000);
        Date expiresAt = new Date(now.plusMinutes(jwtExpires).toEpochSecond(ZoneOffset.UTC) * 1000);

        return new AccessToken(
                Jwts.builder()
                        .id(user.getId())
                        .subject(user.getUsername())
                        .claim("type", "Bearer")
                        .issuedAt(issuedAt)
                        .expiration(expiresAt)
                        .signWith(secretKey)
                        .compact(),
                issuedAt,
                expiresAt);
    }

    public Jws<Claims> verifyToken(String jwt) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(jwt);
    }

    @Override
    public Jwt decode(String token) throws JwtException {
        NimbusJwtDecoder decoder = NimbusJwtDecoder.withSecretKey(secretKey).macAlgorithm(MacAlgorithm.HS512).build();
        return decoder.decode(token);
    }
}
