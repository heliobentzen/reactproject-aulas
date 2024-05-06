package br.com.pensalab.pensacare.protheus.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
@AllArgsConstructor
public class ProximaPrev {
    private String ab7_filial;
    private String ab7_codpro;
    private String ab7_numser;
    private String b1_desc;
    private String ab7_codcli;
    private String ab7_loja;
    private String ab7_xdtexe;
    private String zz1_dtexec;
    private String zz1_proxma;
    private double zz1_zpmacl;
    private double ab7_zpmacl;
    private double b1_zpman;
    private String dt_prx_prev;
}
