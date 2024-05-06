package br.com.pensalab.pensacare.config;

import br.com.pensalab.pensacare.model.User;
import br.com.pensalab.pensacare.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

@Configuration
@EnableJpaRepositories(basePackages = {"br.com.pensalab.pensacare.repository", "br.com.pensalab.pensacare.protheus.repository"})
@EnableJpaAuditing
@Slf4j
public class JpaConfig implements AuditorAware<String> {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${pensacare.default-username}")
    private String defaultUsername;
    @Value("${pensacare.default-password}")
    private String defaultPassword;

    @Autowired
    public JpaConfig(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Bean
    @ConditionalOnProperty(prefix = "pensacare", name = "create-default-user", havingValue = "true")
    public CommandLineRunner createDefaultUser() {
        return args -> {
            if (userRepository.findByUsername(defaultUsername).isEmpty()) {
                log.info("Creating default user {} with password {}", defaultUsername, defaultPassword);
                User defaultUser = User.builder()
                        .username(defaultUsername)
                        .password(passwordEncoder.encode(defaultPassword))
                        .role(User.Role.ADMIN)
                        .active(true)
                        .build();
                userRepository.save(defaultUser);
            }
        };
    }

    @Override
    public Optional<String> getCurrentAuditor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated())
            return Optional.empty();
        return Optional.of(((User) authentication.getPrincipal()).getUsername());
    }


}

