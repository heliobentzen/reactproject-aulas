package br.com.pensalab.pensacare.config.security;

import br.com.pensalab.pensacare.service.security.AuthService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.servlet.HandlerExceptionResolver;

import java.io.IOException;

@Slf4j
public class JwtTokenFilter extends OncePerRequestFilter {
    private final AuthService authService;
    private final HandlerExceptionResolver resolver;

    public JwtTokenFilter(AuthService authService,
                          @Qualifier("handlerExceptionResolver") HandlerExceptionResolver resolver) {
        this.authService = authService;
        this.resolver = resolver;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            final String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
            if (!StringUtils.startsWithIgnoreCase(authorizationHeader, "bearer ")) {
                filterChain.doFilter(request, response);
                return;
            }

            String jwtToken = authorizationHeader.substring(7);


            UserDetails userDetails = authService.validateAccessToken(jwtToken);
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            filterChain.doFilter(request, response);
        } catch (Exception e) {
            resolver.resolveException(request, response, null, e);
            filterChain.doFilter(request, response);
        }
    }
}
