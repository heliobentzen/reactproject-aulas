package br.com.pensalab.pensacare.repository;

import br.com.pensalab.pensacare.model.Factory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FactoryRepository extends JpaRepository<Factory, String> {
}
