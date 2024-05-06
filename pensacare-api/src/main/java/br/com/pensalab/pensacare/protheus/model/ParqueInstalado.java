package br.com.pensalab.pensacare.protheus.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
@AllArgsConstructor
public class ParqueInstalado {
    private String aa3_filial;
    private String aa3_codcli;
    private String aa3_loja;
    private String cli_cnpj;
    private String cli_nome;
    private String cli_mun;
    private String cli_uf;
    private String aa3_codpro;
    private String b1_desc;
    private String aa3_modelo;
    private String aa3_numser;
    private String aa3_xnsrea;
    private String aa3_codfab;
    private String aa3_lojafa;
    private String fab_nome;
}
