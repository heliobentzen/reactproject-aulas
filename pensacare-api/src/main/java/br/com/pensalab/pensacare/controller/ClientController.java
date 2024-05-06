package br.com.pensalab.pensacare.controller;

import br.com.pensalab.pensacare.controller.dto.ClientContactOutputDto;
import br.com.pensalab.pensacare.controller.dto.ClientOutputDto;
import br.com.pensalab.pensacare.exceptions.ResourceNotFoundException;
import br.com.pensalab.pensacare.model.Client;
import br.com.pensalab.pensacare.service.ClientService;
import org.apache.commons.lang3.StringUtils;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class ClientController {

    private final ClientService clientService;
    private final ModelMapper modelMapper;

    public ClientController(ClientService clientService, ModelMapper modelMapper) {
        this.clientService = clientService;
        this.modelMapper = modelMapper;
    }

    @GetMapping(ApiRoutes.CLIENT)
    public Page<ClientOutputDto> findAll(
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "20") int size,
            @RequestParam(name = "sort", defaultValue = "code") String sort) {

        PageRequest request;
        if (StringUtils.isNotBlank(sort))
            request = PageRequest.of(page, size, Sort.by(sort));
        else
            request = PageRequest.of(page, size);

        return clientService.findAll(request).map(client -> modelMapper.map(client, ClientOutputDto.class));
    }

    @GetMapping(ApiRoutes.CLIENT_CONTACT)
    public List<ClientContactOutputDto> findContacts(
            @PathVariable("id") String cnpj
    ) {
        Optional<Client> clientOpt = clientService.findById(cnpj);
        Client client = clientOpt.orElseThrow(ResourceNotFoundException::new);
        return client.getContacts()
                .stream()
                .map(contact -> modelMapper.map(contact, ClientContactOutputDto.class)).toList();
    }
}
