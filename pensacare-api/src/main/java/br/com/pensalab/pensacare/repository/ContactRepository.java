package br.com.pensalab.pensacare.repository;

import br.com.pensalab.pensacare.model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactRepository extends PagingAndSortingRepository<Contact, String>, JpaRepository<Contact, String> {
}
