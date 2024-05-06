package br.com.pensalab.pensacare.model;


import br.com.pensalab.pensacare.util.UUIDv7Generator;
import jakarta.persistence.Id;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.Version;
import org.springframework.data.annotation.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity(name = "users")
@Data
@Builder
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class User {
    @Id
    @GeneratedValue(generator = "UUIDv7")
    @GenericGenerator(name = "UUIDv7", type = UUIDv7Generator.class)
    private String id;

    private String fullname;
    private String email;
    @Column(unique = true)
    private String username;
    private String password;
    @Enumerated(EnumType.STRING)
    private Role role;
    private boolean active;

    @CreatedDate
    private LocalDateTime createdAt;
    @LastModifiedDate
    private LocalDateTime updatedAt;
    @CreatedBy
    private String createdBy;
    @LastModifiedBy
    private String updatedBy;
    @Version
    private Long version;

    public User() {
    }

    public enum Role {
        ADMIN,
        SALES;
    }
}
