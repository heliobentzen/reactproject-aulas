package br.com.pensalab.pensacare.model;

import br.com.pensalab.pensacare.util.UUIDv7Generator;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDate;

@Entity(name = "services")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Service {

    @Id
    @GeneratedValue(generator = "UUIDv7")
    @GenericGenerator(name = "UUIDv7", type = UUIDv7Generator.class)
    private String id;

    private String orderNumber; // AB6_NUMOS - service order number, will be empty for next maintenance
    private String description; // DESC_CLASS for history, empty for next maintenance
    private String technician; // AB7_NOMTEC - tech name

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumns({
            @JoinColumn(name = "item_code", nullable = false, referencedColumnName = "code"),
            @JoinColumn(name = "item_serial_number", nullable = false, referencedColumnName = "serialNumber")
    })
    private Item item;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "client_cnpj", nullable = false)
    private Client client; // client branch

    private LocalDate date; // AB7_XDTATE for history, DT_PRX_PREV for next maintenance

}
