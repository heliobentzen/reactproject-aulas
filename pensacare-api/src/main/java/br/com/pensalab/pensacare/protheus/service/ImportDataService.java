package br.com.pensalab.pensacare.protheus.service;

import br.com.pensalab.pensacare.model.Client;
import br.com.pensalab.pensacare.model.Factory;
import br.com.pensalab.pensacare.model.Item;
import br.com.pensalab.pensacare.protheus.repository.ParqueInstaladoRepository;
import br.com.pensalab.pensacare.repository.ClientRepository;
import br.com.pensalab.pensacare.repository.FactoryRepository;
import br.com.pensalab.pensacare.repository.ItemRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
public class ImportDataService {

    private final ParqueInstaladoRepository parqueInstaladoRepository;
    private final ClientRepository clientRepository;
    private final ItemRepository itemRepository;
    private final FactoryRepository factoryRepository;

    @Autowired
    public ImportDataService(ParqueInstaladoRepository repository,
                             ClientRepository clientRepository,
                             ItemRepository itemRepository,
                             FactoryRepository factoryRepository) {
        this.parqueInstaladoRepository = repository;
        this.clientRepository = clientRepository;
        this.itemRepository = itemRepository;
        this.factoryRepository = factoryRepository;
    }

    /**
     * TODO: Temporary code to run once... Proper import from PENSACARE Proxy database must be implemented
     */
    public void runImport() {

        log.info("Protheus database importer started");
        parqueInstaladoRepository.findAllParqueInstalado().forEach(parqueInstalado -> {
            String cnpj = parqueInstalado.getCli_cnpj().trim();
            Optional<Client> clientOptional = clientRepository.findById(cnpj);
            Client client;
            if (clientOptional.isEmpty()) {
                client = new Client();
                client.setCode(parqueInstalado.getAa3_codcli().trim());
                client.setName(parqueInstalado.getCli_nome().trim());
                client.setCity(parqueInstalado.getCli_mun().trim());
                client.setUf(parqueInstalado.getCli_uf().trim());
                client.setBranch(parqueInstalado.getAa3_filial().trim());
                client.setStore(parqueInstalado.getAa3_loja().trim());
                client.setCnpj(parqueInstalado.getCli_cnpj().trim());
                clientRepository.save(client);
            } else {
                client = clientOptional.get();
            }

            log.info("Client: {}", client);

            String factoryId = parqueInstalado.getAa3_codfab().trim();
            Optional<Factory> factoryOptional = factoryRepository.findById(factoryId);
            Factory factory;
            if (factoryOptional.isEmpty()) {
                factory = new Factory();
                factory.setId(factoryId);
                factory.setName(parqueInstalado.getFab_nome().trim());
                factory.setStore(parqueInstalado.getAa3_lojafa().trim());
                factoryRepository.save(factory);
            } else {
                factory = factoryOptional.get();
            }

            log.info("Factory: {}", factory);

            String codProd = parqueInstalado.getAa3_codpro().trim();
            String numSer = parqueInstalado.getAa3_numser().trim();
            Item.ItemId itemId = new Item.ItemId(codProd, numSer);
            Optional<Item> itemOptional = itemRepository.findById(itemId);
            if (itemOptional.isEmpty()) {
                Item item = new Item();
                item.setId(itemId);
                item.setModel(parqueInstalado.getAa3_modelo().trim());
                item.setDescription(parqueInstalado.getB1_desc().trim());
                item.setFactorySerialNumber(parqueInstalado.getAa3_xnsrea().trim());
                item.setFactory(factory);
                item.setClient(client);
                itemRepository.save(item);
                log.info("Item: {}", item);
            }
        });
    }
}
