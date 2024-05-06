package br.com.pensalab.pensacare.protheus.service;

import br.com.pensalab.pensacare.model.Client;
import br.com.pensalab.pensacare.model.Contact;
import br.com.pensalab.pensacare.model.Factory;
import br.com.pensalab.pensacare.model.Item;
import br.com.pensalab.pensacare.protheus.model.Contato;
import br.com.pensalab.pensacare.protheus.model.HistManut;
import br.com.pensalab.pensacare.protheus.model.ParqueInstalado;
import br.com.pensalab.pensacare.protheus.model.ProximaPrev;
import br.com.pensalab.pensacare.protheus.repository.ContatoRepository;
import br.com.pensalab.pensacare.protheus.repository.HistoricoManutencaoRepository;
import br.com.pensalab.pensacare.protheus.repository.ParqueInstaladoRepository;
import br.com.pensalab.pensacare.protheus.repository.ProximaPrevRepository;
import br.com.pensalab.pensacare.repository.ClientRepository;
import br.com.pensalab.pensacare.repository.FactoryRepository;
import br.com.pensalab.pensacare.repository.ItemRepository;
import br.com.pensalab.pensacare.repository.ServiceRepository;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
public class ImportDataService {

    private final ParqueInstaladoRepository parqueInstaladoRepository;
    private final ProximaPrevRepository proximaPrevRepository;
    private final HistoricoManutencaoRepository historicoManutencaoRepository;
    private final ContatoRepository contatoRepository;
    private final ClientRepository clientRepository;
    private final ItemRepository itemRepository;
    private final FactoryRepository factoryRepository;
    private final ServiceRepository serviceRepository;

    @Autowired
    public ImportDataService(ParqueInstaladoRepository repository,
                             ProximaPrevRepository proximaPrevRepository,
                             HistoricoManutencaoRepository historicoManutencaoRepository,
                             ContatoRepository contatoRepository,
                             ClientRepository clientRepository,
                             ItemRepository itemRepository,
                             FactoryRepository factoryRepository,
                             ServiceRepository serviceRepository) {
        this.parqueInstaladoRepository = repository;
        this.proximaPrevRepository = proximaPrevRepository;
        this.historicoManutencaoRepository = historicoManutencaoRepository;
        this.contatoRepository = contatoRepository;
        this.clientRepository = clientRepository;
        this.itemRepository = itemRepository;
        this.factoryRepository = factoryRepository;
        this.serviceRepository = serviceRepository;
    }

    /**
     * TODO: Temporary code to run once... Proper import from PENSACARE Proxy database must be implemented
     */
    public void runImport() {
        Map<String, Client> clientMap = new HashMap<>();
        Map<String, Factory> factoryMap = new HashMap<>();
        Map<Item.ItemId, Item> itemMap = new HashMap<>();
        List<br.com.pensalab.pensacare.model.Service> serviceList = new ArrayList<>();

        log.info("Protheus database importer started");

        log.info("Clients and Items Import started");
        parqueInstaladoRepository.findAll().forEach(parqueInstalado ->
                processParqueInstalado(parqueInstalado, clientMap, factoryMap, itemMap)
        );

        Map<String, List<Client>> clientByCodeMap = clientMap.values()
                .stream()
                .collect(Collectors.groupingBy(Client::getCode, Collectors.toList()));

        log.info("Client Contacts Import started");
        contatoRepository.findAll().forEach(contato ->
                processClientContacts(contato, clientByCodeMap)
        );

        log.info("Next Service Import started");
        proximaPrevRepository.findAll().forEach(proximaPrev ->
                processProximaPrev(proximaPrev, clientByCodeMap, itemMap, serviceList)
        );

        log.info("Service History Import started");
        historicoManutencaoRepository.findAll().forEach(histManut ->
                processHistManut(histManut, itemMap, serviceList)
        );


        log.info("Persisting data...");
        clientRepository.saveAll(clientMap.values());
        factoryRepository.saveAll(factoryMap.values());
        itemRepository.saveAll(itemMap.values());
        serviceRepository.saveAll(serviceList);
        log.info("Done.");
    }

    private static void processClientContacts(Contato contato, Map<String, List<Client>> clientByCodeMap) {
        String codCli = contato.getCodcli();
        String lojaCli = contato.getLojacli();

        Optional<Client> clientOpt = Optional.ofNullable(clientByCodeMap.get(codCli)).orElse(new ArrayList<>())
                .stream()
                .filter(c -> StringUtils.equals(c.getStore(), lojaCli))
                .findFirst();

        clientOpt.ifPresent(client -> {
            List<Contact> contactList = client.getContacts();
            if (contactList == null) {
                contactList = new ArrayList<>();
                client.setContacts(contactList);
            }
            contactList.add(
                    Contact.builder()
                            .client(client)
                            .name(contato.getU5_contat())
                            .emailPrimary(contato.getU5_email())
                            .emailSecondary(contato.getU5_xemail2())
                            .areaCode(contato.getU5_ddd())
                            .countryCode(contato.getU5_codpais())
                            .mobilePhone(contato.getU5_celular())
                            .commercialPhone1(contato.getU5_fcom1())
                            .commercialPhone2(contato.getU5_fcom2())
                            .build()
            );
        });
    }

