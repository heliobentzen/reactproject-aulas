package br.com.pensalab.pensacare.controller;

class ApiRoutes {
    private static final String BASE = "/api/v1";

    static final String USER = BASE + "/users";
    static final String USER_ME = USER + "/me";
    static final String AUTH = BASE + "/auth";
    static final String AUTH_LOGIN = AUTH + "/login";
    static final String IMPORT = BASE + "/import";
    static final String CLIENT = BASE + "/clients";
    static final String ITEM = BASE + "/items";
    static final String SERVICE = BASE + "/services";
}
