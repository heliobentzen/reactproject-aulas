package br.com.pensalab.pensacare.protheus.repository;

import br.com.pensalab.pensacare.protheus.model.ProximaPrev;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ProximaPrevRepository {
    private final EntityManager entityManager;

    @Autowired
    public ProximaPrevRepository(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public List<ProximaPrev> findAll() {
        Query query = entityManager.createNativeQuery("SELECT * FROM external.tb_proxima_prev", ProximaPrev.class);
        return query.getResultList();
    }
}