    private static void processHistManut(HistManut histManut,
                                         Map<Item.ItemId, Item> itemMap,
                                         List<br.com.pensalab.pensacare.model.Service> serviceList) {
        String serviceDate = histManut.getAb7_xdtate();
        LocalDate date = null;
        if (StringUtils.isNotBlank(serviceDate))
            date = LocalDate.parse(serviceDate, DateTimeFormatter.ofPattern("yyyyMMdd"));

        String codProd = histManut.getAb7_codpro();
        String numSer = histManut.getAb7_numser();

        Item.ItemId itemId = new Item.ItemId(codProd, numSer);
        Item item = itemMap.get(itemId);

        if (item != null)
            serviceList.add(
                    br.com.pensalab.pensacare.model.Service
                            .builder()
                            .date(date)
                            .client(item.getClient())
                            .item(item)
                            .description(histManut.getDesc_class())
                            .orderNumber(histManut.getAb6_numos())
                            .technician(histManut.getAb7_nomtec())
                            .build()
            );
    }

    private static void processProximaPrev(ProximaPrev proximaPrev,
                                           Map<String, List<Client>> clientByCodeMap,
                                           Map<Item.ItemId, Item> itemMap,
                                           List<br.com.pensalab.pensacare.model.Service> serviceList) {
        String serviceDate = proximaPrev.getDt_prx_prev();
        LocalDate date = null;
        if (StringUtils.isNotBlank(serviceDate))
            date = LocalDate.parse(serviceDate, DateTimeFormatter.ofPattern("yyyyMMdd"));

        String codCli = proximaPrev.getAb7_codcli();
        String loja = proximaPrev.getAb7_loja();

        Optional<Client> clientOpt = Optional.ofNullable(clientByCodeMap.get(codCli)).orElse(new ArrayList<>())
                .stream()
                .filter(c -> StringUtils.equals(c.getStore(), loja))
                .findFirst();


        String codProd = proximaPrev.getAb7_codpro();
        String numSer = proximaPrev.getAb7_numser();
        Item.ItemId itemId = new Item.ItemId(codProd, numSer);
        Item item = itemMap.get(itemId);
        if (item == null)
            log.debug("Item not found, Cod: {} Ser: {}", codProd, numSer);
        if (clientOpt.isEmpty())
            log.debug("Client not found, Cod: {} Loja: {}", codCli, loja);

        if (item != null && clientOpt.isPresent())
            serviceList.add(
                    br.com.pensalab.pensacare.model.Service
                            .builder()
                            .client(clientOpt.get())
                            .item(item)
                            .date(date)
                            .build()
            );
    }

    private static void processParqueInstalado(ParqueInstalado parqueInstalado,
                                               Map<String, Client> clientMap,
                                               Map<String, Factory> factoryMap,
                                               Map<Item.ItemId, Item> itemMap) {
        String cnpj = parqueInstalado.getCli_cnpj();

        Optional<Client> clientOptional = Optional
                .ofNullable(clientMap.get(cnpj));

        Client client;
        if (clientOptional.isEmpty()) {
            client = new Client();
            client.setCode(parqueInstalado.getAa3_codcli());
            client.setName(parqueInstalado.getCli_nome());
            client.setCity(parqueInstalado.getCli_mun());
            client.setUf(parqueInstalado.getCli_uf());
            client.setBranch(parqueInstalado.getAa3_filial());
            client.setStore(parqueInstalado.getAa3_loja());
            client.setCnpj(parqueInstalado.getCli_cnpj());
            clientMap.put(cnpj, client);
            log.debug("Client: {}", client);
        } else {
            client = clientOptional.get();
        }


        String factoryId = parqueInstalado.getAa3_codfab();
        Optional<Factory> factoryOptional = Optional
                .ofNullable(factoryMap.get(factoryId));

        Factory factory;
        if (factoryOptional.isEmpty()) {
            factory = new Factory();
            factory.setId(factoryId);
            factory.setName(parqueInstalado.getFab_nome());
            factory.setStore(parqueInstalado.getAa3_lojafa());
            factoryMap.put(factoryId, factory);
            log.debug("Factory: {}", factory);
        } else {
            factory = factoryOptional.get();
        }


        String codProd = parqueInstalado.getAa3_codpro();
        String numSer = parqueInstalado.getAa3_numser();
        Item.ItemId itemId = new Item.ItemId(codProd, numSer);
        Optional<Item> itemOptional = Optional
                .ofNullable(itemMap.get(itemId));
        if (itemOptional.isEmpty()) {
            Item item = new Item();
            item.setId(itemId);
            item.setModel(parqueInstalado.getAa3_modelo());
            item.setDescription(parqueInstalado.getB1_desc());
            item.setFactorySerialNumber(parqueInstalado.getAa3_xnsrea());
            item.setFactory(factory);
            item.setClient(client);
            itemMap.put(itemId, item);
            log.debug("Item: {}", item);
        }
    }
}
