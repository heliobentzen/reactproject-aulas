package br.com.pensalab.pensacare.protheus.repository;

import br.com.pensalab.pensacare.protheus.model.Contato;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ContatoRepository {
    private final EntityManager entityManager;

    @Autowired
    public ContatoRepository(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public List<Contato> findAll() {
        Query query = entityManager.createNativeQuery("SELECT * FROM external.tb_contatos", Contato.class);
        return query.getResultList();
    }
}
