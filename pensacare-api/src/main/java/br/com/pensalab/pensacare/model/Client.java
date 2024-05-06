package br.com.pensalab.pensacare.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.util.List;

/**
 * Attribute names in comments extracted from ESPECIFICACAO TECNICA - INTEGRAÇÃO PENSACARE.pdf
 */
@Entity(name = "clients")
@Data
public class Client {
    private String code; // AA3_CODCLI - client code is not primary key, it is used to group client branches

    // all data below is related to a client's branch
    @Id
    @EqualsAndHashCode.Include
    private String cnpj;
    private String store; // AA3_LOJA
    private String name; // CLI_NOME
    private String city; // CLI_MUN
    @Column(length = 2)
    private String uf; // CLI_UF
    private String branch; // AA3_FILIAL - not used (same number for everyone)

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "client")
    @ToString.Exclude
    private List<Item> items;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "client", orphanRemoval = true)
    private List<Contact> contacts;
}
