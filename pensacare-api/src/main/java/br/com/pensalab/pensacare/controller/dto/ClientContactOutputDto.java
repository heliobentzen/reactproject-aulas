package br.com.pensalab.pensacare.controller.dto;

public record ClientContactOutputDto(
        String name,
        String emailPrimary,
        String emailSecondary,
        String countryCode,
        String areaCode,
        String mobileNumber,
        String commercialNumber1,
        String commercialNumber2) {
}
