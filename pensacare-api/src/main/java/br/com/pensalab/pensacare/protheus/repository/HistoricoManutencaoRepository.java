package br.com.pensalab.pensacare.protheus.repository;

import br.com.pensalab.pensacare.protheus.model.HistManut;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class HistoricoManutencaoRepository {
    private final EntityManager entityManager;

    @Autowired
    public HistoricoManutencaoRepository(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public List<HistManut> findAll() {
        Query query = this.entityManager.createNativeQuery("SELECT * FROM external.tb_hist_manut", HistManut.class);
        return query.getResultList();
    }
}
