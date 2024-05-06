package br.com.pensalab.pensacare.model;

import br.com.pensalab.pensacare.util.UUIDv7Generator;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

@Entity(name = "contacts")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Contact {

    @Id
    @GeneratedValue(generator = "UUIDv7")
    @GenericGenerator(name = "UUIDv7", type = UUIDv7Generator.class)
    private String id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "client_cnpj", nullable = false)
    private Client client; // CODCLI and LOJACLI

    private String name; // U5_CONTAT
    private String emailPrimary; // U5_EMAIL
    private String emailSecondary; // U5_XEMAIL2
    private String areaCode; // U5_DDD
    private String countryCode; // U5_CODPAIS
    private String mobilePhone; // U5_CELULAR
    private String commercialPhone1; // U5_FCOM1
    private String commercialPhone2; // U5_FCOM2
}
