package br.com.pensalab.pensacare.controller;

import br.com.pensalab.pensacare.controller.dto.ServiceOutputDto;
import br.com.pensalab.pensacare.service.ServiceService;
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
public class ServiceController {
    private final ServiceService serviceService;
    private final ModelMapper modelMapper;

    @Autowired
    public ServiceController(ServiceService serviceService, ModelMapper modelMapper) {
        this.serviceService = serviceService;
        this.modelMapper = modelMapper;
    }

    @GetMapping(ApiRoutes.SERVICE)
    public Page<ServiceOutputDto> listByClient(@RequestParam(required = false, value = "cnpj") String cnpj,
                                               @RequestParam(name = "page", defaultValue = "0") int page,
                                               @RequestParam(name = "size", defaultValue = "20") int size,
                                               @RequestParam(name = "sort", defaultValue = "date") String sort) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, sort));
        if (StringUtils.isNotBlank(cnpj))
            return serviceService.findByCnpj(cnpj, pageRequest).map(service -> modelMapper.map(service, ServiceOutputDto.class));
        else
            return serviceService.findAll(pageRequest).map(service -> modelMapper.map(service, ServiceOutputDto.class));
    }
}
