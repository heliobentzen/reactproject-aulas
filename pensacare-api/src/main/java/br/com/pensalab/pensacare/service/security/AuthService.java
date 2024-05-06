package br.com.pensalab.pensacare.service.security;

import br.com.pensalab.pensacare.model.AccessToken;
import br.com.pensalab.pensacare.model.User;
import br.com.pensalab.pensacare.service.UserService;
import br.com.pensalab.pensacare.service.security.exception.NotAuthorizedException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService implements UserDetailsService {
    private final PasswordEncoder passwordEncoder;
    private final UserService userService;
    private final JwtSigner signer;

    @Autowired
    public AuthService(PasswordEncoder passwordEncoder, UserService userService, JwtSigner signer) {
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
        this.signer = signer;
    }

    public AccessToken getUserAccessToken(String username, String password) {
        User user = userService.findByUsername(username).orElseThrow(NotAuthorizedException::new);

        if (!user.isActive() || !passwordEncoder.matches(password, user.getPassword()))
            throw new NotAuthorizedException();

        return signer.createAccessToken(user);

    }

    public UserDetails validateAccessToken(String accessToken) {
        Jws<Claims> claims = signer.verifyToken(accessToken);
        String userId = claims.getPayload().getId();
        return new br.com.pensalab.pensacare.service.security.UserDetails(userService.findById(userId).orElseThrow(NotAuthorizedException::new));

    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userService.findByUsername(username).map(br.com.pensalab.pensacare.service.security.UserDetails::new).orElseThrow(() -> new UsernameNotFoundException("username not found"));
    }
}
