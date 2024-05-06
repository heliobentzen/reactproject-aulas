package br.com.pensalab.pensacare.protheus.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class HistManut {
    private String ab7_filial;
    private String ab7_codpro;
    private String ab7_numser;
    private String ab6_numos;
    private String ab6_xtipos;
    private String ab7_item;
    private String ab7_nomtec;
    private String ab7_xclass;
    private String desc_class;
    private String ab7_xdtate;
}