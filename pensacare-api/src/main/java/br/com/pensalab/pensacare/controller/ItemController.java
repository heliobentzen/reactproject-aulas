package br.com.pensalab.pensacare.controller;

import br.com.pensalab.pensacare.controller.dto.ItemOutputDto;
import br.com.pensalab.pensacare.service.ItemService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class ItemController {
    private final ItemService itemService;
    private final ModelMapper modelMapper;

    @Autowired
    public ItemController(ItemService itemService, ModelMapper modelMapper) {
        this.itemService = itemService;
        this.modelMapper = modelMapper;
    }


    @GetMapping(ApiRoutes.ITEM)
    public Page<ItemOutputDto> find(@RequestParam(name = "cnpj", required = false) String cnpj,
                           @RequestParam(name = "page", defaultValue = "0") int page,
                           @RequestParam(name = "size", defaultValue = "20") int size,
                           @RequestParam(name = "sort", defaultValue = "description") String sort) {

        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(sort));

        if (StringUtils.isNotEmpty(cnpj)) {
            return itemService.findAllByClientCnpj(cnpj, pageRequest).map(item -> modelMapper.map(item, ItemOutputDto.class));
        } else {
            return itemService.findAll(pageRequest).map(item -> modelMapper.map(item, ItemOutputDto.class));
        }

    }
}
