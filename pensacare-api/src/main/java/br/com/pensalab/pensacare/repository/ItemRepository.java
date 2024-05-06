package br.com.pensalab.pensacare.repository;

import br.com.pensalab.pensacare.model.Item;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends PagingAndSortingRepository<Item, Item.ItemId>, JpaRepository<Item, Item.ItemId> {

    Page<Item> findAllByClient_Cnpj(String clientId, Pageable pageable);
}
