package br.com.pensalab.pensacare.config.security;

import br.com.pensalab.pensacare.service.security.JwtSigner;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecretConfig {
    @Value("${jwt.secret}")
    private String jwtSecret;
    @Value("${jwt.expires}")
    private long jwtExpires; // in minutes

    @Bean
    public PasswordEncoder getPasswordEncoder() {
        return new BCryptPasswordEncoder(10);
    }

    @Bean
    public JwtSigner getJwtSigner() {
        return new JwtSigner(jwtSecret, jwtExpires);
    }


}
