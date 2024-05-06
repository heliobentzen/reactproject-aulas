package br.com.pensalab.pensacare.controller;

import br.com.pensalab.pensacare.protheus.service.ImportDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

@RestController
public class ImportController {

    private final ImportDataService importDataService;

    @Autowired
    public ImportController(ImportDataService importDataService) {
        this.importDataService = importDataService;
    }

    @GetMapping(ApiRoutes.IMPORT)
    public void doImport() { // async execution
        ExecutorService ex = Executors.newSingleThreadExecutor();
        ex.submit(importDataService::runImport); // do not use try-with-resources, it will block this call
    }
}
