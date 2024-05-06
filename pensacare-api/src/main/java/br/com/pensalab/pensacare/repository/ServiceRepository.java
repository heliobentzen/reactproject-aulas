package br.com.pensalab.pensacare.repository;

import br.com.pensalab.pensacare.model.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ServiceRepository extends PagingAndSortingRepository<Service, Long>, JpaRepository<Service, Long> {
    Page<Service> findAllByClientCnpj(String cnpj, Pageable pageable);
}
