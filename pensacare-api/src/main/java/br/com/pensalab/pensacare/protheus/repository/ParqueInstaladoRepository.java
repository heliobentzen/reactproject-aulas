package br.com.pensalab.pensacare.protheus.repository;

import br.com.pensalab.pensacare.protheus.model.ParqueInstalado;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ParqueInstaladoRepository {
    private final EntityManager entityManager;

    @Autowired
    public ParqueInstaladoRepository(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public List<ParqueInstalado> findAllParqueInstalado() {
        Query query = entityManager.createNativeQuery("SELECT * FROM external.TB_PARQUE_INSTALADO", ParqueInstalado.class);
        return query.getResultList();
    }
}
