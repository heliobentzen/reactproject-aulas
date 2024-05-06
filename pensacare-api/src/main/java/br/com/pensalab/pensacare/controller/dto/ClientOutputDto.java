package br.com.pensalab.pensacare.controller.dto;

public record ClientOutputDto(String code,
                              String cnpj,
                              String store,
                              String name,
                              String city,
                              String uf,
                              String branch) {
}
