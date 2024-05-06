package br.com.pensalab.pensacare.service.security;

import br.com.pensalab.pensacare.model.User;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;
import java.util.List;

public class UserDetails extends User implements org.springframework.security.core.userdetails.UserDetails {

    public UserDetails() {
    }

    public UserDetails(User user) {
        this.setId(user.getId());
        this.setFullname(user.getFullname());
        this.setEmail(user.getEmail());
        this.setUsername(user.getUsername());
        this.setPassword(user.getPassword());
        this.setRole(user.getRole());
        this.setActive(user.isActive());
        this.setCreatedAt(user.getCreatedAt());
        this.setUpdatedAt(user.getUpdatedAt());
        this.setCreatedBy(user.getCreatedBy());
        this.setUpdatedBy(user.getUpdatedBy());
        this.setVersion(user.getVersion());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new RoleAuthority(super.getRole()));
    }

    @Override
    public String getPassword() {
        return super.getPassword();
    }

    @Override
    public String getUsername() {
        return super.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return false;
    }

    @Override
    public boolean isAccountNonLocked() {
        return false;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return false;
    }

    @Override
    public boolean isEnabled() {
        return super.isActive();
    }
}
