package br.com.pensalab.pensacare.protheus.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Contato {
    private String codcli;
    private String lojacli;
    private String ac8_codent;
    private String u5_contat;
    private String u5_email;
    private String u5_xemail2;
    private String u5_ddd;
    private String u5_codpais;
    private String u5_celular;
    private String u5_fcom1;
    private String u5_fcom2;
}