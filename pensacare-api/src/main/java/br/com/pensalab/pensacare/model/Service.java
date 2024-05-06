package br.com.pensalab.pensacare.model;

import br.com.pensalab.pensacare.util.UUIDv7Generator;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

@Entity(name = "services")
@Data
public class Service {

    @Id
    @GeneratedValue(generator = "UUIDv7")
    @GenericGenerator(name = "UUIDv7", type = UUIDv7Generator.class)
    private String id;

    private String orderNumber; // AB6_NUMOS - service order number
    private String description;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumns({
            @JoinColumn(name = "item_code", nullable = false, referencedColumnName = "code"),
            @JoinColumn(name = "item_serial_number", nullable = false, referencedColumnName = "serialNumber")
    })
    private Item item;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "client_cnpj", nullable = false)
    private Client client;


}
