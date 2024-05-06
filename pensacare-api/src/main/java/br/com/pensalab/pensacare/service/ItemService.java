package br.com.pensalab.pensacare.service;

import br.com.pensalab.pensacare.model.Item;
import br.com.pensalab.pensacare.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ItemService {
    private final ItemRepository itemRepository;

    @Autowired
    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }


    public Page<Item> findAll(Pageable pageable) {
        return itemRepository.findAll(pageable);
    }

    public Page<Item> findAllByClientCnpj(String clientId, Pageable pageable) {
        return itemRepository.findAllByClient_Cnpj(clientId, pageable);
    }

}
