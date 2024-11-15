package com.example.shop.services;

import com.example.shop.entity.Client;
import com.example.shop.repository.ClientRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ClientService {
    private ClientRepository clientRepository;

    public Integer setClient(Client clientBody) {
        try {
            Integer id = clientRepository.save(clientBody);
            return id;
        }
        catch (Exception ex) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
        }
    }
}