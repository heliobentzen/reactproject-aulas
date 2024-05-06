package br.com.pensalab.pensacare.model;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.ToString;

import java.util.List;

@Entity(name = "factories")
@Data
public class Factory {
    @Id
    private String id; // AA3_CODFAB
    private String store; // AA3_LOJAFA
    private String name; // FAB_NOME [FAB.A1_NREDUZ]
    @OneToMany(fetch = FetchType.EAGER, mappedBy = "factory")
    @ToString.Exclude
    private List<Item> items;
}
