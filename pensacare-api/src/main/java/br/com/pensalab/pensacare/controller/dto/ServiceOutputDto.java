package br.com.pensalab.pensacare.controller.dto;

import java.time.LocalDate;

public record ServiceOutputDto(
        String id,
        String description,
        String itemCode,
        String itemSerialNumber,
        String itemDescription,
        String clientCnpj,
        String orderNumber,
        LocalDate date
) {
}
