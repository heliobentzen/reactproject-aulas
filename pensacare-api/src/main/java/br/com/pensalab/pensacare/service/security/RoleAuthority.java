package br.com.pensalab.pensacare.service.security;

import br.com.pensalab.pensacare.model.User;
import org.springframework.security.core.GrantedAuthority;


public class RoleAuthority implements GrantedAuthority {
    private final User.Role role;

    public RoleAuthority(User.Role role) {
        this.role = role;
    }

    @Override
    public String getAuthority() {
        return role.name();
    }
}
