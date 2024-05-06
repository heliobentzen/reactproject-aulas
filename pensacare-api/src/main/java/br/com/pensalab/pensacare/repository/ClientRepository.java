package br.com.pensalab.pensacare.repository;

import br.com.pensalab.pensacare.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientRepository extends PagingAndSortingRepository<Client, String>, JpaRepository<Client, String> {
}
