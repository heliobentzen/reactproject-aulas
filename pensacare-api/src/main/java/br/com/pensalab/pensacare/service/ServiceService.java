package br.com.pensalab.pensacare.service;

import br.com.pensalab.pensacare.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ServiceService {
    private final ServiceRepository serviceRepository;

    @Autowired
    public ServiceService(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    public Page<br.com.pensalab.pensacare.model.Service> findAll(Pageable pageable) {
        return this.serviceRepository.findAll(pageable);
    }

    public Page<br.com.pensalab.pensacare.model.Service> findByCnpj(String cnpj, Pageable pageRequest) {
        return this.serviceRepository.findAllByClientCnpj(cnpj, pageRequest);
    }
}
