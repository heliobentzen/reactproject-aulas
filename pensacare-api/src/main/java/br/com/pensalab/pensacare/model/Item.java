package br.com.pensalab.pensacare.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;

@Data
@Entity(name = "items")
public class Item {
    @EmbeddedId
    private ItemId id;
    private String description; // B1_DESC
    private String model; // AA3_MODELO
    private String factorySerialNumber; // AA3_XNSREA
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "factory_id", nullable = false)
    @ToString.Exclude
    private Factory factory;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "client_cnpj", nullable = false)
    @ToString.Exclude
    private Client client;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ItemId implements Serializable {
        private String code; // AA3_CODPRO
        private String serialNumber; // AA3_NUMSER
    }
}
